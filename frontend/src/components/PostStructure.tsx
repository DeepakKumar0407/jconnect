import FormComment from "./FormComment"

const PostStructure = ({postId}:{postId:string}) => {
  return (
    <div>
      <p>icon</p><p>username</p>
      <p>Text conent</p>
      <p>image</p>
      <FormComment postId={postId}/><p>L</p><p>S</p>
      <p>call coment component</p>
    </div>
  )
}
export default PostStructure