import { useEffect, useRef, useState } from "react"
import FormPost from "../components/FormPost"
import PostStructure from "../components/PostStructure"
import type { iPostRecived } from "../components/interfaces"
import { useQuery } from "@tanstack/react-query"
import { PlusIcon } from "@heroicons/react/24/outline"

const Home = () => {
  const [yaxis,setYAxis] = useState(window.innerHeight)
  const [state,setState] = useState<string>("hidden")
  const scrollRef = useRef<HTMLDivElement>(null)
  const { isPending,data,error } = useQuery({
  queryKey: ['post'],
  queryFn: async () => {
    const response = await fetch(
      'http://localhost:3000/posts',
    )
    return await response.json()
  },
  })
  const handleClick = ()=>{
    if(state==="hidden"){
      setState("")
    }else{
      setState("hidden")
    }
  }
  
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
  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message
  return (
    <div className={`div overflow-auto`} ref={scrollRef} style={{height:`${yaxis}px`}}>
      <div className="flex justify-between mr-10 mb-5 ">
        <h1>For You</h1>
        <button className="lg:text-2xl flex align-middle gap-2 cursor-pointer" onClick={handleClick}>Post <PlusIcon className="icon"/></button>
      </div>
      <FormPost state={state}/>
    <div className="flex flex-col justify-baseline gap-20 mt-10 w-full pb-22">
      {data?.map((post:iPostRecived)=>(
        <div key={post._id}>
          <PostStructure post={post}/>
        </div>
      ))}
    </div>
    </div>
  )
}
export default Home