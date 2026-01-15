
import { useState } from "react"
import type { iPost } from "./interfaces"


const FormPost = () => {
  const [contentType,setContentType] = useState<boolean>(true)
  const handleClick = ()=>{
    setContentType(!contentType)
  }
  const initialData:iPost={
    textContent:"",
    imageContent:null,
    videoContent:null
  }
  const [postData,setPostData] = useState(initialData)

  const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
    const {name,value} = e.target
    setPostData(state=>({
      ...state,
      [name]:value
    }))
  }
  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const data = new FormData
    Object.entries(postData).forEach(([key,value])=>{
      data.append(key,value)
    })
    await fetch("http://localhost:3000/posts",{
      method:'POST',
      body:data
    })
  } 
  return (
    <div>
      <form className="w-full" onSubmit={handleSubmit}>
      <textarea value={postData.textContent} name="textContent"  onChange={handleChange} required>Make a post</textarea>
      <button onClick={handleClick} type="button">{contentType?("Video"):("Image")}</button>
      {contentType?(<label htmlFor="image">I<input type="file" name="imageContent" accept="image/*" onChange={(e)=>setPostData(state=>({...state,imageContent:e.target.files?.[0]||null}))}></input></label>):
      (<label htmlFor="video">V<input type="file" name="videoContent" accept="video/*" onChange={(e)=>setPostData(state=>({...state,videoContent:e.target.files?.[0]||null}))}></input></label>)}
      <button>submit</button>
      </form>
    </div>
  )
}
export default FormPost