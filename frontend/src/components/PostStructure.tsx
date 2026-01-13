import { useEffect, useState } from "react"
import Comment from "./Comment"
import FormComment from "./FormComment"
import type { iPostRecived } from "./interfaces"
import { Link } from "react-router-dom"


const PostStructure = ({post}:{post:iPostRecived}) => {
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
    setLikeStatus(!likeStatus)
  }
  const handleSaveClick = async()=>{
    await fetch(`http://localhost:3000/users/${post._id}/save`,{
      method:'PATCH'
    })
  }
  const handleDelete = async()=>{
    await fetch(`http://localhost:3000/posts/${post._id}`,{
      method:"DELETE"
    })
  }  
  return (
    <div>
      <Link to={`/post_details/${post._id}`}>
      <p>icon</p><p>{post.userName}</p>
      <p>{post.textContent}</p>
      {post.imageContent&&<img src={post.imageContent}></img>}
     {post.videoContent&& <video controls>
        <source src={post.videoContent} type="video/mp4"></source>
      </video>}
      </Link>
      <FormComment postId={post._id}/><p>{likeStatus?(<button onClick={handleLikeClick}>Unlike</button>):(<button onClick={handleLikeClick}>Like</button>)}</p><p><button onClick={handleSaveClick}>Save</button></p>
      <p><button onClick={handleDelete}>Delete</button></p>
      <Comment postId={post._id}/>
      
    </div>
  )
}
export default PostStructure