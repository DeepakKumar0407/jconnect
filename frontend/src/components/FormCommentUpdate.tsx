
import { useState } from "react";
import type { iComment } from "./interfaces";
import { useMutation } from "@tanstack/react-query";

const FormCommentUpdate = ({postId,parentId,comm}:{postId:string,parentId?:string,comm:iComment}) => {
    const [comment,setComment]= useState(comm)
    const handleChange=(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
        const {name,value} = e.target
        setComment(state=>({
            ...state,
            [name]:value,
            postId:postId,
        }))
    }
     const submitData = async(data:BodyInit)=>{
        await fetch(`http://localhost:3000/comments/${comment._id}`,{
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
        if(parentId){
            setComment(state=>({
                ...state,
                parentId:parentId
            }))
        }
        const data = new FormData()
        Object.entries(comment).forEach(([key,value])=>{
            data.append(key,value)
        })
        mutate(data)
    }
  return (
    <div>
      <form className="w-full" onSubmit={handleSubmit}>
      <textarea name="textContent" value={comment.textContent} onChange={handleChange} required>Make a Comment</textarea>
      <label htmlFor="image">I</label><input type="file" name="imageContent" onChange={(e)=>{setComment(state=>({...state,imageContent:e.target.files?.[0]||null}))}}></input>
      <button>Submit</button>
      </form>
    </div>
  )
}
export default FormCommentUpdate