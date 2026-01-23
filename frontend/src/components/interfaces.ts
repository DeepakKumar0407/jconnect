
export interface iNotification {
  _id:string;
  type:string;
  userId:string;
  postId:string;
  notifOnid:string;
  notifContent:string;
}

export interface iChat {
  text:string;
  senderId:string;
}
export interface iRoom {
  senderId:string;
  reciverId:string;
}

export interface JWTStructure{
  iat:number;
  signInTime:number;
  userId:string;
  userEmail:string;
  username:string;
}

export interface iUser {
  _id?:string;
  name:string;
  profilePic?:File|null;
  userName:string;
  email:string;
  phone:string;
  dob:string;
  bio?:string;
  password?:string;
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
  userId:string;
  userName:string;
  textContent:string;
  imageContent?:string;
  videoContent?:string;
  likesCount?:string;
  commentCount?:string;
  profilePic?:string;
}

export interface iLogin {
  email:string;
  password:string;
}

export interface iComment {
        _id?:string;
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