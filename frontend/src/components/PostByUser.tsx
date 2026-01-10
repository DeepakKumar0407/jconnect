import { useEffect, useState } from "react"

const PostByUser = () => {
    const [posts,setPosts] = useState()
    const email = 'jwt'
    useEffect(()=>{
        const getPosts = async()=>{
            const res = await fetch(`http://localhost:3000/${email}/user`)
            const data = await res.json()
            setPosts(data)
        }
        getPosts()
    },[])
  return (
    <div>
        <p>Map Posts</p>
    </div>
  )
}
export default PostByUser