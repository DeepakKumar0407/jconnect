import { useEffect, useRef, useState } from "react"
import { io, Socket } from "socket.io-client"
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"

const ChatRoom = () => {
  const socketRef = useRef<Socket | null>(null)
  const [yaxis, setYAxis] = useState(window.innerHeight)
  const [chat, setChat] = useState<string[]>([])
  const [message, setMessage] = useState('')
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
    socketRef.current?.emit('chat message', message)
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

  return (
    <div className="div" style={{ height: `${yaxis}px` }}>
      <div className="flex flex-col justify-between pb-22 h-full">
        <div className="overflow-auto w-full">{chat.map((m, index: number) => (
        <p key={index}>{m}</p>
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