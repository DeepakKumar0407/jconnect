import type { iUser, JWTStructure } from "./interfaces"
import { useQuery } from "@tanstack/react-query"
import UserSprite from "./UserSprite"
import { useEffect, useRef } from "react"
import { jwtDecode } from "jwt-decode"

const SearchUsers= ({blob}:{blob:string}) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const token:JWTStructure = jwtDecode(localStorage.getItem('jwt_token')!)
  const currentUserId = token.userId

  const {data:currentUser} = useQuery({
  queryKey: ['currentUser',currentUserId],
  queryFn: async () => {
    const response = await fetch(
      `http://localhost:3000/users/${currentUserId}/id`,{
        method:'GET',
        headers:{
          'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
        }
      }
    )
    return await response.json()
  },
  })
  const { data:searchResult,isPending,error } = useQuery({
  queryKey: ['searchResult',blob],
  queryFn: async () => {
    const response = await fetch(
      `http://localhost:3000/users/${blob}/search`,{
        method:'GET',
        headers:{
          'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
        }
      }
    )
    return await response.json()
  },
  })
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
    }, [])
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
    <div className="overflow-auto" ref={scrollRef}>
        {searchResult?.map((user:iUser)=>(
         <div key={user._id}>
          <UserSprite friend={user} user={currentUser}/>
         </div>
        ))}
    </div>
  )
}
export default SearchUsers