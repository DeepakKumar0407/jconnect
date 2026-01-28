import type { iPostRecived } from "./interfaces"
import { useQuery } from "@tanstack/react-query"
import PostStructure from "./PostStructure"

const SearchPosts = ({blob}:{blob:string}) => {
  const { data:searchResult,isPending,error} = useQuery<iPostRecived[]>({
  queryKey: ['searchResult',blob],
  queryFn: async () => {
    const response = await fetch(
      `http://localhost:3000/posts/${blob}/search`,{
        method:'GET',
        headers:{
          'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
        }
      }
    )
    return await response.json()
  },
  })
  if (isPending) return (
    <div className="div">
      <h1>Loading...</h1>
    </div>
  )

  if (error) return (
    <div className="div">
      <h1>An error has occurred: {error.message}</h1>
    </div>
  )
  return (
   <div className=" overflow-auto flex flex-col justify-baseline gap-20 mt-10 w-full pb-22">
      {searchResult?.map((post:iPostRecived)=>(
        <div key={post._id}>
          <PostStructure post={post}/>
        </div>
      ))}
    </div>
  )
}
export default SearchPosts