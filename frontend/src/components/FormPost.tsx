import { useState } from "react"
import type { iPost } from "./interfaces"
import { useMutation } from "@tanstack/react-query"
import { PhotoIcon } from "@heroicons/react/24/solid"
import { VideoCameraIcon } from "@heroicons/react/24/solid"
import { Editor, EditorProvider } from "react-simple-wysiwyg"

const FormPost = ({state}:{state:string}) => {
  const [contentType,setContentType] = useState<string>('image')
  const initialData:iPost={
    textContent:"",
    imageContent:null,
    videoContent:null
  }
  const [postData,setPostData] = useState(initialData)
  const handleClickImage = ()=>{
      setContentType('image')
      setPostData(state=>({
        ...state,
        videoContent:null
      }))
  }
  const handleClickVideo = ()=>{
      setContentType('video')
      setPostData(state=>({
        ...state,
        imageContent:null
      }))
  }
  const submitPost = async(data:BodyInit)=>{
          await fetch("http://localhost:3000/posts",{
          method:'POST',
          headers:{
              'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
          },
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
      <form className="flex flex-col w-9/10 border-2 border-white/20 rounded mx-auto p-2 pt-4" onSubmit={handleSubmit}>
      <EditorProvider>
      <Editor value={postData.textContent} onChange={(e)=>setPostData(state=>({...state,textContent:e.target.value}))} className="border-l-2 border-white/20 w-8/10 mx-auto p-2" placeholder="type something..." />
      </EditorProvider>
      <span className="w-8/10 mx-auto">
      <button onClick={handleClickImage} type="button" className="p-2 cursor-pointer"><PhotoIcon className="icon"/></button>
      <button onClick={handleClickVideo} type="button" className="p-2 cursor-pointer"><VideoCameraIcon className="icon"/></button>
      </span>
      {contentType==='image'?(<label htmlFor="image" className="w-8/10 mx-auto">Select Image<input id="image" type="file" name="imageContent" accept="image/*" onChange={(e)=>setPostData(state=>({...state,imageContent:e.target.files?.[0]||null}))} className="hidden"></input></label>):
      (<label htmlFor="video" className="w-8/10 mx-auto">Select Video<input id="video" type="file" name="videoContent" accept="video/*" onChange={(e)=>setPostData(state=>({...state,videoContent:e.target.files?.[0]||null}))} className="hidden"></input></label>)}
      <button className="p-2 text-center bg-green-600 hover:bg-green-500 w-fit mx-auto cursor-pointer rounded">post</button>
      <div className="w-8/10 mx-auto">
      {postData.imageContent&&<img src={URL.createObjectURL(postData.imageContent)} className=" mt-2 mb-2"></img>}
      {postData.videoContent&&<video controls className="mt-2 mb-2">
        <source src={URL.createObjectURL(postData.videoContent)} type="video/mp4"></source>
      </video>}
      </div>
      </form>
    </div>
  )
}
export default FormPost