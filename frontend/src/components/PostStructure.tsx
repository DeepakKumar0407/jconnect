/* eslint-disable  @typescript-eslint/no-explicit-any */
import Comment from "./Comment"
import FormComment from "./FormComment"

const PostStructure = ({post}:{post:any}) => {
  return (
    <div>
      <p>icon</p><p>{post.userName}</p>
      <p>{post.textContent}</p>
      <img src={post.imageContent}></img>
      <video controls>
        <source src={post.videoContent} type="video/mp4"></source>
      </video>
      <FormComment postId={post._id}/><p>L</p><p>S</p>
      <Comment postId={post._id}/>
    </div>
  )
}
export default PostStructure