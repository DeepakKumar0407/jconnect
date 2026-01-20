
import {useMemo } from "react"
import CommentStructure from "./CommentStructure"
import type { CommentNode, iCommentRecived } from "./interfaces"
import { useQuery } from "@tanstack/react-query"

const Comment = ({postId}:{postId:string|undefined}) => {
  const { isPending,data,error } = useQuery({
  queryKey: ['comments',postId],
  queryFn: async () => {
    const response = await fetch(
      `http://localhost:3000/comments/${postId}/post`,{
        method:'GET',
        headers:{
          'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
        }
      }
    )
    return await response.json()
  },
  })
  
  function buildCommentTree(comments: iCommentRecived[]):CommentNode[] {
  const map: Record<string, CommentNode> = {};
  const roots: CommentNode[] = [];
  comments?.forEach((comment) => {
    const id = comment._id.toString();
    map[id] = {
      ...comment,
      children: []
    };
  });
  comments?.forEach((comment) => {
    const id = comment._id.toString();
    const parentId = comment.parentId?.toString();

    if (parentId && map[parentId]) {
      map[parentId].children.push(map[id]);
    } else {
      roots.push(map[id]);
    }
  });
  return roots;
}
const commentTree = useMemo(() => {
  if (!data?.length) return [];
  return buildCommentTree(data);
}, [data]);
  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message
  return (
    <div className="flex flex-col gap-10 mb-22">
    {commentTree?.map((child:CommentNode)=>(
      <div key={child._id} className="border-2 border-white/50 bg-white/5 rounded p-4 overflow-y-auto">
        <CommentStructure comment={child} postId={postId}/>
      </div>
    ))}
    </div>
  )
}
export default Comment