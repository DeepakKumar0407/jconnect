import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./components/Navbar";
import FriendsList from "./components/FriendsList";
import Footer from "./components/Footer";
import './App.css'
import { useState } from "react";

export default function Layout() {
  const [scrennWidth,setScreenWidth] = useState<number>(1500)
  window.addEventListener('resize',()=>setScreenWidth(window.innerWidth))
  if(scrennWidth>768){
    return (
    <>
      <Navbar />
        <Outlet />
      <FriendsList />
      <Footer />
      <ScrollRestoration/>
    </>
  );
}else{
  return (
    <>
      <Navbar />
        <Outlet />
      <Footer />
      <ScrollRestoration/>
    </>
  );
}
}