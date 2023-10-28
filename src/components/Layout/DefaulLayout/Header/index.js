import React, { useEffect, useRef } from "react";
import "./Header.scss";
import { Link, NavLink } from "react-router-dom";
const Header = () => {
  // const nav__link = [
  //   {
  //     path: "/home",
  //     display: "Trang chủ",
  //   },
  //   {
  //     path: "/create-avata",
  //     display: "Tạo avata",
  //   },
  //   {
  //     path: "/create-frame",
  //     display: "Tạo frame",
  //   },
  //   {
  //     path: "/contact",
  //     display: "Contact",
  //   },
  // ];
  const headerRef = useRef(null);
  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 96 ||
        document.documentElement.scrollTop > 96
      ) {
        headerRef.current?.classList.add("sticky__header");
      } else {
        headerRef.current?.classList.remove("sticky__header");
      }
    });
  };
  useEffect(() => {
    stickyHeaderFunc();
    return window.removeEventListener("scroll", stickyHeaderFunc);
  });
  return (
    <div className="container__header" ref={headerRef}>
      {/* Logo */}
      <div className="container__right">
        <div className="logo__img">
          <img src="/logo.svg" alt="sdeaew" />
        </div>
      </div>

      <ul className="container__left">
        {/* {nav__link.map((item) => {
          return (
            <li className="container__left-item">
              <NavLink to={item.path}>{item.display}</NavLink>
            </li>
          );
        })} */}
        {/* <li className='container__left-item'>
                <button>
                    <Link to='/register'>Đăng Ký</Link>
                </button>
            </li> */}
        <li className="container__left-item">
          <button>
            <Link to="/login">Đăng Nhập</Link>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
