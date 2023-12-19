import { Link } from "react-router-dom";
import useSWR from "swr";
import Loading from "../../components/loading/Loading";
import EmptyResults from "../../components/emptyResults/EmptyResults";
import { domainApi } from "../../requestMethods";
import ImgDefault from "../../assets/images/img_default.jpg";
import { userRequest } from "../../requestMethods";
import { Context } from "../../context/Context";
import { useContext, useEffect, useState } from "react";
import styles from './style.module.scss'
import { Avatar, Card, Col, Modal, Row, Tag } from "antd";
import { DeleteOutlined, EditOutlined, EllipsisOutlined, EyeOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
const { Meta } = Card;
const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState(null);

  useEffect(() => {
    document.title = "Người dùng";
  }, []);
  const { user } = useContext(Context);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(`${domainApi}/user/all`, fetcher);
  if (error) return <div className="error">Failed to load</div>;

  const users = data;

  const handleDelete = async (id) => {
    try {
      await userRequest.delete(`/user/deleteByAdmin/${id}`, {
        data: { _id: id },
      });
      // window.location.replace("/users/");
      alert("Đã xoá thành công!");
    } catch (err) {
      console.log(err);
    }
  };

  const showModal = (idDelete) => {
    setIdDelete(idDelete)
    setIsModalOpen(true);
  };
  const handleOk = () => {

    if (idDelete !== null) {
      handleDelete(idDelete)
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {data ? (
        users.length > 0 ? (
          <>
            <div className="content read">

              {
                user?.isAdmin ?
                  <div className={styles.headingWrapper}>
                    <div className={styles.headingTitle}>
                      <span >
                        <span >
                          <svg className={styles.headingIcon} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                            <g fill="currentColor">
                              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                            </g>
                          </svg>
                        </span>
                      </span>
                      <span className={styles.title}>
                        <Link className={styles.titleLink} to="/documents">Thông tin người dùng</Link>
                      </span>
                    </div>

                    <div className={styles.headingOpption}>

                      <form className={styles.formInput}>
                        <Search placeholder="Tìm kiếm người dùng" allowClear size="large"
                        // onChange={(e) => setKeyword(e.target.value)} 
                        />
                      </form>
                    </div>
                  </div>
                  :
                  <></>
              }
              {
                user?.isAdmin ?
                  <table style={{ marginBottom: "32px" }}>
                    <thead>
                      <tr>
                        <td>STT</td>
                        <td>Hình ảnh</td>
                        <td>Tên </td>
                        <td>Mã SV/CB</td>
                        <td>Email</td>
                        <td>Quyền</td>
                        <td>Tài liệu sở hữu</td>
                        <td></td>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((userData, index) => (
                        <tr key={userData._id}>
                          <td data-label="STT"><span>{index + 1}</span></td>
                          <td data-label="Hình ảnh">
                            <span>
                              <img style={{ width: "100px", height: "50px" }} src={userData.profilePic ? userData.profilePic : ImgDefault} alt="alt" />
                            </span>
                          </td>
                          <td data-label="Tên thành viên">
                            <span>
                              <Link className="linkTable" to={`/?user=${userData.username}`}>
                                {userData.username}
                              </Link>
                            </span>
                          </td>
                          <td>{userData?.mssv ? userData?.mssv : <span className={styles.textUpdating}>Đang cập nhật</span>}</td>
                          <td data-label="Email"><span className={styles.textEmail}>{userData.email}</span></td>
                          <td data-label="Quyền">
                            <span>
                              {userData.isAdmin ? <Tag color="red">Admin</Tag> : <Tag color="green">Người dùng</Tag>}
                            </span>
                          </td>

                          <td data-label="Tất cả bài viết">
                            <span>
                              <Link className="linkTable" to={`/?user=${userData.username}`}>
                                <Tag color="#2db7f5" icon={<EyeOutlined />}>Xem tài liệu của {userData.username}</Tag>
                              </Link>
                            </span>
                          </td>
                          {(user?.isAdmin) ? (
                            <td className={userData?.isAdmin === true ? "hide" : "actions"}>
                              <div className={styles.actionWrap}  >
                                <DeleteOutlined className={styles.actionIconDelete}
                                  // onClick={() => handleDelete(userData._id)}
                                  onClick={() => showModal(userData._id)}
                                />
                              </div>
                            </td>
                          ) : (
                            <td></td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  : <>
                    <div className={styles.container}>
                      <Row gutter={[20, 7]}>
                        {
                          users?.map((item, index) => {
                            return (
                              <Col key={index} xs={24} sm={12} md={8} lg={6}>

                                <Card
                                  className={styles.cardItem}
                                  key={index}
                                  style={{ width: 270, marginTop: 16 }}
                                  actions={[
                                    <Link className="linkTable" to={`/?user=${item.username}`}>
                                      <Tag color="#2db7f5" icon={<EyeOutlined />}>Xem tài liệu </Tag>
                                    </Link>

                                  ]}
                                >

                                  <Meta
                                    avatar={<Avatar size="large" src={item?.profilePic} icon={<UserOutlined />} />}
                                    title={item.username}
                                    description={
                                      <div>
                                        <div>
                                          <span style={{ fontSize: '14px', color: '#898989', fontWeight: 600 }}>Mã SV/CB: </span>
                                          <span style={{ fontSize: '14px', color: '#2646ba' }}>{item.mssv ? item.mssv :  <span style={{ fontSize: '14px', color: '#898989' }}>Đang cập nhật</span>}</span>
                                        </div>
                                        <div>
                                          <span style={{ fontSize: '14px', color: '#898989', fontWeight: 600 }}>Email: </span>
                                          <span style={{ fontSize: '14px', color: '#2646ba' }}>{item.email}</span>
                                        </div>
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


                  </>
              }
            </div>
            <Modal
              title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
              footer={
                <>
                  <button className={styles.btnDelete}
                    onClick={handleOk}
                  >Xóa</button>
                  <button className={styles.btnCancelDelete}
                    onClick={handleCancel}
                  >Hủy</button>
                </>
              }
            >
              <p>Bạn có chắc chắn muốn xóa người dùng {idDelete}
                {/* <span className={styles.nameDelete}>
                  {name}
                </span>
                <span className={styles.iconDelete}>
                  ?
                </span> */}
              </p>
            </Modal>
          </>
        ) : (
          <EmptyResults />
        )
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Users;
