import { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import FormComment from "../components/FormComment"
import Comment from "../components/Comment"
import { useNavigate } from "react-router-dom"
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid"
import { HeartIcon } from "@heroicons/react/24/solid"
import { BookmarkSquareIcon } from "@heroicons/react/24/solid"
import { TrashIcon } from "@heroicons/react/24/outline"
import { useQuery } from "@tanstack/react-query"
import { jwtDecode } from "jwt-decode"
import type { JWTStructure } from "../components/interfaces"

const PostDetail = () => {
  const {id}= useParams()
  const token:JWTStructure = jwtDecode(localStorage.getItem('jwt_token')!)
  const currentUserId = token.userId
  const [likeStatus,setLikeStatus] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [yaxis,setYAxis] = useState(window.innerHeight)
  const navigate = useNavigate()
  const { data:post,isPending,error } = useQuery({
  queryKey: ['post',id],
  queryFn: async () => {
    const response = await fetch(
      `http://localhost:3000/posts/${id}`,{
        method:'GET',
        headers:{
          'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
        }
      }
    )
    return await response.json()
  },
  })
  const { data } = useQuery({
  queryKey: ['likeStatus',post],
  queryFn: async () => {
    const response = await fetch(
      `http://localhost:3000/posts/${post?._id}/like`,{
        method:'GET',
        headers:{
          'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
        }
      }
    )
    return await response.json()
  },
  })
  useEffect(()=>{
    const getLikeStatus = async()=>{
      if(data===null){
        setLikeStatus(false)
      }else{
        setLikeStatus(true)
      }
      
    }
    if(post){
       getLikeStatus()
    }
  },[data,post])
 
     const handleLikeClick = async()=>{
    await fetch(`http://localhost:3000/posts/${post?._id}/like`,{
      method:'PATCH',
      headers:{
        'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`,
      }
    })
    setLikeStatus(!likeStatus)
  }
  const handleSaveClick = async()=>{
    await fetch(`http://localhost:3000/users/${post?._id}/save`,{
      method:'PATCH',
       headers:{
        'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`,
      }
    })
  }
  const handleDelete = async()=>{
    const res = await fetch(`http://localhost:3000/posts/${post?._id}`,{
      method:"DELETE",
       headers:{
        'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`,
      }
    })
    if(res.ok){
      navigate('/home')
    }
  }
  const handleBack = ()=>{
    navigate(-1)
  } 
  useEffect(() => {
  const updateHeight = () => setYAxis(window.innerHeight)

  updateHeight()
  window.addEventListener("resize", updateHeight)

  return () => window.removeEventListener("resize", updateHeight)
}, [])
  useEffect(() => {
  const elem = scrollRef.current
  if (!elem) return

  const onScroll = () => {
    sessionStorage.setItem("detail-scroll", String(elem.scrollTop))
  }

  elem.addEventListener("scroll", onScroll)
  
  return () => elem.removeEventListener("scroll", onScroll)
}, [])
useEffect(() => {
  const elem = scrollRef.current
  const saved = sessionStorage.getItem("detail-scroll")

  if (elem && saved) {
    elem.scrollTop = Number(saved)
  }
}, [])
useEffect(() => {
  const updateHeight = () => setYAxis(window.innerHeight)

  updateHeight()
  window.addEventListener("resize", updateHeight)

  return () => window.removeEventListener("resize", updateHeight)
}, [])
  if (isPending) return (
    <div className="div">
      <h1>Loading...</h1>
    </div>
  )

  if (error) return (
    <div className="div">
      <h1>An error has occurred: {error.message}</h1>
    </div>
  ) 
  return (
    <div className={`div overflow-auto`} ref={scrollRef} style={{height:`${yaxis}px`}}>
      <div className=" w-full flex flex-col justify-baseline">
      <div className="w-1/3 text-left pr-4 lg:text-2xl mb-5">
      <button onClick={handleBack} className=" bg-red-600 hover:bg-red-500 p-2 pl-4 pr-4 rounded cursor-pointer"><ArrowUturnLeftIcon className="icon"/></button>
      </div>
      <div className="flex justify-between">
        <Link to={`/profile/${post?.userId}`} className="flex justify-baseline gap-5 items-center">
        {post?.profilePic?(<img src={post.profilePic} className="w-10 h-10 lg:w-15 lg:h-15 rounded-full"></img>):
        (<p className="bg-white text-black w-10 h-10 lg:w-15 lg:h-15 flex rounded-full justify-center items-center md:text-xl">{post?.userName[0].toUpperCase()}</p>)}
        <p className="w-1/2 lg:text-xl">@{post?.userName}</p>
        </Link>
        {post.userId===currentUserId&&<button onClick={handleDelete}><TrashIcon className="icon text-red-600 cursor-pointer"/></button>}
      </div>
      <p className="mt-2 lg:text-2xl mb-2">{post?.textContent}</p>
      {post?.imageContent!=="null"&&<img src={post?.imageContent}></img>}
      {post?.videoContent&&post?.videoContent!=="null"&& <video controls>
        <source src={post?.videoContent} type="video/mp4"></source>
      </video>}
      <div className="flex justify-baseline gap-8 items-center mt-4 mb-4 md:text-base">
        <p>{likeStatus?(<button onClick={handleLikeClick}><HeartIcon className="icon text-green-600 cursor-pointer"/></button>):
        (<button onClick={handleLikeClick}><HeartIcon className="icon text-white cursor-pointer"/></button>)} {post?.likesCount}</p>
        <button onClick={handleSaveClick}><BookmarkSquareIcon className="icon"/></button>
      </div>
      <FormComment postId={post&&post._id} type="comment"/>
      <p className="md:text-2xl mt-3 mb-2">Comments</p>
      <Comment postId={post?._id}/>
        </div>
    </div>
  )
}
export default PostDetail