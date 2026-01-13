import { useEffect, useState } from "react"
import type { iCommentRecived, iUser } from "./interfaces"

const CommentByUser = ({user}:{user:iUser|undefined}) => {
  const [comments,setComments] = useState<iCommentRecived[]>()
  console.log(user?._id)
  useEffect(()=>{
    const getComments = async()=>{
      const res = await fetch(`http://localhost:3000/comments/${user?._id}/user`)
      const data = await res.json()
      setComments(data)
    }
    getComments()
  },[user?._id])
  return (
    <div>
      {comments?.map((comment:iCommentRecived)=>(
        <div key={comment._id}>
          <p>{comment.textContent}</p>
        </div>
      ))}
      {/* <p>cycle all comments</p>
      <p>icon</p><p>username</p>
      <p>text content</p>
      <p>image content</p> */}
    </div>
  )
}
export default CommentByUser