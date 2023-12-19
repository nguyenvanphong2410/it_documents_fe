import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { SvgMenu } from "../svgs/SvgMenu";
import ImgDefault from "../../assets/images/img_default.jpg";
import { Context } from "../../context/Context";
import logo from "../../assets/images/logo/logormbg.png"
import styles from './style.module.scss';
import { Input } from 'antd';
import { Popover } from 'antd';
import "./mainNav.scss";
import { InfoCircleOutlined, LogoutOutlined } from "@ant-design/icons";

const { Search } = Input;

const MainNav = () => {
  const { user, dispatch } = useContext(Context);
  // console.log(user);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const [keyword, setKeyword] = useState();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${keyword.trim().toLowerCase().replace(/\s/g, "+")}`);
  };

  return (
    <nav className="mainNav">
      <div className="mainNav__sticky">
        {/* Top Bar */}
        <section className="mainNav__topBar" style={{
          background: user?.isAdmin
            ? "linear-gradient(to right, #333, #555)" // Gradient cho admin
            : "linear-gradient(to right, #a2c9eb, #1a478d)" // Gradient cho người dùng thông thường
        }}>
          <div className="mainNav__wrapper">
            <div className="mainNav__linksLeft">
              <NavLink to="/" className="mainNav__logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} >
                <span>
                  {/* {user?.isAdmin ? 'Admin' : "FITA Documents."} */}
                  {user?.isAdmin ? <h2>Admin</h2> : <img className={styles.logo} src={logo} alt="" />}
                </span>
              </NavLink>
              {user?.isAdmin && (
                <NavLink to="/overview" className="mainNav__linkAlt"> Tổng quan </NavLink>
              )}
              <Link to="/" className="mainNav__linkAlt"> Tài liệu </Link>
              {user?.isAdmin && (
                <NavLink to="/createCategory" className="mainNav__linkAlt"> Thể loại </NavLink>
              )}
            
              <NavLink to="/write" className="mainNav__linkAlt"> Tạo tài liệu </NavLink>
              {
                user?.isAdmin ? '' : <NavLink to="/intro" className="mainNav__linkAlt">Giới thiệu </NavLink>
              }

              
            </div>

            <div className="mainNav__aside">
              <form onSubmit={handleSubmit}>
                <div className="mainNav__search">
                  <Search placeholder="Tìm kiếm tài liệu" allowClear size="large" onChange={(e) => setKeyword(e.target.value)} />
                </div>
              </form>
              {user ? (
                <>
                  <NavLink to="/settings" className="mainNav__profile">
                    <img src={user.profilePic ? user.profilePic : ImgDefault} alt="" />
                  </NavLink>
                  <Popover style={{ width: '50px' }} title={
                    <div className={styles.popoverMainNavWrap}>
                      <div> <Link to="/settings" className={styles.textMyInfo}>
                      <InfoCircleOutlined className={styles.iconInfo}/> Hồ sơ của bạn 
                        </Link></div>
                      <span className={styles.line}></span>
                      <div onClick={handleLogout} className={styles.textLogout}>
                      <LogoutOutlined className={styles.iconLogout}/>
                        Đăng xuất
                      </div>
                    </div>
                  }>
                    <p style={{ color: "white", marginLeft: "8px" }}>
                      {user.username}
                    </p>
                  </Popover>

                </>
              ) : (
                <div className="mainNav__linksRight">
                  <NavLink to="/login" className="mainNav__linkAlt">Đăng nhập</NavLink>
                  <span>/</span>
                  <NavLink to="/register" className="mainNav__linkAlt">Đăng ký</NavLink>
                </div>
              )}
              {/* <NavLink to="/language" className="mainNav__language">EN</NavLink> */}
              <div className="mainNav__icon mainNav__icon--menuMobile">
                <SvgMenu />
              </div>
            </div>
          </div>
          {/* Top BarMobile */}
          <div className="mainNav__topBarMobile">
            <div className="mainNav__wrapper">
              <div className="mainNav__linksCenter">
                <NavLink to="/" className="mainNav__linkAlt"> Trang chủ </NavLink>
                <NavLink to="/intro" className="mainNav__linkAlt"> Giới thiệu </NavLink>
                <NavLink to="/write" className="mainNav__linkAlt"> Tạo tài liệu </NavLink>
                {user && (
                  <div className="mainNav__linkAlt" onClick={handleLogout}>
                    Đăng xuất
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        {/* Menu Bar */}
        <section className="mainNav__menuBar">
          <ul className="mainNav__mainLinks">
            <li className="mainNav__menuItem">
              <NavLink to={`/settings`} className="mainNav__link"> Hồ sơ của bạn </NavLink>
            </li>
            <li className="mainNav__menuItem">
              <NavLink to={`/users/`} className="mainNav__link"> Người dùng thành viên </NavLink>
            </li>
            <li className="mainNav__menuItem">
              <NavLink to="/pendingPost" className="mainNav__link"> Tài liệu đang chờ </NavLink>
            </li>
          </ul>
        </section>
      </div>
    </nav>
  );
};

export default MainNav;
