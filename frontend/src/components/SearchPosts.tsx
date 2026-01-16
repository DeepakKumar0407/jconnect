import type { iPostRecived } from "./interfaces"
import { useQuery } from "@tanstack/react-query"

const SearchPosts = ({blob}:{blob:string}) => {
  const { data:searchResult} = useQuery<iPostRecived[]>({
  queryKey: ['searchResult',blob],
  queryFn: async () => {
    const response = await fetch(
      `http://localhost:3000/posts/${blob}/search`,
    )
    return await response.json()
  },
  })
  return (
    searchResult?.map((post:iPostRecived)=>(
      <div key={post._id}>
        <p>{post.textContent}</p>
      </div>
    ))
  )
}
export default SearchPosts