import { useEffect, useRef, useState } from "react"
import { io, Socket } from "socket.io-client"
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"
import type { iChat, iRoom, JWTStructure } from "../components/interfaces"
import { jwtDecode } from "jwt-decode"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

const ChatRoom = () => {
  const socketRef = useRef<Socket | null>(null)
  const currentUser:JWTStructure = jwtDecode(localStorage.getItem('jwt_token')!)//jwt
  const senderId = currentUser.userId
  const {id:reciverId} = useParams()
  const [yaxis, setYAxis] = useState(window.innerHeight)
  const [chat, setChat] = useState<iChat[]>([])
  const [message, setMessage] = useState('')
  const createRoom = async(data:iRoom)=>{
          await fetch("http://localhost:3000/rooms",{
          method:'POST',
          headers:{
              'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
          },
          body:JSON.stringify(data)
         })
      }
      const {mutate} = useMutation({mutationFn:createRoom})
      useEffect(()=>{
        if(senderId!==undefined && reciverId!==undefined){
        mutate({senderId:senderId,reciverId:reciverId})
        }
      },[])
  const {data:chats} = useQuery({
    queryKey:['chats',senderId],
    queryFn: async()=>{
      const response = await fetch(`http://localhost:3000/chats/${senderId}`)
      return await response.json()
    }
  })
  useEffect(()=>{
    const syncChats = ()=>{
      if(chats!==undefined){
      setChat(state=>([...state,...chats]))
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
    socketRef.current?.emit('chat message', {senderId:senderId,text:message})
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
  }, [])
  console.log(chats)
  return (
    <div className="div" style={{ height: `${yaxis}px` }}>
      <div className="flex flex-col justify-between pb-22 h-full">
        <div className="overflow-auto w-full">{chat?.map((m, index: number) => (
        <p key={index}>{m.text}</p>
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