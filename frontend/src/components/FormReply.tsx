
import { useState } from "react";
import type { iComment } from "./interfaces";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { PhotoIcon } from "@heroicons/react/24/solid"

const FormReply = ({postId,parentId,type}:{postId:string|undefined,parentId?:string|null,type:string}) => {
    
    const initialData:iComment = {
        textContent:"",
        postId:"",
        imageContent:null
    }
    const [comment,setComment]= useState(initialData)

    const handleChange=(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
        const {name,value} = e.target
        setComment(state=>({
            ...state,
            [name]:value,
            postId:postId?postId:'',
        }))
        if(parentId){
            setComment(state=>({
                ...state,
                parentId:parentId
            }))
        }
        console.log(type)
    }
    const submitData = async(data:BodyInit)=>{
        await fetch('http://localhost:3000/comments',{
            method:"POST",
            body:data
        })
    }
    const {mutate} = useMutation({mutationFn:submitData})
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const data = new FormData()
        Object.entries(comment).forEach(([key,value])=>{
            data.append(key,value)
        })
        mutate(data)
    }
    
  return (
    <div className="w-full min-w-1/2">
      <form className="w-full flex flex-col justify-baseline gap-5" onSubmit={handleSubmit}>
      <textarea className="w-full min-w-50 placeholder:text-white placeholder:text-sm border-2 border-white rounded p-1" rows={5} cols={5} name="textContent" value={comment.textContent} onChange={handleChange} placeholder={`Make a ${type}`} required></textarea>
      <label htmlFor="reply" onClick={()=>console.log(type)}><PhotoIcon className="icon"/><input id="reply" type="file" name="imageContent" onChange={(e)=>{setComment(state=>({...state,imageContent:e.target.files?.[0]||null}))}} className="hidden"></input></label>
      <button className="p-2 text-center bg-green-600 hover:bg-green-500 w-fit mx-auto cursor-pointer rounded mb-5">Post</button>
      </form>
      <div>{comment.imageContent&&<img src={URL.createObjectURL(comment.imageContent)} className="w-1/2 min-w-50 mt-2 mb-5"></img>}</div>
      <Link to={`/post_details/${postId}`} className=" bg-red-600 hover:bg-red-500 p-2 pl-4 pr-4 rounded cursor-pointer text-xl">&larr;</Link>
    </div>
  )
}
export default FormReply