import FormPost from "../components/FormPost"
import FormUpdateUser from "../components/FormUpdateUser"

const Post = () => {
  return (
    <div className="div">
        <h1>Post</h1>
        <FormPost/>
        <FormUpdateUser userEmail="deepak.kumar016211@gmail.com" field="password"/>
    </div>
  )
}
export default Post