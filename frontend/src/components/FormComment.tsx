
import { useState } from "react";
import type { iComment } from "./interfaces";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { PhotoIcon } from "@heroicons/react/24/solid";

const FormComment = ({postId,parentId,type}:{postId:string|undefined,parentId?:string|null,type:string}) => {
    const id = type
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
            headers:{
                'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
            },
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
    <div>
    <div>
      <form className="w-full flex flex-col lg:flex-row justify-baseline gap-3" onSubmit={handleSubmit}>
      <textarea className="lg:w-1/2 placeholder:text-white placeholder:text-sm border-2 border-white rounded p-1 w-full" rows={1} name="textContent" value={comment.textContent} onChange={handleChange} placeholder={`Make a ${type}`} required></textarea>
      <div className="flex justify-baseline gap-3">
        <label htmlFor={id==='comment'?"comment":"reply"} onClick={()=>console.log(type)}><PhotoIcon className="icon"/><input id={id==='comment'?"comment":"reply"} type="file" name="imageContent" onChange={(e)=>{setComment(state=>({...state,imageContent:e.target.files?.[0]||null}))}} className="hidden"></input></label>
        <button>Post</button>
      </div>
      </form>
      <div>{comment.imageContent&&<img src={URL.createObjectURL(comment.imageContent)} className="w-1/2 mt-2 mb-2"></img>}</div>
      {id==='reply'?(<Link to={`/post_details/${postId}`}>Back</Link>):("")}
    </div>
    </div>
  )
}
export default FormComment