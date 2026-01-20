import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./components/Navbar";
import FriendsList from "./components/FriendsList";
import Footer from "./components/Footer";
import './App.css'
import { useEffect, useState } from "react";
import ProtectedRoutes from "./components/ProtectedRoutes";

export default function Layout() {
  const [screenWidth,setScreenWidth] = useState<number>(window.innerWidth)
  useEffect(() => {
  const onResize = () => setScreenWidth(window.innerWidth)

  window.addEventListener("resize", onResize)
  return () => window.removeEventListener("resize", onResize)
}, [])
  if(screenWidth>767){
    return (
      <>
      <ProtectedRoutes>
      <Navbar />
        <Outlet />
      <FriendsList />
      <Footer />
      <ScrollRestoration/>
      </ProtectedRoutes>
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