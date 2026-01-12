import { useEffect, useState } from "react"
import type { iPostRecived } from "./interfaces"

const SearchPosts = ({blob}:{blob:string}) => {
  const [searchResult,setSearchResult] = useState<iPostRecived[]>()
  useEffect(()=>{
    const getSearchResult= async()=>{
      const res = await fetch(`http://localhost:3000/posts/${blob}/search`)
      const data = await res.json()
      setSearchResult(data)
    }
    getSearchResult()
  },[blob])
  return (
    searchResult?.map((post:iPostRecived)=>(
      <div key={post._id}>
        <p>{post.textContent}</p>
      </div>
    ))
  )
}
export default SearchPosts