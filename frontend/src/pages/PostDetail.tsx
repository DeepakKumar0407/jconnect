import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { iPostRecived } from "../components/interfaces"

const PostDetail = () => {
  const {id}= useParams()
  const [post,setPost] = useState<iPostRecived>()
  useEffect(()=>{
    const getPost = async()=>{
      const res = await fetch(`http://localhost:3000/posts/${id}`)
      const data = await res.json()
      setPost(data)
    }
    getPost()
  },[id])
  return (
    <div className="div md:text-base lg:text-xl">
      <p>-back</p>
      <p>profile pic</p><p>{post?.userName}</p>
      <p>content</p>
      <p>comment number</p><p>likes</p><p>save</p>
      <p>comments</p>
    </div>
  )
}
export default PostDetail