import type { iUser } from "./interfaces"
import { useQuery } from "@tanstack/react-query"

const SearchUsers= ({blob}:{blob:string}) => {
  const { data:searchResult } = useQuery({
  queryKey: ['searchResult',blob],
  queryFn: async () => {
    const response = await fetch(
      `http://localhost:3000/users/${blob}/search`,{
        method:'GET',
        headers:{
          'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
        }
      }
    )
    return await response.json()
  },
  })
  return (
    searchResult?.map((user:iUser)=>(
      <div key={user._id}>
        <p>{user.name}</p>
      </div>
    ))
  )
}
export default SearchUsers