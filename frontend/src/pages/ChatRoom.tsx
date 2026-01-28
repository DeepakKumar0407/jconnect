import { useEffect, useRef, useState } from "react"
import { io, Socket } from "socket.io-client"
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"
import type { iChat, iRoom, JWTStructure } from "../components/interfaces"
import { jwtDecode } from "jwt-decode"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import DeleteChat from "../components/DeleteChat"

const ChatRoom = () => {
  const socketRef = useRef<Socket | null>(null)
  const chatRef = useRef<HTMLDivElement>(null)
  const currentUser:JWTStructure = jwtDecode(localStorage.getItem('jwt_token')!)//jwt
  const senderId = currentUser.userId
  const {id:receiverId} = useParams()
  const [roomId,setRoomID] = useState<string>('')
  const [yaxis, setYAxis] = useState(window.innerHeight)
  const [chat, setChat] = useState<iChat[]>([])
  const [message, setMessage] = useState('')
  const createRoom = async(data:iRoom)=>{
          const response = await fetch("http://localhost:3000/rooms",{
          method:'POST',
          headers:{
              'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
          },
          body:JSON.stringify(data)
         })
         return response.json()
      }
      const {mutate} = useMutation({mutationFn:createRoom,onSuccess:(data)=>{setRoomID(data?._id)}})
      useEffect(()=>{
        if(senderId!==undefined && receiverId!==undefined){
        mutate({senderId:senderId,receiverId:receiverId})
        }
      },[])
  const {data:chats,isPending,error} = useQuery({
    queryKey:['chats',roomId],
    queryFn: async()=>{
      const response = await fetch(`http://localhost:3000/chats/${roomId}`)
      return await response.json()
    }
  })
  useEffect(()=>{
    const syncChats = ()=>{
      if(Array.isArray(chats)){
      setChat(chats)
      }
    }
    syncChats()
  },[chats])
  useEffect(() => {
    socketRef.current = io("http://localhost:3000", {
      autoConnect: false
    })
  }, [])
  useEffect(() => {
    const updateHeight = () => setYAxis(window.innerHeight)

    updateHeight()
    window.addEventListener("resize", updateHeight)

    return () => window.removeEventListener("resize", updateHeight)
  }, [])
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    socketRef.current?.emit('chat message', {roomId:roomId,senderId:senderId,receiverId:receiverId,text:message})
    setMessage('')
  }
  useEffect(() => {
    const socket = socketRef.current
    if (!socket) return

    socket.on("chat message", (msg) => {
      setChat(state => [...state, msg])
    })
    socket.connect()
    return () => {
      socket.disconnect()
    }
  },[])
  useEffect(() => {
  if (!chatRef.current) return;
  chatRef.current.scrollTop = chatRef.current.scrollHeight;
}, [chat]);
  if (isPending) return (
    <div className="div">
      <h1>Loading...</h1>
    </div>
  )

  if (error) return (
    <div className="div">
      <h1>An error has occurred: {error.message}</h1>
    </div>
  )
  return (
    <div className="div overflow-y-auto" style={{ height: `${yaxis}px` }}>
      <div className="flex flex-col justify-between pb-22 h-full">
        <div ref={chatRef} className="overflow-auto h-full w-full chat mb-5">
        {chat?.map((m:iChat, index: number) => (
        <div key={index} className=" w-full flex justify-between lg:text-xl">
        <div className="w-1/2 flex justify-baseline overflow-clip">{m.senderId!==senderId&&<p className="p-2 rounded bg-white/20 mb-4 w-fit ">{m.text}</p>}</div>
        <div className="w-1/2 flex justify-end overflow-clip">{m.senderId===senderId&&<div className="bg-white/20 p-2 rounded mb-4 w-fit text-right"><DeleteChat chat={m}/><p className="">{m.text}</p></div>}</div>
        </div>
      ))}
      </div>
      <form onSubmit={handleSubmit} className="w-full">
        <label htmlFor="chat" className=" hidden lg:inline md:text-xl lg:text-2xl">Chat: </label>
        <input id="chat" type="text" name="chat" value={message} placeholder="text" className="p-3 border-2 border-white/20 rounded w-3/4 lg:w-1/2 align-bottom" onChange={(e) => setMessage(e.target.value)} required></input>
        <button className="ml-2 p-2 border-2 border-green-600 rounded"><PaperAirplaneIcon className="icon text-green-600"/></button>
      </form>
      </div>
    </div>
  )
}
export default ChatRoom