import { useEffect, useState } from "react"
import PostStructure from "../components/PostStructure"
import type { iPostRecived } from "../components/interfaces"

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
  return (
    <div className=" div mt-5 pb-15">
    <h1>For You</h1>
    <div className="flex flex-col justify-baseline gap-20 mt-10 w-9/10 mx-auto">
      {posts?.map((post)=>(
        <div key={post._id}>
          <PostStructure post={post}/>
        </div>
      ))}
    </div>
    </div>
  )
}
export default Home