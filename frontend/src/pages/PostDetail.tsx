import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import type { iPostRecived } from "../components/interfaces"
import FormComment from "../components/FormComment"
import Comment from "../components/Comment"
import { useNavigate } from "react-router-dom"

const PostDetail = () => {
  const {id}= useParams()
  const [likeStatus,setLikeStatus] = useState(false)
  const [post,setPost] = useState<iPostRecived>()
  const navigate = useNavigate()
  useEffect(()=>{
    const getLikeStatus = async()=>{
      const res = await fetch(`http://localhost:3000/posts/${post?._id}/like`)
      const status = await res.json()
      if(status===null){
        setLikeStatus(false)
      }else{
        setLikeStatus(true)
      }
      
    }
    if(post){
       getLikeStatus()
    }
  },[post])
  useEffect(()=>{
    const getPost = async()=>{
      const res = await fetch(`http://localhost:3000/posts/${id}`)
      const data = await res.json()
      setPost(data)
    }
    getPost()
  },[id])
     const handleLikeClick = async()=>{
    await fetch(`http://localhost:3000/posts/${post?._id}/like`,{
      method:'PATCH'
    })
    setLikeStatus(!likeStatus)
  }
  const handleSaveClick = async()=>{
    await fetch(`http://localhost:3000/users/${post?._id}/save`,{
      method:'PATCH'
    })
  }
  const handleDelete = async()=>{
    await fetch(`http://localhost:3000/posts/${post?._id}`,{
      method:"DELETE"
    })
  }
  const handleBack = ()=>{
    navigate(-1)
  }  
  return (
    <div className="div flex flex-col justify-baseline mb-15">
      <button onClick={handleBack} className="w-1/3 text-left mt-2 mb-2 p-2 md:text-xl">&larr; Back</button>
      <div >
        <Link to={`/profile/${post?.userId}`} className="flex justify-baseline gap-5 items-center">
        {post?.profilePic?(<img src={post.profilePic} className="w-10 h-10 rounded-4xl"></img>):
        (<p className="bg-white text-black w-10 h-10 flex rounded-4xl justify-center items-center md:text-xl">{post?.userName[0].toUpperCase()}</p>)}
        <p className="w-1/2 md:text-xl">@{post?.userName}</p>
        </Link>
      </div>
      <p className="mt-2 md:text-base mb-2">{post?.textContent}</p>
      {post?.imageContent!=="null"&&<img src={post?.imageContent}></img>}
      {post?.videoContent&&post?.videoContent!=="null"&& <video controls>
        <source src={post?.videoContent} type="video/mp4"></source>
      </video>}
      <div className="flex justify-baseline gap-5 items-center mt-4 mb-4 md:text-base">
        <p>{likeStatus?(<button onClick={handleLikeClick}>Unlike</button>):(<button onClick={handleLikeClick}>Like</button>)}</p>{post?.likesCount}
        <button onClick={handleSaveClick}>Save</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <FormComment postId={post&&post._id} type="comment"/>
      <p className="md:text-2xl mt-3 mb-2">Comments</p>
      <Comment postId={post?._id}/>
    </div>
  )
}
export default PostDetail