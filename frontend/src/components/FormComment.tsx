
import { useState } from "react";

export interface iComment {
        textContent:string;
        imageContent?:File|null;
        parentId?:string;
        postId:string;
    }
const FormComment = ({postId,parentId}:{postId:string,parentId?:string|null}) => {
   
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
            postId:postId,
        }))
        if(parentId){
            setComment(state=>({
                ...state,
                parentId:parentId
            }))
        }
    }
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const data = new FormData()
        Object.entries(comment).forEach(([key,value])=>{
            data.append(key,value)
        })
        await fetch('http://localhost:3000/comments',{
            method:"POST",
            body:data
        }
        )
        console.log(comment)
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
export default FormComment