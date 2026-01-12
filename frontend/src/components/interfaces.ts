export interface iPostRecived {
  _id:string;
  userName:string;
  textContent:string;
  imageContent?:string;
  videoContent?:string;
}

export interface iNotification {
  type:string;
  userId:string;
  id:string
}

export interface iUser {
  name:string;
  userName:string;
  email:string;
  phone:string;
  dob:string;
  password:string;
}

export interface iPost {
  textContent:string,
  imageContent?:File|null,
  videoContent?:File|null
}

export interface iLogin {
  email:string;
  password:string;
}

export interface iComment {
        textContent:string;
        imageContent?:File|null;
        parentId?:string;
        postId:string;
    }

export interface iCommentRecived{
    _id:string;
    textContent:string;
    imageContent:string;
    postId:string;
    userId:string;
    parentId:string|null;
    likes:[];
    likesCount:number
}

export interface CommentNode extends iCommentRecived {
  children: CommentNode[];
}