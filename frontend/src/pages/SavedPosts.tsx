import { useEffect, useState } from "react"
import PostStructure from "../components/PostStructure"
import type { iPostRecived } from "../components/interfaces"

const SavedPosts = () => {
  const userId = "69615b843b9d8533212f8503"
  const [savedPosts,setSavedPosts] = useState<iPostRecived[]>()
  useEffect(()=>{
    const getSavedPosts = async()=>{
      const res = await fetch(`http://localhost:3000/users/${userId}/saved`)
      const data = await res.json()
      setSavedPosts(data)
    }
    getSavedPosts()
  },[])
  return (
    <div className="div">
      <h1>Saved Posts</h1>
      {savedPosts?.map((post:iPostRecived)=>(
        <div key={post._id}>
          <PostStructure post={post}/>
        </div>
      ))}
    </div>
  )
}
export default SavedPosts