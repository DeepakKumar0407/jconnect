import PostStructure from "../components/PostStructure"
import type { iPostRecived } from "../components/interfaces"
import { useQuery } from "@tanstack/react-query"

const Home = () => {
  const yaxis = screen.availHeight
  const { isPending,data,error } = useQuery({
  queryKey: ['post'],
  queryFn: async () => {
    const response = await fetch(
      'http://localhost:3000/posts',
    )
    return await response.json()
  },
  })
  
  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message
  return (
    <div className={`div`} style={{height:`${yaxis}px`}}>
    <h1>For You</h1>
    <div className="flex flex-col justify-baseline gap-20 mt-10 w-full pb-22">
      {data?.map((post:iPostRecived)=>(
        <div key={post._id}>
          <PostStructure post={post}/>
        </div>
      ))}
    </div>
    </div>
  )
}
export default Home