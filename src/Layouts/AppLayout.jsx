import React from "react";
import { Outlet } from "react-router-dom";
import { Offline } from "react-detect-offline";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "../Components/NavBar/Navbar";

export default function AppLayout() {
  const notifyOffline = () => {
    toast.error("You are currently offline", {
      position: "top-right",
    });
  };

  return (
    <>
      <NavBar/>
      <Offline>{notifyOffline()}</Offline>
      <Outlet />
    </>
  );
}
