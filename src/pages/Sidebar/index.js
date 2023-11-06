import React from "react";
import "./Sidebar.scss";
import { Navigate, useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <i className="icon fa-solid fa-house" onClick={() => navigate('/')}><div className="title__icon">Trang chủ</div></i>
      <i className="icon fa fa-object-group" aria-hidden="true" onClick={() => navigate('/create-frame')}><div className="title__icon">Tạo frame</div></i>
      <i className="icon fa fa-user-circle" aria-hidden="true" onClick={() => navigate('/')}><div className="title__icon">Tạo avata</div></i>
      <i className="icon fa fa-sign-in" aria-hidden="true" onClick={() => navigate('/login')}><div className="title__icon">Đăng nhập</div></i>
    </div>
  );
};

export default Sidebar;
