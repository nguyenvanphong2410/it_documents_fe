import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./singlePost.scss";
// import axios from "axios";
import { Context } from "../../context/Context";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Loading from "../loading/Loading";
import IconNews from "../../assets/icons-base/news.svg";
import { publicRequest } from "../../requestMethods";
import LazyLoad from "react-lazyload";
import Tabs from "../../components/tabs/Tabs";
// dayjs
import dayjs from "dayjs";
import "dayjs/locale/vi";
import PdfComp from "../PdfComp/PdfComp";
import { pdfjs } from "react-pdf";
dayjs.locale("vi");
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState(false);
  const { user } = useContext(Context);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState("");
  const [photos, setPhotos] = useState([]);
  // cats lấy từ mongodb cho select option
  const [loading, setLoading] = useState(true);
  // console.log(objectUrl);

  // comments
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isComment, setIsComment] = useState(false);
  // console.log(comment);
  const newComment = {
    username: user.username,
    documentId: post._id,
    desc: comment,
  };
  // console.log(newComment);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await publicRequest.post("/comments", newComment);
      alert("Đã thêm bình luận thành công!");
      setIsComment(!isComment);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      const res = await publicRequest.get(`/comments/${path}`);
      // console.log(res.data);
      setComments(res.data);
    };
    getComments();
  }, [path, isComment]);

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      const res = await publicRequest.get(`/post/details/${path}`);
      setPost(res.data);
      setName(res.data.name);
      setPhotos(res.data.photos);
      setDesc(res.data.desc);
      setPhotos(res.data.photos);
      setLoading(false);
      setPhoto(null);
      const timer = setTimeout(() => {
        setPhoto(res.data.photo);
      }, 200);
      return () => clearTimeout(timer);
    };
    getPost();
  }, [path]);

  // const handleDelete = async () => {
  //   try {
  //     await userRequest.delete(`/posts/${post._id}`, {
  //       data: { username: user.username },
  //     });
  //     window.location.replace("/");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const shimmer = (w, h) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#ebebeb" offset="20%" />
          <stop stop-color="#f5f5f5" offset="50%" />
          <stop stop-color="#ebebeb" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#ebebeb" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`;
  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="singlePost">
          <div className="singlePost__wrapper">
            <div className="singlePost__heading">
              <div>
                <Link
                  to={`/articles/category/${post.category}`}
                  className="singlePost__tag"
                >
                  <span>Thể loại: {post.category}</span>
                </Link>
              </div>

              <h1 className="singlePost__mainTitle">{name}</h1>
              <ul className="singlePost__info">
                <li className="singlePost__date">
                  {dayjs(post.createdAt).format("LL")}
                </li>
                <li className="singlePost__author">
                  <b>
                    <Link to={`/?user=${post.username}`}>{post.username}</Link>
                  </b>
                </li>
                <li className="singlePost__type">
                  <img src={IconNews} alt="" />
                  <b>Tài liệu IT</b>
                </li>
              </ul>
            </div>
            <div className="singlePost__container">
              <div className="singlePost__leftContent">
                {photos.map((img) => {
                  return (
                    <LazyLoad
                      key={img._id}
                      placeholder={
                        <div
                          className="placeholder"
                          style={{ backgroundImage: `url(${img.base64})` }}
                        ></div>
                      }
                      once={true}
                      height={500}
                      offset={-100}
                      debounce={150}
                    >
                      <figure className="singlePost__image">
                        <LazyLoadImage
                          src={img.src || photo}
                          alt={post.title}
                          effect="blur"
                          placeholderSrc={
                            img.base64 ||
                            post.base64 ||
                            `data:image/svg+xml;base64,${toBase64(
                              shimmer(32, 32)
                            )}`
                          }
                        />
                      </figure>
                    </LazyLoad>
                  );
                })}
                <div className="singlePost__text">
                  <p
                    className="singlePost__description"
                    dangerouslySetInnerHTML={{ __html: desc }}
                  ></p>

                  <canvas
                    style={{ display: "none" }}
                    id="canvas"
                    width="32"
                    height="32"
                  ></canvas>
                </div>
                <div className="singlePost__pdf">
                  <PdfComp
                    pdfFile={`http://localhost:5000/files/${post.pdf}`}
                  />
                </div>
                <div className="singlePost__download">
                  <a
                    href={`http://localhost:5000/files/${post.pdf}`}
                    download
                    rel="noreferrer"
                    target="_blank"
                  >
                    Tải xuống
                  </a>
                </div>

                <div className="comments">
                  <p>Bình Luận:</p>
                  <form onSubmit={handleSubmit}>
                    <div className="comments__input">
                      <textarea
                        cols="30"
                        rows="10"
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Viết bình luận của bạn"
                      ></textarea>
                    </div>
                    <div className="comments__btn">
                      <button type="submit">Bình luận</button>
                    </div>
                  </form>
                  <div className="comments__posts">
                    {comments.map((item) => (
                      <div key={item._id} style={{ marginBottom: "8px" }}>
                        <Link
                          to={`/?user=${item.username}`}
                          className="comments__username"
                        >
                          {item.username}
                        </Link>
                        <p className="comments__desc">{item.desc}</p>
                        <small>{dayjs(item.createdAt).format("LL")}</small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="singlePost__rightContent">
                <Tabs />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
