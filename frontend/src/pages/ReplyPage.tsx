import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import FormReply from "../components/FormReply"

const ReplyPage = () => {
    const {postId,parentId} = useParams()
    const [yaxis,setYAxis] = useState(window.innerHeight)
    useEffect(() => {
        const updateHeight = () => setYAxis(window.innerHeight)

        updateHeight()
        window.addEventListener("resize", updateHeight)

        return () => window.removeEventListener("resize", updateHeight)
    }, [])
  return (
    <div className={`div overflow-auto`} style={{height:`${yaxis}px`}}>
           <FormReply
          postId={postId}
          parentId={parentId}
          type="reply"
        />
    </div>
  )
}
export default ReplyPage