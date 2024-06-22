import React from "react";
import { Outlet } from "react-router-dom";
import { Offline } from "react-detect-offline";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../Components/Footer/Footer";
import CustomNavbar from "../Components/NavBar/Navbar";
import CustomerSetting from "../Components/Settings/Customer/CustomerSetting";
import FreelancerSettings from "../Components/Settings/Freelancer/FreelancerSettings";

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
      <FreelancerSettings />
      <Footer/>
    </>
  );
}
