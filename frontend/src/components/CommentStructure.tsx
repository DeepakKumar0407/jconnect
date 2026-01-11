/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import FormComment from "./FormComment"
const CommentStructure = ({comment}:{comment:any}) => {
    const [likeStatus,setLikeStatus] = useState(false)
    useEffect(()=>{
        const getLikeStatus = async()=>{
          const res = await fetch(`http://localhost:3000/comments/${comment._id}/like`)
          const status = await res.json()
          if(status===null){
            setLikeStatus(false)
          }else{
            setLikeStatus(true)
          }
          
        }
        getLikeStatus()
      },[comment._id])
    const handleLikeClick = async()=>{
    await fetch(`http://localhost:3000/comments/${comment._id}/like`,{
      method:'PATCH'
    })
    console.log('clicked')
    setLikeStatus(!likeStatus)
  }
  const handleDelete = async()=>{
    await fetch(`http://localhost:3000/comments/${comment._id}`,{
      method:"DELETE"
    })
  }  
  return (
    <div key={comment._id}>
      <h1 >comment</h1>
      <p >{comment.textContent}</p>
      <img src={comment.imageContent} className="w-48 h-27"></img>
      <p>{likeStatus?(<button onClick={handleLikeClick}>Unlike</button>):(<button onClick={handleLikeClick}>Like</button>)}</p>
      <p><button onClick={handleDelete}>Delete</button></p>
      <FormComment postId={comment.postId} parentId={comment._id}/>
      </div>
  )
}
export default CommentStructure