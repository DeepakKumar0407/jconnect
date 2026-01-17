import { useMutation } from "@tanstack/react-query"
import type { iUser } from "./interfaces"

const UserSprite = ({friend,user}:{friend:iUser,user:iUser|undefined}) => {
const submitFollow = async(id:string|undefined)=>{
          await fetch('http://localhost:3000/users/follow/follow',{
      method:"PATCH",
      headers:{
        "Content-Type":"text/plain"
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
        "Content-Type":"text/plain"
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
    <div className="mt-5 border-2 border-white/20 p-2 w-full">
      <div className="flex justify-baseline gap-4">
        {friend?.profilePic?(<img src={friend.profilePic} className="w-10 h-10 lg:w-15 lg:h-15 rounded-full"></img>):
        (<p className="bg-white text-black w-10 h-10 lg:w-15 lg:h-15 flex rounded-full justify-center items-center md:text-xl">{friend?.userName[0].toUpperCase()}</p>)}
      <div className="flex justify-baseline gap-2 flex-col">
          <p className="w-1/2 lg:text-2xl">@{friend?.userName}</p>
        <p className="w-1/2 lg:text-2xl">{friend?.name}</p>
      </div>
      </div>
      <div className="text-right w-full">
      {friend._id&& user?.following?.includes(friend._id)?(<button onClick={handleUnFollow} className="p-2 bg-red-600 hover:bg-red-500 cursor-pointer rounded">Unfollow</button>)
      :(<button onClick={handleFollow} className="p-2 bg-green-600 hover:bg-green-500 cursor-pointer rounded">Follow</button>)}
      </div>
    </div>
  )
}
export default UserSprite