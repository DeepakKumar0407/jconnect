import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import ChatRoom from './pages/ChatRoom.tsx'
import Login from './pages/Login.tsx'
import Registration from './pages/Registration.tsx'
import PostDetail from './pages/PostDetail.tsx'
import Profile from './pages/Profile.tsx'
import SavedPosts from './pages/SavedPosts.tsx'
import SearchResults from './pages/SearchResults.tsx'
import Setting from './pages/Setting.tsx'
import Navbar from './components/Navbar.tsx'
import FriendsList from './components/FriendsList.tsx'
import Footer from './components/Footer.tsx'
import Notifications from './pages/Notifications.tsx'
import Post from './pages/Post.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path={"/"} element={<Home/>}/>
    <Route path={"/about"} element={<About/>}/>
    <Route path={"/chat_room"} element={<ChatRoom/>}/>
    <Route path={"/login"} element={<Login/>}/>
    <Route path={"/register"} element={<Registration/>}/>
    <Route path={"/post_details"} element={<PostDetail/>}/>
    <Route path={"/profile"} element={<Profile/>}/>
    <Route path={"/saved"} element={<SavedPosts/>}/>
    <Route path={"/search/:blob"} element={<SearchResults/>}/>
    <Route path={"/settings"} element={<Setting/>}/>
    <Route path={"/notifications"} element={<Notifications/>}/>
    <Route path={"/post"} element={<Post/>}/>
    </Routes>
    <FriendsList/>
    <Footer/>
    </BrowserRouter>
  </StrictMode>,
)
