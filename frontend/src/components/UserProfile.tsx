import { useMutation } from "@tanstack/react-query"
import type { iUser } from "./interfaces"
import { Link } from "react-router-dom"

const UserProfile = ({user,userCurrent}:{user:iUser|undefined,userCurrent:iUser|undefined}) => {
    const submitFollow = async(id:string|undefined)=>{
          await fetch('http://localhost:3000/users/follow/follow',{
      method:"PATCH",
      headers:{
        "Content-Type":"text/plain",
        'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
      },
      body:id
    })
      }
  const {mutate:mutateFollow,error:followError} = useMutation({mutationFn:submitFollow})
    const handleFollow = async()=>{
    mutateFollow(user?._id)
    if(followError){
      console.log('something went wrong')
    } 
  }
  const submitUnFollow = async(id:string|undefined)=>{
          await fetch('http://localhost:3000/users/unfollow/follow',{
      method:"PATCH",
      headers:{
        "Content-Type":"text/plain",
        'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
      },
      body:id
    })
      }
  const {mutate:mutateUnFollow,error:unFollowError} = useMutation({mutationFn:submitUnFollow})
  const handleUnFollow= async()=>{
    mutateUnFollow(user?._id)
    if(unFollowError){
      console.log('something went wrong')
    }  
  }
  return (
    <div className="w-full flex flex-col justify-baseline gap-3">
      {user?.profilePic?(<img src={user.profilePic} className="w-40 h-40 lg:w-20 lg:h-20 rounded-full"></img>):
        (<p className="bg-white text-black w-20 h-20 lg:w-40 lg:h-40 flex rounded-full justify-center items-center text-xl lg:text-6xl font-bold">{user?.userName[0].toUpperCase()}</p>)}
      <div className="ml-5">
        <p className="lg:text-2xl">{user?.name}</p>
        <p className="lg:text-xl mb-3">@{user?.userName}</p>
        <p className="lg:text-2xl">Mob:-{user?.phone}</p>
        <p className="lg:text-2xl mb-3">Email:-{user?.email}</p>
        <p className="lg:text-2xl">Birthday: {user?.dob}</p>
        <p className="lg:text-xl mb-3">{user?.bio}</p>
      </div>
      {userCurrent?.email!==user?.email&&
      <div className="">
      {user?._id&& userCurrent?.following?.includes(user._id)?(<button onClick={handleUnFollow}>Unfollow</button>)
      :(<button onClick={handleFollow}>Follow</button>)}
      </div>}
      {userCurrent?.email!==user?.email&&
      <div>
        <Link to={`/chat_room/${user?._id}`}>Chat</Link>
      </div>}
    </div>
  )
}
export default UserProfile