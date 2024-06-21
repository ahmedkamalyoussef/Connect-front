import React from "react";
import { Outlet } from "react-router-dom";
import { Offline } from "react-detect-offline";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../Components/Footer/Footer";
import CustomNavbar from "../Components/NavBar/Navbar";
import Profile from "../Components/Profile/Profile";

export default function AppLayout() {
  const notifyOffline = () => {
    toast.error("You are currently offline", {
      position: "top-right",
    });
  };

  return (
    <>
      <CustomNavbar/>
      <Offline>{notifyOffline()}</Offline>
      <Profile />
      <Footer/>
    </>
  );
}
