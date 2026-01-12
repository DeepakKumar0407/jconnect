import { useEffect, useState } from "react"
import type { iUser } from "./interfaces"

const SearchUsers= ({blob}:{blob:string}) => {
  const [searchResult,setSearchResult] = useState<iUser[]>()
  useEffect(()=>{
    const getSearchResult= async()=>{
      const res = await fetch(`http://localhost:3000/users/${blob}/search`)
      const data = await res.json()
      setSearchResult(data)
    }
    getSearchResult()
  },[blob])
  return (
    searchResult?.map((user:iUser)=>(
      <div key={user._id}>
        <p>{user.name}</p>
      </div>
    ))
  )
}
export default SearchUsers