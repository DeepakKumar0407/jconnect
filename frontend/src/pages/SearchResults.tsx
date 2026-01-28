import { useParams } from "react-router-dom"
import SearchUsers from "../components/SearchUsers"
import SearchPosts from "../components/SearchPosts"
import { useEffect, useRef, useState } from "react"

const SearchResults = () => {
  const [yaxis,setYAxis] = useState(window.innerHeight)
  const scrollRef = useRef<HTMLDivElement>(null)
  const {blob} = useParams<string>()
  const [navigate,setNavigate] = useState('post')
  const handleChangePost = ()=>{
      setNavigate('post')
  }
  const handleChangeUser = ()=>{
      setNavigate('user')
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
  }, [])
  useEffect(() => {
    const updateHeight = () => setYAxis(window.innerHeight)
  
    updateHeight()
    window.addEventListener("resize", updateHeight)
  
    return () => window.removeEventListener("resize", updateHeight)
  }, [])
  return (
    <div className="div overflow-auto" ref={scrollRef} style={{height:`${yaxis}px`}}>
      <h1 className="mb-5">Search Results</h1>
     <div className="ml-5 lg:text-2xl flex justify-baseline gap-5">
        <button onClick={()=>setNavigate('post')} className={`cursor-pointer pb-2 ${navigate==='post'?'border-b-2':''} border-green-600`}>Posts</button>
        <button onClick={()=>setNavigate('user')} className={`cursor-pointer pb-2 ${navigate==='user'?'border-b-2':''} border-green-600`}>Users</button>
      </div>
      {navigate==='post'&&<SearchPosts blob={blob?blob:""}/>}
      {navigate==='user'&&<SearchUsers blob={blob?blob:""}/>}
    </div>
  )
}
export default SearchResults