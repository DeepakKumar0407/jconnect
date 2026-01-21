
import {createBrowserRouter, ScrollRestoration,} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ChatRoom from "./pages/ChatRoom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import PostDetail from "./pages/PostDetail";
import Profile from "./pages/Profile";
import SavedPosts from "./pages/SavedPosts";
import SearchResults from "./pages/SearchResults";
import Setting from "./pages/Setting";
import Notifications from "./pages/Notifications";
import Post from "./pages/Post";
import Layout from "./Layout";
import './App.css'
import ReplyPage from "./pages/ReplyPage";


const router = createBrowserRouter([
  {path:"/",element:<Login/>},
  {path:"/register",element:<Registration/>},
  {
    element: <Layout />,
    children: [
      { path: "/about", element: <About /> },
      { path: "/chat_room", element: <ChatRoom /> },
      { path: "/home", element: <Home /> },
      { path: "/post_details/:id", element: <PostDetail />,children:[{path: "/post_details/:id/reply/:postId/:parentId", element: <ReplyPage />}] },
      { path: "/profile/:id", element: <Profile /> },
      { path: "/saved", element: <SavedPosts /> },
      { path: "/search/:blob", element: <SearchResults /> },
      { path: "/settings", element: <Setting /> },
      { path: "/notifications", element: <Notifications /> },
      { path: "/post", element: <Post /> },
    ],
  },
]);
<ScrollRestoration/>
export default router