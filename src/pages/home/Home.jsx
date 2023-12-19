import { Link, useLocation } from "react-router-dom";
import useSWR from "swr";
import Loading from "../../components/loading/Loading";
import Pagination from "../../components/pagination/Pagination";
import EmptyResults from "../../components/emptyResults/EmptyResults";
import { domainApi } from "../../requestMethods";
import { Context } from "../../context/Context";
import { useContext, useEffect, useState } from "react";
import { userRequest, publicRequest } from "../../requestMethods";
import ImgPlaceholder from "../../assets/images/placeholder.jpg";
import MainHeading from "../../components/MainHeading/MainHeading";
import { dayjsFormatFromNow } from "../../utils/dayjsFormat";
import styles from './style.module.scss';
import { requestGetAllDocument } from "../../api/documents";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
import { setOpenModalDelete } from "../../states/modules/document";
import ModalDelete from "./components/modalDelete/ModalDelete";
// import InputSearchCategory from "../createCategory/components/inputSearch/inputSearchCategory";
// import SortIcon from "../createCategory/components/sortIcon/sortIcon";
import { Tag } from "antd";
import { CheckCircleOutlined, DeleteOutlined, EditOutlined, SyncOutlined } from "@ant-design/icons";

//Phong ưi
const Home = () => {
  const dispatch = useDispatch();
  const [idDelete, setIdDelete] = useState('');
  const [nameDelete, setNameDelete] = useState('');
  // const listDocuments = useSelector(state => state.document.listDocuments);
  // console.log('listDocuments', listDocuments)
  const { user } = useContext(Context);
  const { search, pathname } = useLocation();
  const cat = pathname.split("/")[3];
  const subCat = pathname.split("/")[4];
  const pagePath = search.split("=")[1] || 1;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(requestGetAllDocument())
  }, [])


  useEffect(() => {
    const getCats = async () => {
      const res = await publicRequest.get("/category/all");
      // console.log(res.data);
      setCategories(res.data.data.categories);
    };
    getCats();
  }, []);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    subCat
      ? `${domainApi}/post/all?cat=${subCat}&page=${pagePath}&num_results_on_page=8`
      : cat
        ? `${domainApi}/post/all?cat=${cat}&page=${pagePath}&num_results_on_page=8`
        : search
          ? `${domainApi}/post/all${search}&num_results_on_page=8`
          : `${domainApi}/post/all?num_results_on_page=8`,
    fetcher
  );
  if (error) return <div className="error">Có lỗi xảy ra !</div>;
  // console.log('dtaa nha ', data)
  const posts = data?.posts;
  const page = data?.page;
  const totalPages = data?.total_pages;
  // const handleDelete = async (id) => {
  //   try {
  //     userRequest.delete(`/post/${id}`, {
  //       data: { username: user.username },
  //     });
  //     window.location.replace("/");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const onClickDelete = async (id, name) => {
    setIdDelete(id);
    setNameDelete(name)
    dispatch(setOpenModalDelete(true));
  }

  const handleUpdate = async (id) => {
    try {
      await userRequest.put(`/post/updatedStatus/${id}`, {
        status: true,
      });
      alert("Đã xác nhận");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <MainHeading />
      {data ? (
        posts?.length > 0 ? (
          <>
            <div className="content read">
              {
                user?.isAdmin ? <></> : <h2 className={styles.titleHome}>Tài liệu luôn luôn cập nhật</h2>
              }
              {
                user?.isAdmin ?
                  <div className={styles.headingWrapper}>
                    <div className={styles.headingTitle}>
                      <span >
                        <span >
                          <svg className={styles.headingIcon} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 400 512">
                            <g fill="currentColor">
                              <path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />                            </g>
                          </svg>
                        </span>
                      </span>
                      <span className={styles.title}>Thông tin tài liệu</span>
                    </div>

                    <div className={styles.headingOpption}>
                      <span variant="success"
                      // onClick={() => dispatch(setOpenModalAddCategory(true))}
                      >
                        <Link to="/write" className={styles.addText}>+ Thêm mới</Link>
                      </span>
                      {/* <Select
                        className={styles.headingSelectSort}
                        defaultValue="Sắp xếp ..."
                        options={[{ label: <SortIcon type="fullName" /> }]}
                      />
                      <InputSearchCategory 
                      // listCategory={listCategory} 
                      /> */}
                    </div>
                  </div>
                  :
                  <Link to="/write" className="create-contact">
                    Tạo Tài Liệu
                  </Link>
              }

              <div className="categories">

                {categories?.map((cat) => (
                  <span key={cat._id}>
                    <Link className="categories__link" to={`/articles/category/${cat.slug}`}>
                      {cat.name}
                    </Link>
                  </span>
                ))}
              </div>

              <section className="contentProducts">
                <div className="contentProducts__wrapper">
                  {
                    user?.isAdmin ?
                      <table className={styles.tableDocumentWrap}>
                        <thead>
                          <tr>
                            <td>STT</td>
                            <td>Hình ảnh</td>
                            <td>Tên tài liệu</td>
                            <td>Đăng bởi</td>
                            <td>Thể loại</td>
                            <td>Năm sáng tác</td>
                            <td>Mô tả</td>
                            <td></td>
                            {user?.isAdmin && <td></td>}
                            <td></td>
                          </tr>
                        </thead>
                        <tbody>
                          {posts.map((post, index) => (
                            <tr key={post._id}>
                              <td data-label="STT">
                                <span>{index + 1}</span>
                              </td>
                              <td data-label="Hình ảnh">
                                <span>
                                  <img
                                    style={{
                                      width: "100px",
                                      height: "50px",
                                      objectFit: "cover",
                                    }}
                                    src={post.photos[0]?.src || ImgPlaceholder}
                                    alt="alt"
                                  />
                                </span>
                              </td>
                              <td data-label="Tên tài liệu">
                                <span>
                                  <Link className="linkTable" to={`/post/${post._id}`}>
                                    {post.name}
                                  </Link>
                                </span>
                              </td>
                              <td data-label="Đăng bởi">
                                <span>
                                  <Link className="linkTable" to={`/?user=${post.username}`}>
                                    {post.username}
                                  </Link>
                                </span>
                              </td>
                              <td data-label="Thể loại">
                                <span>
                                  <Link className="linkTable" to={`/articles/category/${post.category}`} >
                                    {post.category}
                                  </Link>
                                </span>
                              </td>
                              <td data-label="Năm sáng tác">
                                <span>{post.year}</span>
                              </td>
                              <td data-label="Mô tả">
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: post.desc.replace(/<[^>]+>/g, ""),
                                  }}
                                ></span>
                              </td>
                              {/* <td >
                                <span>
                                  {post.status === false && user.isAdmin === true ? (
                                    <Link to={`/post/${post._id}`}>
                                      <button
                                        className="create-contact"
                                        style={{
                                          backgroundColor: "#868686",
                                        }}
                                      >
                                        Chờ phê duyệt
                                      </button>
                                    </Link>
                                  ) : post.status === false ? (
                                    <Tag color="gold">gold</Tag>
                                  ) : (
                                    <Link to={`/post/${post._id}`}>
                                      <button className="create-contact">
                                        Xem bài viết
                                      </button>
                                    </Link>
                                  )}
                                </span>
                              </td> */}
                              {user.isAdmin && post.status === false && (
                                <td>
                                  <Tag onClick={() => handleUpdate(post._id)} icon={<SyncOutlined spin />} color="warning">
                                    Chờ duyệt
                                  </Tag>
                                </td>
                              )}

                              {user.isAdmin && post.status === true && (
                                <td >
                                  <Tag icon={<CheckCircleOutlined />} color="success">
                                    Đã duyệt
                                  </Tag>
                                </td>
                              )}
                              {(user?.isAdmin || post.username === user?.username) && (
                                <td className={styles.actionWrap}>
                                  <Link to={`/post/edit/${post._id}`} >
                                    <EditOutlined className={styles.actionIconEdit} />
                                  </Link>
                                  <DeleteOutlined className={styles.actionIconDelete}
                                  // onClick={() => handleDelete(post._id)}
                                  />

                                </td>
                              )}
                              {!(user?.isAdmin || post.username === user?.username) && (
                                <td></td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      :
                      <div className="contentProducts__cards" >

                        {posts?.map((post, index) => (
                          // <div key={index} className="contentProducts__card">
                          <div key={index} className={post.status === true ? 'contentProducts__card' : styles.cardWrapWait}>
                            {post.status === true ? (
                              <Link to={`/post/${post._id}`}>
                                <figure className="contentProducts__image">
                                  <img src={post.photos[0]?.src || ImgPlaceholder} alt="" />
                                </figure>
                              </Link>
                            ) : (
                              <div >
                                <figure className="contentProducts__image">
                                  <img className={styles.imgCardWait} src={post.photos[0]?.src || ImgPlaceholder} alt="" />
                                </figure>
                              </div>
                            )}

                            {(user?.isAdmin || post.username === user?.username) && (
                              <div className="contentProducts__seen">
                                <Link to={`/post/edit/${post._id}`} className="edit" style={{ marginRight: "16px", padding: "2px" }}>
                                  <i className="fas fa-pen fa-xs"></i>
                                </Link>
                                <div className="trash"
                                  style={{ zIndex: "9999", color: "red", padding: "2px", cursor: "pointer" }}
                                  // onClick={() => handleDelete(post._id)}
                                  onClick={() => onClickDelete(post._id, post.name)}
                                >
                                  <i className="fas fa-trash fa-xs"></i>
                                </div>
                              </div>
                            )}
                            <div className="contentProducts__text">
                              <div className="contentProducts__title">
                                {post.name}
                              </div>
                              <p className="contentProducts__desc"
                                dangerouslySetInnerHTML={{ __html: post.desc.replace(/<[^>]+>/g, ""), }}
                              ></p>
                              <div className="contentProducts__info">
                                <span>
                                  <svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" enableBackground="new 0 0 512 512" version="1.1" viewBox="0 0 512 512" xmlSpace="preserve">
                                    <path d="M437.02 330.98c-27.883-27.882-61.071-48.523-97.281-61.018C378.521 243.251 404 198.548 404 148 404 66.393 337.607 0 256 0S108 66.393 108 148c0 50.548 25.479 95.251 64.262 121.962-36.21 12.495-69.398 33.136-97.281 61.018C26.629 379.333 0 443.62 0 512h40c0-119.103 96.897-216 216-216s216 96.897 216 216h40c0-68.38-26.629-132.667-74.98-181.02zM256 256c-59.551 0-108-48.448-108-108S196.449 40 256 40s108 48.448 108 108-48.449 108-108 108z"></path>
                                  </svg>
                                  <Link style={{ marginLeft: "4px", color: "green" }} to={`/?user=${post.username}`} >
                                    {post.username}
                                  </Link>
                                </span>
                                <small>{dayjsFormatFromNow(post.createdAt)}</small>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                  }

                </div>
                <Pagination page={page} total_pages={totalPages} />
              </section>
            </div >

          </>
        ) : (
          <EmptyResults />
        )
      ) : (
        <Loading />
      )}
      <ModalDelete
        idDelete={idDelete}
        name={nameDelete}
      />
    </>
  );
};

export default Home;
