import { useEffect, useState } from "react"
import type { iPostRecived, iUser } from "./interfaces"

const PostByUser = ({user}:{user:iUser|undefined}) => {
    const [posts,setPosts] = useState<iPostRecived[]>()
    useEffect(()=>{
        const getPosts = async()=>{
            const res = await fetch(`http://localhost:3000/posts/${user?._id}/user`)
            const data = await res.json()
            setPosts(data)
        }
        getPosts()
    },[user])
  return (
    <div>
        {posts?.map((post:iPostRecived)=>(
            <div key={post._id}>
                <p>{post.textContent}</p>
            </div>
        ))}
    </div>
  )
}
export default PostByUser