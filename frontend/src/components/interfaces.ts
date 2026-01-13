
export interface iNotification {
  _id:string;
  type:string;
  userId:string;
  id:string
}

export interface iUser {
  _id?:string;
  name:string;
  userName:string;
  email:string;
  phone:string;
  dob:string;
  password:string;
  followers?:string[];
  following?:string[];
}

export interface iPost {
  textContent:string,
  imageContent?:File|null,
  videoContent?:File|null
}

export interface iPostRecived {
  _id:string;
  userName:string;
  textContent:string;
  imageContent?:string;
  videoContent?:string;
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