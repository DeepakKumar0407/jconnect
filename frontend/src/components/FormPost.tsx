
import { useState } from "react"
import type { iPost } from "./interfaces"
import { useMutation } from "@tanstack/react-query"


const FormPost = ({state}:{state:string}) => {
  const [contentType,setContentType] = useState<string>('image')
  const handleClickImage = ()=>{
      setContentType('image')
  }
  const handleClickVideo = ()=>{
      setContentType('video')
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
  const submitPost = async(data:BodyInit)=>{
          await fetch("http://localhost:3000/posts",{
          method:'POST',
          body:data
         })
      }
  const {mutate} = useMutation({mutationFn:submitPost})
  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const data = new FormData
    Object.entries(postData).forEach(([key,value])=>{
      data.append(key,value)
    })
    mutate(data)
  } 
  return (
    <div className={`${state}`}>
      <form className="flex flex-col w-9/10 border-2 border-white/20 rounded mx-auto p-2" onSubmit={handleSubmit}>
      <textarea value={postData.textContent} name="textContent" placeholder="Type something..." onChange={handleChange} required className="border-l-2 border-white/20 w-8/10 mx-auto" rows={5}>Make a post</textarea>
      <span className="w-full">
      <button onClick={handleClickImage} type="button" className="p-2 bg-green-600">Image</button>
      <button onClick={handleClickVideo} type="button" className="p-2 bg-green-600">Video</button>
      </span>
      {contentType==='image'?(<label htmlFor="image">Select Image<input id="image" type="file" name="imageContent" accept="image/*" onChange={(e)=>setPostData(state=>({...state,imageContent:e.target.files?.[0]||null}))} className="hidden"></input></label>):
      (<label htmlFor="video">Select Video<input id="video" type="file" name="videoContent" accept="video/*" onChange={(e)=>setPostData(state=>({...state,videoContent:e.target.files?.[0]||null}))} className="hidden"></input></label>)}
      <button>submit</button>
      </form>
    </div>
  )
}
export default FormPost