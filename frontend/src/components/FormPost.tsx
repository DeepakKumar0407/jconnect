"use client"

import { useState } from "react"

export interface iPost {
  textContent:string,
  imageContent?:File|null,
  videoContent?:File|null
}
const FormPost = () => {
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
      <label htmlFor="image">I</label><input type="file" name="imageContent" onChange={(e)=>setPostData(state=>({...state,imageContent:e.target.files?.[0]||null}))}></input>
      <label htmlFor="video">V</label><input type="file" name="videoContent" onChange={(e)=>setPostData(state=>({...state,videoContent:e.target.files?.[0]||null}))}></input>
      <button>submit</button>
      </form>
    </div>
  )
}
export default FormPost