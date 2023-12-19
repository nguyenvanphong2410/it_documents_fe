import { Link, useLocation } from "react-router-dom";
import useSWR from "swr";
import Loading from "../../components/loading/Loading";
import Pagination from "../../components/pagination/Pagination";
import EmptyResults from "../../components/emptyResults/EmptyResults";
import { domainApi } from "../../requestMethods";
import { Context } from "../../context/Context";
import { useContext, useState } from "react";
import { userRequest } from "../../requestMethods";
import ImgPlaceholder from "../../assets/images/placeholder.jpg";
import { Button, Tag } from "antd";
import styles from "./style.module.scss"
import { CheckCircleOutlined, CheckOutlined, ClockCircleOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
const Articles = () => {
  // const [nameCategory, setNameDelete] = useState('');
  const { user } = useContext(Context);
  const { search, pathname } = useLocation();
  const cat = pathname.split("/")[3];
  const subCat = pathname.split("/")[4];
  const pagePath = search.split("=")[1] || 1;

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    subCat
      ? `${domainApi}/post/all?cat=${subCat}&page=${pagePath}&num_results_on_page=3`
      : cat
        ? `${domainApi}/post/all?cat=${cat}&page=${pagePath}&num_results_on_page=3`
        : search
          ? `${domainApi}/post/all${search}&num_results_on_page=3`
          : `${domainApi}/post/all?num_results_on_page=3`,
    fetcher
  );
  if (error) return <div className="error">Failed to load</div>;

  const posts = data?.posts;

  const page = data?.page;
  const totalPages = data?.total_pages;
  const handleDelete = async (id) => {
    try {
      await userRequest.delete(`/post/${id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

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
      {data ? (
        posts.length > 0 ? (
          <>
            <div className="content read">
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
                      <span className={styles.title}>Thông tin tài liệu thuộc thể loại
                        <span className={styles.nameCategory}>
                          {posts[0].category.replace(/-/g, ' ')}
                        </span>
                      </span>
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
                  <>
                    <h2>Tài liệu thuộc thể loại {posts[0].category.replace(/-/g, ' ')} </h2>
                    <Link to="/write">
                      <Button type="primary" size='large' className={styles.btnCreateDocument}>
                        Tạo tài liệu
                      </Button>
                    </Link>
                  </>

              }

              <table>
                <thead>
                  <tr>
                    <td>STT</td>
                    <td>Hình ảnh</td>
                    <td>Tên bài viết</td>
                    <td>Đăng bởi</td>
                    <td>Thể loại</td>
                    <td>Năm sáng tác</td>
                    <td>Trạng thái</td>
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
                            style={{ width: "100px" }}
                            src={post.photos[0]?.src || ImgPlaceholder}
                            alt="alt"
                          />
                        </span>
                      </td>
                      <td data-label="Tên bài viết">
                        <span>{post.name}</span>
                      </td>
                      <td data-label="Đăng bởi">
                        <span>
                          <Link
                            className="linkTable"
                            to={`/?user=${post.username}`}
                          >
                            {post.username}
                          </Link>
                        </span>
                      </td>
                      <td data-label="Thể loại">
                        <span>
                          <Link
                            className="linkTable"
                            to={`/articles/category/${post.category}`}
                          >
                            {post.category}
                          </Link>
                        </span>
                      </td>
                      <td data-label="Năm sáng tác">
                        <span>{post.year}</span>
                      </td>
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
                      <td data-label="">
                        <span>
                          {post.status === false && user.isAdmin === true ? (
                            <Link to={`/post/${post._id}`}>
                              <Link to={`/post/${post._id}`}>
                                <Tag color="#8904B1" icon={<CheckOutlined />} onClick={() => handleUpdate(post._id)}>Duyệt</Tag>
                              </Link>
                            </Link>
                          ) : (
                            <Link to={`/post/${post._id}`}>
                              <Link to={`/post/${post._id}`}>
                                <Tag color="#2db7f5" icon={<EyeOutlined />}>Xem</Tag>
                              </Link>
                            </Link>
                          )}
                        </span>
                      </td>

                      {(user?.isAdmin || post.username === user?.username) && (
                        <td className={styles.actionWrap}>
                          <Link to={`/post/edit/${post._id}`} className="edit">
                            <EditOutlined className={styles.actionIconEdit} />
                          </Link>
                          <div
                            onClick={() => handleDelete(post._id)}
                          >
                            <DeleteOutlined className={styles.actionIconDelete}
                            // onClick={() => handleDelete(post._id)}
                            />
                          </div>
                        </td>
                      )}
                      {!(user?.isAdmin || post.username === user?.username) && (
                        <td></td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination page={page} total_pages={totalPages} />
            </div>
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

export default Articles;
