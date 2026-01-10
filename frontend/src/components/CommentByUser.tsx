import { useEffect, useState } from "react"

const CommentByUser = ({postId}:{postId:string}) => {
  const [comments,setComments] = useState()
  useEffect(()=>{
    const getComments = async()=>{
      const res = await fetch(`http://localhost:3000/comments/${postId}/user`)
      const data = await res.json()
      setComments(data)
    }
    getComments()
  },[])
  return (
    <div>
      <p>cycle all comments</p>
      <p>icon</p><p>username</p>
      <p>text content</p>
      <p>image content</p>
    </div>
  )
}
export default CommentByUser