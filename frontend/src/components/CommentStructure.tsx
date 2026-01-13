import { useEffect, useState } from "react"
import FormComment from "./FormComment"
import type { CommentNode, iUser } from "./interfaces"
import { Link } from "react-router-dom"
const CommentStructure = ({comment,text}:{comment:CommentNode,text:string}) => {
    const [likeStatus,setLikeStatus] = useState(false)
    const [user,setUser] = useState<iUser>()
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
      useEffect(()=>{
        const getUser =async ()=>{
          const res = await fetch(`http://localhost:3000/users/${comment.userId}/id`)
          const data = await res.json()
          setUser(data)
        }
        getUser()
      },[])
    const handleLikeClick = async()=>{
    await fetch(`http://localhost:3000/comments/${comment._id}/like`,{
      method:'PATCH'
    })
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
      <Link to={`profile/${user?._id}`}><p>{user?.name}</p></Link>
      <p>{comment.textContent}</p>
      {comment.imageContent&&<img src={comment.imageContent} className="w-48 h-27"></img>}
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