import { Link, useLocation } from "react-router-dom";
import useSWR from "swr";
import Loading from "../../components/loading/Loading";
import Pagination from "../../components/pagination/Pagination";
import EmptyResults from "../../components/emptyResults/EmptyResults";
import { domainApi } from "../../requestMethods";
import { Context } from "../../context/Context";
import { useContext, useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import ImgPlaceholder from "../../assets/images/placeholder.jpg";
import { Card, Col, Image, Row, Tag, Tooltip } from "antd";
import { ClockCircleOutlined, DeleteOutlined, DownloadOutlined, EditOutlined, ExclamationCircleOutlined, EyeOutlined, FieldTimeOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./style.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { requestGetAllDocument, requestGetAllPendingDocument } from "../../api/documents";
import { setDataFilter, setDataPendingFilter, setOpenModalDelete } from "../../states/modules/document";
import NoImage from "../../components/notImage";
import Meta from "antd/es/card/Meta";
import { dayjsFormatFromNow } from "../../utils/dayjsFormat";
import NoData from "../../components/notData";
import SpinComponent from "../../components/spin";
import PaginationDocument from "../home/components/panigation/paginationDocument";
import ModalDeletePending from "./components/modalDeletePending/ModalDeletePending";
import PaginationPending from "./components/panigation/PaginationPending";
import { Container } from "react-bootstrap";
import InputSearchUser from "../users/components/inputSearch/inputSearchUser";
import InputSearchPendingPost from "./components/inputSearch/inputSearchPendingPost";

const PendingPost = () => {
  const { user } = useContext(Context);
  const [gutter, setGutter] = useState([30, 30]);

  useEffect(() => {
    if (window.innerWidth < 576) {
      setGutter([20, 20])
    }
  }, [])
  const dispatch = useDispatch();
  const filter = useSelector(state => state.document.dataPendingFilter)
  const listDocuments = useSelector(state => state.document.listDocumentsPending);
  console.log('listDocumentsStatus false', listDocuments)
  const isLoading = useSelector(state => state.document.isLoadingGetAll);
  const documents = listDocuments.documents
  const [idDelete, setIdDelete] = useState('');
  const [nameDelete, setNameDelete] = useState('');

  useEffect(() => {
    dispatch(setDataPendingFilter({ status_document: false, name_user: user?.username }))
    dispatch(requestGetAllPendingDocument())
  }, [])

  //onClickDelete
  const onClickDelete = async (id, name) => {
    setIdDelete(id);
    setNameDelete(name)
    dispatch(setOpenModalDelete(true));
  }
  //hanleClickTitleHeading
  const hanleClickTitleHeading = () => {
    dispatch(setDataPendingFilter({ ...filter, search: null }))
    dispatch(requestGetAllPendingDocument())
  }
  return (
    <>

      <Row className={styles.rowContainer} style={{ backgroundColor: '' }}>
        {
          user?.isAdmin ? <></> : <Col span={window.innerWidth <= 1440 ? 1 : 3} ></Col>
        }

        <Col span={user.isAdmin ? 24 : window.innerWidth <= 1440 ? 18 : 19}>
          {!isLoading ?

            <div className={styles.container}>
              <div className={styles.headingUserWrapper}>
                <div className={styles.headingTitle}>
                  <div className={styles.newDocumentWrap}>
                    <span className={styles.titleNewDocument} onClick={hanleClickTitleHeading}><FieldTimeOutlined />
                      Tài liệu đang chờ phê duyệt
                    </span>
                  </div>
                </div>

                <div className={styles.headingOpption}>
                  <InputSearchPendingPost />
                </div>
              </div>
              <Row gutter={gutter}>
                {
                  documents?.length ?
                    documents?.filter((post) => post.status === false && post.username === user?.username)
                      .map((item, index) => {
                        return (

                          <Col key={index} xs={24} sm={12} md={8} lg={6}>

                            <Card
                              className={item?.status === false ? styles.cardItem : styles.cardItemPending} style={{ width: window.innerWidth < 576 ? 300 : 250 }}
                              cover={
                                item?.photos[0]?.src ?
                                  <Link to={item?.status === false ? `/post/${item._id}` : ''}>
                                    <Image
                                      className={item?.status === false ? '' : styles.itemCardPending}
                                      height={170} width={window.innerWidth < 576 ? 300 : 250} src={item?.photos[0]?.src} preview={false} />
                                  </Link>
                                  : <NoImage />
                              }
                              actions={[
                                <Tooltip title={`Tài liệu này có ${item.view} lượt xem`} color="purple">
                                  <Link to={`/post/${item._id}`} >

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
                                    // onClick={() => handleShowModalDelete(item)} 
                                    onClick={() => onClickDelete(item._id, item.name)}
                                  /></Tooltip>
                                ,
                                <Tooltip title="Tải xuống tài liệu" color="green">
                                  <a
                                    href={`http://localhost:5000/files/${item.pdf}`}
                                    download
                                    target="_blank"
                                  // onClick={(e) => e.stopPropagation()}
                                  >
                                    {/* Sử dụng thuộc tính download của thẻ <a> */}
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
                                      <FieldTimeOutlined className={styles.iconOriginCard} />
                                      <span className={styles.textOriginCard}> Trạng thái: </span>
                                      {/* <span className={styles.infoOriginCard}> {item?.username}</span> */}
                                      <Tag color="warning">Chờ duyệt</Tag>
                                    </div>

                                  </div>
                                }
                              />
                            </Card>
                          </Col>
                        )
                      }) : <NoData />
                }
              </Row>
            </div>
            : <SpinComponent />
          }

          {
            user.isAdmin ? <></> :
              <PaginationPending listDocuments={listDocuments} />
          }
          <ModalDeletePending
            idDelete={idDelete}
            nameDelete={nameDelete}
          />
        </Col>
        {
          user?.isAdmin ? <></> : <Col span={window.innerWidth <= 1440 ? 3 : 3}></Col>
        }
      </Row>

    </>
  );
};

export default PendingPost;
