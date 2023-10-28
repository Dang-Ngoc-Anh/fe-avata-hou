import React from "react";
import "./Sidebar.scss";
import { Navigate, useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <i className="fa-solid fa-house" onClick={() => navigate('/home/')}></i>
      <i className="fa-regular fa-user" onClick={() => navigate('/home/')}></i>
      <i class="fa-solid fa-bars" onClick={() => navigate('/home/')}></i>
      <i class="fa-solid fa-phone" onClick={() => navigate('/home/')}></i>
    </div>
  );
};

export default Sidebar;
