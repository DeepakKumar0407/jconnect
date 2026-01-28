import { useMutation } from "@tanstack/react-query"
import type { iChat } from "./interfaces"
import { TrashIcon } from "@heroicons/react/24/solid"

const DeleteChat = ({chat}:{chat:iChat}) => {
    const deleteChat = async ()=>{
        await fetch(`http://localhost:3000/chats/${chat._id}`,{
            method:"DELETE",
            headers:{
                'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
            }
        })
    }
    const {mutate} = useMutation({mutationFn:deleteChat})
    const handleDelete = ()=>{
        mutate()
    }
  return (
        <button onClick={handleDelete}><TrashIcon className="icon"></TrashIcon></button>
  )
}
export default DeleteChat