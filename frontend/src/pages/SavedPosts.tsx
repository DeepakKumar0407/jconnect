import { useEffect, useRef, useState } from "react"
import PostStructure from "../components/PostStructure"
import type { iPostRecived } from "../components/interfaces"
import { useQuery } from "@tanstack/react-query"

const SavedPosts = () => {
  const userId = "69615b843b9d8533212f8503"
  const scrollRef = useRef<HTMLDivElement>(null)
  const [yaxis,setYAxis] = useState(window.innerHeight)
  const { data:savedPosts } = useQuery({
  queryKey: ['savedPosts',userId],
  queryFn: async () => {
    const response = await fetch(
      `http://localhost:3000/users/${userId}/saved`,{
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
    sessionStorage.setItem("saved-scroll", String(elem.scrollTop))
  }

  elem.addEventListener("scroll", onScroll)
  
  return () => elem.removeEventListener("scroll", onScroll)
}, [])
useEffect(() => {
  const elem = scrollRef.current
  const saved = sessionStorage.getItem("saved-scroll")

  if (elem && saved) {
    elem.scrollTop = Number(saved)
  }
}, [])
useEffect(() => {
  const updateHeight = () => setYAxis(window.innerHeight)

  updateHeight()
  window.addEventListener("resize", updateHeight)

  return () => window.removeEventListener("resize", updateHeight)
}, [])
  return (
    <div className={`div overflow-auto`} ref={scrollRef} style={{height:`${yaxis}px`}}>
      <h1>Saved Posts</h1>
      <div className="flex flex-col justify-baseline gap-20 mt-10 w-full pb-22">
      {savedPosts?.map((post:iPostRecived)=>(
        <div key={post._id}>
          <PostStructure post={post}/>
        </div>
      ))}
      </div>
    </div>
  )
}
export default SavedPosts