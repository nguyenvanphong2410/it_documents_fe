import React, { useContext, useEffect, useState } from 'react';
import { CompressOutlined, FileOutlined, FileTextOutlined, FullscreenOutlined, InfoCircleOutlined, LogoutOutlined, PieChartOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Image, Layout, Menu, Popover, theme } from 'antd';
// import MainNav from '../mainNav/MainNav';
import styles from './style.module.scss'
import { Context } from '../../context/Context';
import { Link } from 'react-router-dom';
import logo from "../../assets/images/logo/logormbg.png"
import { Routes, Route } from "react-router-dom";
import PageNotFound from '../pageNotFound/PageNotFound';
import Home from '../../pages/home/Home';
import Intro from '../../pages/intro/Intro';
import Contacts from '../../pages/contacts/Contacts';
import Login from '../../pages/login/Login';
import Register from '../../pages/register/Register';
import Write from '../../pages/write/Write';
import EditPost from '../../pages/editPost/EditPost';
import Post from '../../pages/post/Post';
import Settings from '../../pages/settings/Settings';
import OverView from '../../pages/overview/OverView';
import Articles from '../../pages/articles/Articles';
import PendingPost from '../../pages/pendingPost/PendingPost';
import Users from '../../pages/users/Users';
import CreateCategory from '../../pages/createCategory/CreateCategory';



const SidebarAdmin = () => {
    const { Header, Content, Footer, Sider } = Layout;
    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }
    const items = [
        // <Image />,
        getItem(<Link to="/" onClick={ () => handleBreadcrumb('Tổng quan')}>Tổng quan</Link>, '1', <PieChartOutlined />),
        getItem(<Link to="/users" onClick={ () => handleBreadcrumb('Người dùng')}>Người dùng</Link>, '2', <UserOutlined />),
        getItem(<Link to="/documents" onClick={ () => handleBreadcrumb('Tài liệu')} >Tài liệu</Link>, '3', <FileTextOutlined />),
        getItem(<Link to="/createCategory" onClick={ () => handleBreadcrumb('Thể loại tài liệu')}>Thể loại tài liệu</Link>, '4', <ProfileOutlined />),
    ];
    const [titleBreadcrumb, setTitleBreadcrumb] = useState('Tổng quan');

    const handleBreadcrumb = (name) => {
        setTitleBreadcrumb(name)
    }
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const { user, dispatch } = useContext(Context);
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };

    const [fullscreen, setFullscreen] = useState(false);

    const handleToggleFullscreen = () => {
        const elem = document.documentElement; // Lấy thẻ gốc của trang (html)

        if (!fullscreen) {
            // Phóng to toàn bộ trang
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) { // Firefox
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, and Opera
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { // IE/Edge
                elem.msRequestFullscreen();
            }
        } else {
            // Thoát chế độ fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { // Firefox
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { // IE/Edge
                document.msExitFullscreen();
            }
        }

        setFullscreen(!fullscreen);
    };


    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >

            <Sider className={styles.siderWrap} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Image className={styles.logo} src={logo} preview={false} />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} >
                    <div className={styles.headerAdminWrap} >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: '20px' }}>
                            <CompressOutlined className={styles.iconFullScreen} onClick={handleToggleFullscreen} />
                            <Avatar src={user.profilePic ? user.profilePic : <UserOutlined />} size="large" />
                            <div className={styles.nameAdminWrap}>
                                <Popover style={{ width: '50px' }} title={
                                    <div className={styles.popoverMainNavWrap}>
                                        <div> <Link to="/settings" className={styles.textMyInfo}>
                                            <InfoCircleOutlined className={styles.iconInfo} /> Xem hồ sơ
                                        </Link></div>
                                        <span className={styles.line}></span>
                                        <div onClick={handleLogout} className={styles.textLogout}>
                                            <LogoutOutlined className={styles.iconLogout} />
                                            Đăng xuất
                                        </div>
                                    </div>
                                }>
                                    <p style={{ color: "black", marginLeft: "8px" }}>
                                        {user.username}
                                    </p>
                                </Popover>
                            </div>
                        </div>

                    </div>

                </Header>
                <Content
                    style={{
                        margin: '0 16px',

                    }}
                >
                    <Breadcrumb style={{ margin: '16px 0', }}> Trang chủ / {titleBreadcrumb} </Breadcrumb>
                    <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, borderRadius: borderRadiusLG, }} >
                        <Routes>
                            <Route path="*" element={<PageNotFound />} />
                            <Route path="/documents" element={<Home />} />

                            <Route path="/search" element={<Home />} />
                            <Route path="/intro" element={<Intro />} />
                            <Route path="/contacts" element={user ? <Contacts /> : <Login />} />
                            <Route path="/write" element={user ? <Write /> : <Register />} />
                            <Route path="/login" element={user ? <OverView /> : <Login />} />

                            <Route
                                path="/post/edit/:id"
                                element={user ? <EditPost /> : <Register />}
                            />
                            <Route path="/post/:id" element={user ? <Post /> : <Register />} />
                            <Route path="/settings" element={user ? <Settings /> : <Register />} />
                            <Route path="/" element={user ? <OverView /> : <Login />} />
                            <Route
                                path="/articles/category/:slug"
                                element={user ? <Articles /> : <Register />}
                            />
                            <Route
                                path="/pendingPost"
                                element={user ? <PendingPost /> : <Register />}
                            />
                            <Route path="/users" element={user ? <Users /> : <Register />} />
                            <Route
                                path="/createCategory"
                                element={user ? <CreateCategory /> : <Register />}
                            />
                        </Routes>

                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Kho quản lí tài liệu cho sinh viên khoa công nghệ thông tin ©2023 - Sinh viên Nguyễn Văn Phong
                </Footer>
            </Layout>
        </Layout>
    );
};
export default SidebarAdmin;