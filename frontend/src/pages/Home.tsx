import { useEffect, useState } from "react"
import PostStructure, { type iPostRecived } from "../components/PostStructure"

const Home = () => {
  const [posts,setPosts] = useState<iPostRecived[]>()
  useEffect(()=>{
   const getPosts = async()=>{
    const res = await fetch('http://localhost:3000/posts')
    const data = await res.json()
    setPosts(data)
   }
   getPosts()
  },[])
  console.log(posts,"posts")
  return (
    <div className="div pb-15">
      <h1>Home</h1>
      
      {posts?.map((post)=>(
        <div key={post._id}>
          <PostStructure post={post}/>
        </div>
      ))}
    
    </div>
  )
}
export default Home