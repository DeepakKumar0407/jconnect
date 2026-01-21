import { useQuery } from "@tanstack/react-query"
import type { iNotification, iUser } from "./interfaces"
import { Link } from "react-router-dom"

const NotificationStructure = ({notification,user}:{notification:iNotification,user:iUser|undefined}) => {
    const {data:commenter} = useQuery({
    queryKey:['post',notification.userId],
    queryFn: async()=>{
      const response = await fetch(
      `http://localhost:3000/users/${notification?.userId}/id`,{
        method:'GET',
        headers:{
          'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
        }
      }
    )
    return await response.json()
    }
  })
  const {data:post} = useQuery({
    queryKey:['post',notification.postId],
    queryFn: async()=>{
      const response = await fetch(
      `http://localhost:3000/posts/${notification?.postId}`,{
        method:'GET',
        headers:{
          'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
        }
      }
    )
    return await response.json()
    }
  })
  const isComment = notification.postId !== notification.notifOnid
  const hasContent = notification.type==='comment'
  const {data:comment} = useQuery({
    queryKey:['comment',notification.notifOnid],
    queryFn: async()=>{
      const response = await fetch(
      `http://localhost:3000/comments/${notification?.notifOnid}/comment`,{
        method:'GET',
        headers:{
          'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
        }
      },
    )
    return await response.json()
    },
    enabled: isComment
  })
  const {data:commentContent} = useQuery({
    queryKey:['comment',notification.notifContent],
    queryFn: async()=>{
      const response = await fetch(
      `http://localhost:3000/comments/${notification?.notifContent}/comment`,{
        method:'GET',
        headers:{
          'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
        }
      },
    )
    return await response.json()
    },
    enabled: hasContent
  })
  if(notification.type==='like'&&!notification.notifContent){
    return (
      user?._id!==notification.userId&&
      <Link to={`/post_details/${notification?.postId}`} className="w-full p-4 border-2 border-white/80 rounded">
        <p className="text-white/50 lg:text-xl" ><span className="text-xl lg:text-2xl text-white">@{commenter?.userName}</span> liked your post</p>
        <p className="w-full overflow-clip lg:text-xl">{post?.textContent}</p>
      </Link>
  )
  }else if(notification.type==='like'&&isComment){
     return (
      user?._id!==notification.userId&&
      <Link to={`/post_details/${notification?.postId}`} className="w-full p-4 border-2 border-white/80 rounded">
        <p className="text-white/50 lg:text-xl" ><span className="text-xl lg:text-2xl text-white">@{commenter?.userName}</span> liked your comment on post</p>
        <p className="w-full overflow-clip lg:text-xl">{post?.textContent}</p>
      </Link>
  )
  }
  else if(notification.type==="comment"&&isComment){
    return(
      user?._id!==notification.userId&&
      <Link to={`/post_details/${notification?.postId}`} className="w-full p-4 border-2 border-white/80 rounded">
        <p className="text-white/50 lg:text-xl" ><span className="text-xl lg:text-2xl text-white">@{commenter?.userName}</span> replied to your comment with</p>
        <p className="w-full overflow-clip lg:text-xl">{commentContent?.textContent} <span className="text-white/50">on comment</span></p>
        <p className="w-full overflow-clip lg:text-xl">{comment?.textContent} <span className="text-white/50">on post</span></p>
        <p className="w-full overflow-clip lg:text-xl">{post?.textContent}</p>
      </Link>
    )
  }else if(notification.type==="comment"&&!isComment){
    return(
      user?._id!==notification.userId&&
      <Link to={`/post_details/${notification?.postId}`} className="w-full p-4 border-2 border-white/80 rounded">
        <p className="text-white/50 lg:text-xl" ><span className="text-xl lg:text-2xl text-white">@{commenter?.userName}</span> made a comment</p>
        <p className="w-full overflow-clip lg:text-xl">{commentContent?.textContent} <span className="text-white/50">on post</span></p>
        <p className="w-full overflow-clip lg:text-xl">{post?.textContent}</p>
      </Link>
    )
  }
  
}
export default NotificationStructure