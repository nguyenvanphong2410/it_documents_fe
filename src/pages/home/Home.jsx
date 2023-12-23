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
import { requestGetAllDocument, requestUpdateViewPost } from "../../api/documents";
import { useDispatch, useSelector } from "react-redux";
// import { useSelector } from "react-redux";
import { setDataFilter, setOpenModalDelete } from "../../states/modules/document";
import ModalDelete from "./components/modalDelete/ModalDelete";
// import InputSearchCategory from "../createCategory/components/inputSearch/inputSearchCategory";
// import SortIcon from "../createCategory/components/sortIcon/sortIcon";
import { Avatar, Card, Col, FloatButton, Image, Row, Select, Tag, Tooltip } from "antd";
import { CheckCircleOutlined, CheckOutlined, ClockCircleOutlined, DeleteOutlined, DownloadOutlined, EditOutlined, EyeOutlined, FieldTimeOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import SpinComponent from "../../components/spin";
import NoImage from "../../components/notImage";
import PaginationDocument from "./components/panigation/paginationDocument";
import InputSearch from "./components/inputSearch/inputSearch";
import NoData from "../../components/notData";

//Phong ưi
const Home = () => {
  const { user } = useContext(Context);

  const dispatch = useDispatch();
  const filter = useSelector(state => state.document.dataFilter)
  const listDocuments = useSelector(state => state.document.listDocuments);
  // console.log('listDocuments', listDocuments)
  const isLoading = useSelector(state => state.document.isLoadingGetAll);
  const documents = listDocuments.documents

  useEffect(() => {
    dispatch(setDataFilter({ status_document: false }))
    dispatch(requestGetAllDocument())
  }, [])

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
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);



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

  //const handleDetails
  const handleDetails = (id) => {
    navigate(`/post/${id}`)
  }

  //handleUpdateView
  const handleUpdateView = (id) => {
    dispatch(requestUpdateViewPost(id))
    return 0
  }


  return (
    <>
      <MainHeading />
      
      <Row className={styles.rowContainer} style={{ backgroundColor: '' }}>
      {
        user?.isAdmin ? <></> : <Col span={window.innerWidth <= 1440 ? 1 : 3} ></Col>
      }
        
        <Col span={user.isAdmin? 24 : window.innerWidth <= 1440 ? 18 : 20 }>
          {data ? (

            <>
              {window.innerWidth <= 1440 &&
                <Link to="/write"> <FloatButton icon={<PlusOutlined />} /> </Link>

              }

              <div className="content read">
                {
                  user?.isAdmin ? <></> : <h2 className={styles.titleHome}>Tài liệu luôn cập nhật</h2>
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
                    {!showTable && user?.isAdmin && <SpinComponent />}
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
                        <div>


                          <div className="contentProducts__cards" >
                            {!isLoading ?
                              <div className={styles.container}>
                                <div className={styles.newDocumentWrap}>
                                  <span className={styles.titleNewDocument}>Tài liệu mới </span>
                                </div>
                                <Row gutter={gutter}>
                                  {
                                    documents?.length > 0 ?
                                      documents?.map((item, index) => {
                                        return (

                                          <Col key={index} xs={24} sm={24} md={12} lg={6}>

                                            <Card
                                              className={item?.status === true ? styles.cardItem : styles.cardItemPending} style={{ width: window.innerWidth < 576 ? 300 : 250 }}
                                              cover={
                                                item?.photos[0]?.src ?
                                                  <Link to={item?.status === true ? `/post/${item._id}` : ''}>
                                                    <Image
                                                      onClick={() => handleUpdateView(item._id)}
                                                      className={item?.status === true ? '' : styles.itemCardPending}
                                                      height={170} width={window.innerWidth < 576 ? 300 : 250} src={item?.photos[0]?.src} preview={false} />
                                                  </Link>
                                                  : <NoImage />
                                              }
                                              actions={[
                                                <Tooltip title={`Tài liệu này có ${item.view} lượt xem`} color="purple">
                                                  <Link to={`/post/${item._id}`} onClick={() => handleUpdateView(item._id)}>

                                                    <EyeOutlined style={{ color: 'purple', fontSize: '18px' }} key="view" />
                                                    <span style={{ color: 'purple', fontSize: '18px', marginLeft: '2px' }}>
                                                      {item.view}

                                                    </span>
                                                  </Link>
                                                </Tooltip>,
                                                user?.isAdmin || item.username === user?.username &&
                                                <Tooltip title="Chỉnh sửa thông tin tài liệu" color="#2646ba">
                                                  <Link to={`/post/edit/${item._id}`} >
                                                    <EditOutlined style={{ color: 'blue', fontSize: '20px' }} key="edit" />
                                                  </Link>
                                                </Tooltip>,

                                                user?.isAdmin || item.username === user?.username &&
                                                <Tooltip title="Xóa tài liệu" color="red">
                                                  <DeleteOutlined theme="outlined" style={{ color: 'red', fontSize: '20px' }} key="delete"
                                                    onClick={() => onClickDelete(item._id, item.name)}
                                                  /></Tooltip>
                                                ,
                                                <Tooltip title="Tải xuống tài liệu" color="green">
                                                  <a
                                                    href={`http://localhost:5000/files/${item.pdf}`}
                                                    download
                                                    target="_blank"
                                                  >
                                                    <DownloadOutlined style={{ color: 'green', fontSize: '20px' }} />
                                                  </a>
                                                </Tooltip>,


                                              ]}
                                            >
                                              <Meta
                                                title={
                                                  <div>
                                                    <Tooltip title={item?.name} color="#2646ba" >
                                                      <Link to={item?.status === true ? `/post/${item._id}` : ''}
                                                        onClick={() => handleUpdateView(item._id)}
                                                        className={styles.nameDocumentCard}
                                                      >{item?.name}
                                                      </Link>
                                                    </Tooltip>
                                                    <div className={styles.itemCard}>
                                                      <span >
                                                        <FieldTimeOutlined className={styles.iconOriginCard} />
                                                        <span className={styles.textOriginCard}> Thời gian: </span>
                                                        <span className={styles.infoOriginCard}> {dayjsFormatFromNow(item?.createdAt)}</span>
                                                      </span>
                                                    </div>

                                                    <div className={styles.itemCard} >
                                                      <UserOutlined className={styles.iconOriginCard} />
                                                      <span className={styles.textOriginCard}> Người đăng: </span>
                                                      <span className={styles.infoOriginCard}> {item?.username}</span>

                                                    </div>
                                                    <div className={styles.itemCard} >
                                                      {/* <FieldTimeOutlined className={styles.iconOriginCard} /> */}
                                                      {/* <span className={styles.textOriginCard}> Trạng thái: </span> */}
                                                      {/* <span className={styles.infoOriginCard}> {item?.username}</span> */}
                                                      <Tag icon={<CheckCircleOutlined />} style={{ marginLeft: '30px', marginTop: '16px' }} color="success">Đã được kiểm duyệt</Tag>
                                                    </div>
                                                    {/* <Tooltip title={<>Mô tả tài liệu: <p dangerouslySetInnerHTML={{ __html: item?.desc.replace(/<[^>]+>/g, ""), }}></p> </>} color="#2646ba">
                                                  <div className={styles.itemCard}>
                                                    <p dangerouslySetInnerHTML={{ __html: item?.desc.replace(/<[^>]+>/g, ""), }} ></p>
                                                  </div>
                                                </Tooltip> */}
                                                  </div>
                                                }
                                              />
                                            </Card>
                                          </Col>
                                        )
                                      }) : <NoData />

                                  }
                                </Row>
                              </div> :
                              <SpinComponent />

                            }

                            {
                              user.isAdmin ? <></> :
                                <PaginationDocument listDocuments={listDocuments} />
                            }
                          </div>

                          <div className="contentProducts__cards" >
                            {!isLoading ?
                              <div className={styles.container}>
                                <div className={styles.newDocumentWrap}>
                                  <span className={styles.titleNewDocument}>Tài liệu nổi bật </span>
                                </div>
                                <Row gutter={gutter}>
                                  {
                                    documents?.length > 0 ?
                                      documents?.map((item, index) => {
                                        return (

                                          <Col key={index} xs={24} sm={24} md={12} lg={6}>

                                            <Card
                                              className={item?.status === true ? styles.cardItem : styles.cardItemPending} style={{ width: window.innerWidth < 576 ? 300 : 250 }}
                                              cover={
                                                item?.photos[0]?.src ?
                                                  <Link to={item?.status === true ? `/post/${item._id}` : ''}>
                                                    <Image
                                                      onClick={() => handleUpdateView(item._id)}
                                                      className={item?.status === true ? '' : styles.itemCardPending}
                                                      height={170} width={window.innerWidth < 576 ? 300 : 250} src={item?.photos[0]?.src} preview={false} />
                                                  </Link>
                                                  : <NoImage />
                                              }
                                              actions={[
                                                <Tooltip title={`Tài liệu này có ${item.view} lượt xem`} color="purple">
                                                  <Link to={`/post/${item._id}`} onClick={() => handleUpdateView(item._id)}>

                                                    <EyeOutlined style={{ color: 'purple', fontSize: '18px' }} key="view" />
                                                    <span style={{ color: 'purple', fontSize: '18px', marginLeft: '2px' }}>
                                                      {item.view}

                                                    </span>
                                                  </Link>
                                                </Tooltip>,
                                                user?.isAdmin || item.username === user?.username &&
                                                <Tooltip title="Chỉnh sửa thông tin tài liệu" color="#2646ba">
                                                  <Link to={`/post/edit/${item._id}`} >
                                                    <EditOutlined style={{ color: 'blue', fontSize: '20px' }} key="edit" />
                                                  </Link>
                                                </Tooltip>,

                                                user?.isAdmin || item.username === user?.username &&
                                                <Tooltip title="Xóa tài liệu" color="red">
                                                  <DeleteOutlined theme="outlined" style={{ color: 'red', fontSize: '20px' }} key="delete"
                                                    onClick={() => onClickDelete(item._id, item.name)}
                                                  /></Tooltip>
                                                ,
                                                <Tooltip title="Tải xuống tài liệu" color="green">
                                                  <a
                                                    href={`http://localhost:5000/files/${item.pdf}`}
                                                    download
                                                    target="_blank"
                                                  >
                                                    <DownloadOutlined style={{ color: 'green', fontSize: '20px' }} />
                                                  </a>
                                                </Tooltip>,


                                              ]}
                                            >
                                              <Meta
                                                title={
                                                  <div>
                                                    <Tooltip title={item?.name} color="#2646ba" >
                                                      <Link to={item?.status === true ? `/post/${item._id}` : ''}
                                                        onClick={() => handleUpdateView(item._id)}
                                                        className={styles.nameDocumentCard}
                                                      >{item?.name}
                                                      </Link>
                                                    </Tooltip>
                                                    <div className={styles.itemCard}>
                                                      <span >
                                                        <FieldTimeOutlined className={styles.iconOriginCard} />
                                                        <span className={styles.textOriginCard}> Thời gian: </span>
                                                        <span className={styles.infoOriginCard}> {dayjsFormatFromNow(item?.createdAt)}</span>
                                                      </span>
                                                    </div>

                                                    <div className={styles.itemCard} >
                                                      <UserOutlined className={styles.iconOriginCard} />
                                                      <span className={styles.textOriginCard}> Người đăng: </span>
                                                      <span className={styles.infoOriginCard}> {item?.username}</span>

                                                    </div>
                                                    <div className={styles.itemCard} >
                                                      {/* <FieldTimeOutlined className={styles.iconOriginCard} /> */}
                                                      {/* <span className={styles.textOriginCard}> Trạng thái: </span> */}
                                                      {/* <span className={styles.infoOriginCard}> {item?.username}</span> */}
                                                      <Tag icon={<CheckCircleOutlined />} style={{ marginLeft: '30px', marginTop: '16px' }} color="success">Đã được kiểm duyệt</Tag>
                                                    </div>
                                                    {/* <Tooltip title={<>Mô tả tài liệu: <p dangerouslySetInnerHTML={{ __html: item?.desc.replace(/<[^>]+>/g, ""), }}></p> </>} color="#2646ba">
                                                  <div className={styles.itemCard}>
                                                    <p dangerouslySetInnerHTML={{ __html: item?.desc.replace(/<[^>]+>/g, ""), }} ></p>
                                                  </div>
                                                </Tooltip> */}
                                                  </div>
                                                }
                                              />
                                            </Card>
                                          </Col>
                                        )
                                      }) : <NoData />

                                  }
                                </Row>
                              </div> :
                              <SpinComponent />

                            }

                            
                          </div>
                        </div>

                    }

                  </div>
                  {showTable && user.isAdmin && (
                    <Pagination page={page} total_pages={totalPages} />)
                  }
                </section>
              </div >

            </>
          ) : (
            <SpinComponent />
          )}
          <ModalDelete
            idDelete={idDelete}
            name={nameDelete}
          />
        </Col>
        {
        user?.isAdmin ? <></> : <Col span={window.innerWidth <= 1440 ? 3 : 3}></Col>
      }
        
      </Row>
    </>
  );
};

export default Home;
