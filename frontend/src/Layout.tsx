import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./components/Navbar";
import FriendsList from "./components/FriendsList";
import Footer from "./components/Footer";
import './App.css'

export default function Layout() {
  return (
    <>
      <Navbar />
        <Outlet />
      <FriendsList />
      <Footer />
      <ScrollRestoration/>
    </>
  );
}