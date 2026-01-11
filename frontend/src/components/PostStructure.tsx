/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import Comment from "./Comment"
import FormComment from "./FormComment"

const PostStructure = ({post}:{post:any}) => {
  const [likeStatus,setLikeStatus] = useState(false)
  useEffect(()=>{
    const getLikeStatus = async()=>{
      const res = await fetch(`http://localhost:3000/posts/${post._id}/like`)
      const status = await res.json()
      if(status===null){
        setLikeStatus(false)
      }else{
        setLikeStatus(true)
      }
      
    }
    getLikeStatus()
  },[post._id])

   const handleLikeClick = async()=>{
    await fetch(`http://localhost:3000/posts/${post._id}/like`,{
      method:'PATCH'
    })
    console.log('clicked')
    setLikeStatus(!likeStatus)
  }
  const handleSaveClick = async()=>{
    await fetch(`http://localhost:3000/users/${post._id}/save`,{
      method:'PATCH'
    })
    console.log('clicked')
  }
  const handleDelete = async()=>{
    await fetch(`http://localhost:3000/posts/${post._id}`,{
      method:"DELETE"
    })
  }  
  return (
    <div>
      <p>icon</p><p>{post.userName}</p>
      <p>{post.textContent}</p>
      <img src={post.imageContent}></img>
      <video controls>
        <source src={post.videoContent} type="video/mp4"></source>
      </video>
      <FormComment postId={post._id}/><p>{likeStatus?(<button onClick={handleLikeClick}>Unlike</button>):(<button onClick={handleLikeClick}>Like</button>)}</p><p><button onClick={handleSaveClick}>Save</button></p>
      <p><button onClick={handleDelete}>Delete</button></p>
      <Comment postId={post._id}/>
    </div>
  )
}
export default PostStructure