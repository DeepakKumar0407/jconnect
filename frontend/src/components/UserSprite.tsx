import type { iUser } from "./interfaces"

const UserSprite = ({friend,user}:{friend:iUser,user:iUser|undefined}) => {
  const handleFollow= async()=>{
    const following = await fetch('http://localhost:3000/users/follow/follow',{
      method:"PATCH",
      headers:{
        "Content-Type":"text/plain"
      },
      body:friend?._id
    })
     if(!following.ok){
      console.log('something went wrong')
    }  
  }
  const handleUnFollow= async()=>{
    const following = await fetch('http://localhost:3000/users/unfollow/follow',{
      method:"PATCH",
      headers:{
        "Content-Type":"text/plain"
      },
      body:friend?._id
    })
     if(!following.ok){
      console.log('something went wrong')
    }  
  }
  return (
    <div className="mt-5 border-2 border-white/20 p-2">
      <div className="flex justify-baseline gap-2">
        {friend?.profilePic?(<img src={friend.profilePic} className="w-10 h-10 rounded-4xl"></img>):
        (<p className="bg-white text-black w-10 h-10 flex rounded-4xl justify-center items-center md:text-xl">{friend?.userName[0].toUpperCase()}</p>)}
      <div className="flex justify-baseline gap-2 flex-col">
          <p className="w-1/2 md:text-xl">@{friend?.userName}</p>
        <p className="w-1/2 md:text-xl">{friend?.name}</p>
      </div>
      </div>
      <div className="text-right w-full">
      {user?.following?.map((follow=>(follow===friend._id?(<button onClick={handleUnFollow} key={follow}>Unfollow</button>)
      :(<button onClick={handleFollow} key={follow}>Follow</button>))))}{user?.following?.length?(""):
      (<button onClick={handleFollow}>Follow</button>)}
      </div>
    </div>
  )
}
export default UserSprite