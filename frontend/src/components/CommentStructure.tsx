import { useEffect, useState } from "react"
import FormComment from "./FormComment"
import type { CommentNode } from "./interfaces"
const CommentStructure = ({comment,text}:{comment:CommentNode,text:string}) => {
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
    <div>
      <div>
      <h1>{text}</h1>
      <p>{comment.textContent}</p>
      <img src={comment.imageContent} className="w-48 h-27"></img>
      <p>{likeStatus?(<button onClick={handleLikeClick}>Unlike</button>):(<button onClick={handleLikeClick}>Like</button>)}</p>
      <p><button onClick={handleDelete}>Delete</button></p>
      <FormComment postId={comment.postId} parentId={comment._id}/>
      </div>
      {comment.children.length>0&&
      comment.children.map((reply:CommentNode)=>(
        <div className="ml-3" key={reply._id}>
           <CommentStructure comment={reply} text="reply"/>  
        </div>
      ))
      }
    </div>
  )
}
export default CommentStructure