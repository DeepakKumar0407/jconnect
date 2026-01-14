import { useEffect, useState } from "react"
import FormComment from "./FormComment"
import type { CommentNode, iUser } from "./interfaces"
const CommentStructure = ({comment}:{comment:CommentNode}) => {
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
      },[comment.userId])
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
      <div className="flex flex-col justify-baseline gap-1">
      <div className="flex justify-baseline gap-5 items-center">
        {user?.profilePic?(<img src={user.profilePic} className="w-5 h-5 rounded-4xl"></img>):
        (<p className="bg-white text-black w-5 h-5 flex rounded-4xl justify-center items-center md:text-base">{user?.userName[0].toUpperCase()}</p>)}
        <p className="w-1/2 md:text-base">@{user?.userName}</p>
      </div>
      <div>
        <p>{comment.textContent}</p>
        {comment.imageContent&&<img src={comment.imageContent} className="w-48 h-27"></img>}
      </div>
      <div className="flex justify-baseline gap-5">
        <p>{likeStatus?(<button onClick={handleLikeClick}>Unlike</button>):(<button onClick={handleLikeClick}>Like</button>)}</p>
        <p><button onClick={handleDelete}>Delete</button></p>
      </div>
      <FormComment postId={comment.postId} parentId={comment._id} type="reply"/>
      </div>
      <div>
        {comment.children.length>0&&
        comment.children.map((reply:CommentNode)=>(
        <div className="ml-3 mt-5 border-l pl-2 border-white/50" key={reply._id}>
           <CommentStructure comment={reply}/>  
        </div>
      ))
      }
      </div>
    </div>
  )
}
export default CommentStructure