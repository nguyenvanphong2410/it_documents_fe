import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { Avatar, Card, Col, Image, Row, Select, Tag, Tooltip } from "antd";
import { CheckCircleOutlined, CheckOutlined, ClockCircleOutlined, DeleteOutlined, EditOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import SpinComponent from "../../components/spin";
import NoImage from "../../components/notImage";

//Phong ưi
const Home = () => {
  const { user } = useContext(Context);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [idDelete, setIdDelete] = useState('');
  const [nameDelete, setNameDelete] = useState('');
  const [keyword, setKeyword] = useState();
  const { search, pathname } = useLocation();
  const cat = pathname.split("/")[3];
  const subCat = pathname.split("/")[4];
  const pagePath = search.split("=")[1] || 1;
  const [categories, setCategories] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [gutter, setGutter] = useState([30, 30]);
  const { Meta } = Card;
  const SpinComponentDelayed = () => (
    <div className="spin-container">
      <SpinComponent />
    </div>
  );
  // const listDocuments = useSelector(state => state.document.listDocuments);
  // console.log('listDocuments', listDocuments)
  useEffect(() => {
    if (window.innerWidth < 576) {
      setGutter([20, 20])
    }
  }, [])
  useEffect(() => {
    document.title = user?.isAdmin ? "Tài liệu" : "IT Documents";
  }, []);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowTable(true);
    }, 1300);

    return () => clearTimeout(timeoutId);
  }, []);

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


  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${keyword.trim().toLowerCase().replace(/\s/g, "+")}`);
  };
  console.log('posts', posts);


  //const handleDetails
  const handleDetails = (id) => {
    navigate(`/post/${id}`)
  }



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
                      <span className={styles.title}>
                        <Link className={styles.titleLink} to="/documents">Thông tin tài liệu</Link>
                      </span>
                    </div>

                    <div className={styles.headingOpption}>
                      <span variant="success"
                      // onClick={() => dispatch(setOpenModalAddCategory(true))}
                      >
                        <Link to="/write" className={styles.addText}>+ Tạo mới tài liệu</Link>
                      </span>
                      <Select
                        defaultValue="Chọn thể loại tài liệu"
                        style={{ width: 180 }}
                        className={styles.selectCategory}
                        options={categories?.map((cat) => ({
                          value: cat.name,
                          label:
                            <Link to={`/articles/category/${cat.slug}`}>
                              {cat.name}
                            </Link>

                        }))}
                      />
                      <form onSubmit={handleSubmit} className={styles.formInput}>
                        <Search placeholder="Tìm kiếm tài liệu" allowClear size="large" onChange={(e) => setKeyword(e.target.value)} />
                      </form>
                    </div>
                  </div>
                  :
                  <Link to="/write" className="create-contact">
                    Tạo Tài Liệu
                  </Link>
              }

              {
                user?.isAdmin ? <></> :
                  <div className="categories">
                    {categories?.map((cat) => (
                      <span key={cat._id}>
                        <Link className="categories__link" to={`/articles/category/${cat.slug}`}>
                          {cat.name}
                        </Link>
                      </span>
                    ))}
                  </div>
              }
              <section className="contentProducts">
                <div className="contentProducts__wrapper">
                  {!showTable && <SpinComponentDelayed />}
                  {
                    user?.isAdmin ? (

                      showTable && (
                        <table className={styles.tableDocumentWrap}>
                          <thead>
                            <tr>
                              <td>STT</td>
                              <td>Hình ảnh</td>
                              <td>Tên tài liệu</td>
                              <td>Đăng bởi</td>
                              <td>Thể loại</td>
                              <td>Năm sáng tác</td>
                              <td>Trạng thái</td>
                              <td></td>
                              {user?.isAdmin && <td></td>}
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
                                      {post.category.replace(/-/g, ' ')}
                                    </Link>
                                  </span>
                                </td>
                                <td data-label="Năm sáng tác">
                                  <span>{post.year}</span>
                                </td >

                                {user.isAdmin && post.status === false && (
                                  <td>
                                    <Tag className={styles.tagStatusPending} icon={<ClockCircleOutlined />} color="warning">
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
                                <td>
                                  <span>
                                    {post.status === false && user.isAdmin === true ? (
                                      <Link to={`/post/${post._id}`}>
                                        <Tag color="#8904B1" icon={<CheckOutlined />} onClick={() => handleUpdate(post._id)}>Duyệt</Tag>
                                      </Link>
                                    ) : post.status === false ? (<Tag color="gold">gold</Tag>) :
                                      (<Link to={`/post/${post._id}`}>
                                        <Tag color="#2db7f5" icon={<EyeOutlined />}>Xem</Tag>
                                      </Link>)}
                                  </span>
                                </td>
                                {(user?.isAdmin || post.username === user?.username) && (
                                  <td className={styles.actionWrap}>
                                    <Link to={`/post/edit/${post._id}`} >
                                      <EditOutlined className={styles.actionIconEdit} />
                                    </Link>
                                    <DeleteOutlined className={styles.actionIconDelete}
                                      onClick={() => onClickDelete(post._id, post.name)}
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
                      )
                    )
                      :
                      <div className="contentProducts__cards" >
                        <div className={styles.container}>

                          <Row gutter={gutter}>
                            {
                              posts?.map((item, index) => {
                                return (

                                  <Col key={index} xs={24} sm={12} md={8} lg={6}>

                                    <Card
                                      className={item?.status === true ? styles.cardItem : styles.cardItemPending} style={{ width: window.innerWidth < 576 ? 300 : 250 }}
                                      cover={
                                        item?.photos[0]?.src ?
                                          <Link to={item?.status === true ? `/post/${item._id}` : ''}>
                                            <Image
                                              className={item?.status === true ? '' : styles.itemCardPending}
                                              height={170} width={window.innerWidth < 576 ? 300 : 250} src={item?.photos[0]?.src} preview={false} />
                                          </Link>
                                          : <NoImage />
                                      }
                                      actions={[
                                        user?.isAdmin || item.username === user?.username &&
                                        <Tooltip title="Chỉnh sửa thông tin tài liệu">

                                          <EditOutlined style={{ color: 'blue', fontSize: '20px' }} key="edit"
                                          // onClick={() => handleShowModalUpdate(item)} 
                                          /> </Tooltip>,
                                        user?.isAdmin || item.username === user?.username &&
                                        <Tooltip title="Xóa tài liệu">
                                          <DeleteOutlined theme="outlined" style={{ color: 'red', fontSize: '20px' }} key="delete"
                                          // onClick={() => handleShowModalDelete(item)} 
                                          /></Tooltip>
                                        , <>Down</>

                                      ]}
                                    >
                                      <Meta
                                        title={
                                          <div>
                                            <Link to={item?.status === true ? `/post/${item._id}` : ''}
                                              className={item?.status === true ? '' : styles.itemCardPending}
                                              style={{ textDecoration: 'none', color: '#333', fontSize: '22px' }}>{item?.name}
                                            </Link>
                                            <div style={{ fontSize: '14px', color: '#898989' }}>
                                              <span
                                                className={item?.status === true ? '' : styles.itemCardPending}
                                                style={{ fontSize: '14px', color: '#aaa' }}>
                                                Thời gian: {dayjsFormatFromNow(item?.createdAt)}
                                              </span>
                                            </div>

                                            <div
                                              className={item?.status === true ? '' : styles.itemCardPending}
                                              style={{ fontSize: '14px', color: '#898989' }}>
                                              Người đăng: {item?.username}
                                            </div>
                                            <Tooltip title={<p dangerouslySetInnerHTML={{ __html: item?.desc.replace(/<[^>]+>/g, ""), }}></p>}>
                                              <div
                                                className={item?.status === true ? '' : styles.itemCardPending}
                                                style={{ fontSize: '14px' }}>
                                                <p dangerouslySetInnerHTML={{ __html: item?.desc.replace(/<[^>]+>/g, ""), }} ></p>
                                              </div>
                                            </Tooltip>
                                          </div>
                                        }
                                      />
                                    </Card>
                                  </Col>
                                )
                              })

                            }
                          </Row>
                        </div>
                 
                      </div>
                  }

                </div>
                {showTable && (
                  <Pagination page={page} total_pages={totalPages} />)
                }
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
