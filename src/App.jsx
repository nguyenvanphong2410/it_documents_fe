// import "./styles/globals.scss";
import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import MainNav from "./components/mainNav/MainNav";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import Footer from "./components/footer/Footer";
import Intro from "./pages/intro/Intro";

// pages
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Write from "./pages/write/Write";
import EditPost from "./pages/editPost/EditPost";
import Contacts from "./pages/contacts/Contacts";
import Articles from "./pages/articles/Articles";
import CreateCategory from "./pages/createCategory/CreateCategory";

import { Context } from "./context/Context";
import Post from "./pages/post/Post";
import PendingPost from "./pages/pendingPost/PendingPost";
import Users from "./pages/users/Users";
import OverView from "./pages/overview/OverView";
import SidebarAdmin from "./components/sidebarAdmin/SidebarAdmin";
import { Col, Row } from "antd";

function App() {
  const { user } = useContext(Context);
  return (
    <BrowserRouter>
      {
        user?.isAdmin ?
          <SidebarAdmin />
          :
          <>
            <ScrollToTop />

            <MainNav />
            <Row>
              <Col span={3}></Col>
              <Col span={18}>
              <Routes>
                <Route path="*" element={<PageNotFound />} />
                <Route path="/" element={user ? <Home /> : <Login />} />
                <Route path="/search" element={<Home />} />
                <Route path="/intro" element={<Intro />} />
                <Route path="/contacts" element={user ? <Contacts /> : <Login />} />
                <Route path="/register" element={user ? <Home /> : <Register />} />
                <Route path="/login" element={user ? <Home /> : <Login />} />
                <Route path="/write" element={user ? <Write /> : <Register />} />
                <Route
                  path="/post/edit/:id"
                  element={user ? <EditPost /> : <Register />}
                />
                <Route path="/post/:id" element={user ? <Post /> : <Register />} />
                <Route path="/settings" element={user ? <Settings /> : <Register />} />
                <Route path="/overview" element={user ? <OverView /> : <Login />} />
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
              </Col>
              <Col span={3}></Col>
            </Row>
          </>
      }

      {
        user?.isAdmin ?
          <></>
          :
          <Footer />

      }
    </BrowserRouter>
  );
}

export default App;
