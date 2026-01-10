/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"

const Comment = ({postId}:{postId:string}) => {
  const [comments,setComments] = useState<any>()
  useEffect(()=>{
    const getComments = async()=>{
      const res = await fetch(`http://localhost:3000/comments/${postId}/post`)
      const data = await res.json()
      setComments(data)
    }
    getComments()
  },[])
  return (
    comments?.map((comment:any)=>(
      <div key={comment._id}>
      <h1 >comment</h1>
      <p >{comment.textContent}</p>
      <img src={comment.imageContent} className="w-48 h-27"></img>
      </div>
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