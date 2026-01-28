import { jwtDecode } from "jwt-decode"
import type { iUser, JWTStructure } from "../components/interfaces"
import { useEffect, useRef, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import UserSprite from "../components/UserSprite"

const ChatRoomList = () => {
  const currentUser:JWTStructure = jwtDecode(localStorage.getItem('jwt_token')!)//jwt
  const [yaxis,setYAxis] = useState(window.innerHeight)
  const scrollRef = useRef<HTMLDivElement>(null)
  const email = currentUser.userEmail
  const [friends,setFriends] = useState<iUser[]>()
  const { data:user,isPending:userPending,error:userError } = useQuery({
  queryKey: ['user',email],
  queryFn: async () => {
    const response = await fetch(
      `http://localhost:3000/users/${email}/email`,{
        method:'GET',
        headers:{
          'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
        }
      }
    )
    return await response.json()
  },
  enabled: email.length>0
  })
  const hasUSer = typeof(user) === 'object'
  const { data,isPending:friendPending,error:friendError } = useQuery<iUser[]>({
  queryKey: ['friends',user],
  queryFn: async () => {
    const response = await fetch(
      `http://localhost:3000/users/${user?._id}/friends`,{
        method:'GET',
        headers:{
          'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
        }
      }
    )
    return await response.json()
  },enabled:hasUSer
  })
  useEffect(()=>{
    const getFriends = async()=>{
      const unique:iUser[] = Array.from(
          new Map(data?.map((item:iUser) => [item._id, item])).values()
      );
      setFriends(unique)
    }
    getFriends()
  },[data])
  useEffect(() => {
  const elem = scrollRef.current
  if (!elem) return

  const onScroll = () => {
    sessionStorage.setItem("home-scroll", String(elem.scrollTop))
  }

  elem.addEventListener("scroll", onScroll)
  
  return () => elem.removeEventListener("scroll", onScroll)
}, [])
useEffect(() => {
  const elem = scrollRef.current
  const saved = sessionStorage.getItem("home-scroll")

  if (elem && saved) {
    elem.scrollTop = Number(saved)
  }
}, [data])
useEffect(() => {
  const updateHeight = () => setYAxis(window.innerHeight)

  updateHeight()
  window.addEventListener("resize", updateHeight)

  return () => window.removeEventListener("resize", updateHeight)
}, [])
  if (userPending||friendPending) return (
    <div className="div">
      <h1>Loading...</h1>
    </div>
  )

  if (userError||friendError) return (
    <div className="div">
      {userError?(<h1>An error has occurred: {userError.message}</h1>):(
        <h1>An error has occurred: {friendError?.message}</h1>
      )}
    </div>
  )
  return (
    <div className="div overflow-auto" ref={scrollRef} style={{height:`${yaxis}px`}}>
        <h1>Friend list</h1>
        {friends?.map((friend:iUser)=>(
         <div key={friend._id}>
          <UserSprite friend={friend} user={user}/>
         </div>
        ))}
    </div>
  )
}
export default ChatRoomList