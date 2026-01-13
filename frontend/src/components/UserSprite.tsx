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
    <div>
      <p>profile pic</p>
      <p>{friend.userName}</p>
      {user?.following?.map((follow=>(follow===friend._id?(<button onClick={handleUnFollow} key={follow}>Unfollow</button>):(<button onClick={handleFollow} key={follow}>Follow</button>))))}{user?.following?.length?(""):(<button onClick={handleFollow}>Follow</button>)}
    </div>
  )
}
export default UserSprite