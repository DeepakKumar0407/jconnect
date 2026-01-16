import { useMutation } from "@tanstack/react-query"
import type { iUser } from "./interfaces"

const UserProfile = ({user,userCurrent}:{user:iUser|undefined,userCurrent:iUser|undefined}) => {
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
    <div>
      <p>Image</p>
      <p>{user?.name}</p>
      <p>All user details</p>
      <p>Edit Profile</p>
      <p>Posts</p>
      <p>Comments made</p>
      <p>Likes made</p>
      {userCurrent?.email!==user?.email&&
      <div className="">
      {user?._id&& userCurrent?.following?.includes(user._id)?(<button onClick={handleUnFollow}>Unfollow</button>)
      :(<button onClick={handleFollow}>Follow</button>)}
      </div>
    }
    </div>
  )
}
export default UserProfile