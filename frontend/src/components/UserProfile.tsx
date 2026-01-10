import { useEffect, useState } from "react"

const UserProfile = () => {
    const email = 'jwt'
    const [user,setUser] = useState()
    useEffect(()=>{
        const getUser = async()=>{
            const res = await fetch(`http://localhost:3000/${email}`)
            const data = await res.json()
            setUser(data)
        }
        getUser()
    },[])
  return (
    <div>
        <p>Spread the user</p>
    </div>
  )
}
export default UserProfile