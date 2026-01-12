
import {useEffect, useMemo, useState } from "react"
import CommentStructure from "./CommentStructure"
import type { CommentNode, iCommentRecived } from "./interfaces"

const Comment = ({postId}:{postId:string}) => {
  const [comments,setComments] = useState<iCommentRecived[]>()
  useEffect(()=>{
    const getComments = async()=>{
      const res = await fetch(`http://localhost:3000/comments/${postId}/post`)
      const data = await res.json()
      setComments(data)
    }
    getComments()
  },[postId])

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
  if (!comments?.length) return [];
  return buildCommentTree(comments);
}, [comments]);
  console.log(commentTree)
  return (
    <div className="flex flex-col gap-10">
    {commentTree?.map((child:CommentNode,index:number)=>(
      <div key={index}>
        <CommentStructure comment={child} text="comment"/>
      </div>
    ))}
    </div>
  )
}
export default Comment