import { useEffect, useState } from "react"
import type { CommentNode} from "./interfaces"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Link, Outlet } from "react-router-dom"

const CommentStructure = ({ comment,postId }: { comment: CommentNode,postId:string|undefined }) => {
  const [likeStatus, setLikeStatus] = useState<boolean>()
  const [state,setState] = useState('comment')
  const { data: likes } = useQuery({
    queryKey: ["likeStatus", comment],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/comments/${comment._id}/like`
      )
      return await response.json()
    },
  })
  const handleStateClick = ()=>{
    if(state==='comment'){
      setState('')
    }else{
      setState('comment')
    }
  }
  useEffect(() => {
    const like = !!likes
    const setInitialLike = ()=> setLikeStatus(like)
    setInitialLike()
  }, [likes])
  const { data: user} = useQuery({
    queryKey: ["comment", comment],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/users/${comment.userId}/id`
      )
      return await response.json()
    },
  })
  const updateLike = async ()=>{
    await fetch(`http://localhost:3000/comments/${comment._id}/like`, {
      method: "PATCH",
    })
  }
  const deleteLike = async ()=>{
    await fetch(`http://localhost:3000/comments/${comment._id}`, {
      method: "DELETE",
    })
  }
  const {mutate:mutateLikeUpdate} = useMutation({mutationFn:updateLike})
  const handleLikeClick = async () => {
    mutateLikeUpdate()
    setLikeStatus(!likeStatus)
  }

  const {mutate:mutateLikeDelete} = useMutation({mutationFn:deleteLike})
  const handleDelete = async () => {
    mutateLikeDelete()
  }
  return (
     state==='comment'?(<div className="w-full">
       <div className="flex flex-col justify-baseline gap-1">
        <div className="flex justify-baseline gap-5 items-center">
          {user?.profilePic ? (
            <img
              src={user.profilePic}
              className="w-5 h-5 rounded-4xl"
              alt="Profile"
            />
          ) : (
            <p className="bg-white text-black w-5 h-5 flex rounded-4xl justify-center items-center md:text-base">
              {user?.userName[0].toUpperCase()}
            </p>
          )}
          <p className="w-1/2 md:text-base">@{user?.userName}</p>
        </div>
        <div>
          <p>{comment.textContent}</p>
          {comment.imageContent && (
            <img src={comment.imageContent} className="w-48 h-27" alt="Comment" />
          )}
        </div>
        <div className="flex justify-baseline gap-5">
          <p>
            {likeStatus ? (
              <button onClick={handleLikeClick}>Unlike</button>
            ) : (
              <button onClick={handleLikeClick}>Like</button>
            )}
          </p>
          <p>
            <button onClick={handleDelete}>Delete</button>
          </p>
        </div>
        <Link to={`/post_details/${postId}/reply/${comment.postId}/${comment._id}`}><button onClick={handleStateClick}>Comment</button></Link>
      </div>
      <div>
        {comment.children.length > 0 &&
          comment.children.map((reply: CommentNode) => (
            <div
              className="ml-3 mt-5 border-l pl-2 border-white/50"
              key={reply._id}
            >
              <CommentStructure comment={reply} postId={postId}/>
            </div>
          ))}
      </div>
     </div>):(<Outlet/>)
  )
}

export default CommentStructure