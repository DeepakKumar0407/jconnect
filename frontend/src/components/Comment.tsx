/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import CommentStructure from "./CommentStructure"

const Comment = ({postId}:{postId:string}) => {
  const [comments,setComments] = useState<any>()
  useEffect(()=>{
    const getComments = async()=>{
      const res = await fetch(`http://localhost:3000/comments/${postId}/post`)
      const data = await res.json()
      setComments(data)
    }
    getComments()
  },[postId])
  return (
    comments?.map((comment:any)=>(
      <CommentStructure comment={comment}/>
    ))
    // <div>
    //   <p>cycle all comments build a tree</p>
    //   <p>icon</p><p>username</p>
    //   <p>text content</p>
    //   <p>image content</p>
    // </div>
  )
}
export default Comment