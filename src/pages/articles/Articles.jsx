import { Link, useLocation } from "react-router-dom";
import useSWR from "swr";
import Loading from "../../components/loading/Loading";
import Pagination from "../../components/pagination/Pagination";
import EmptyResults from "../../components/emptyResults/EmptyResults";
import { domainApi } from "../../requestMethods";
import { Context } from "../../context/Context";
import { useContext } from "react";
import { userRequest } from "../../requestMethods";
import ImgPlaceholder from "../../assets/images/placeholder.jpg";

const Articles = () => {
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
              <h2>Xem Bài Viết</h2>
              <Link to="/write" className="create-contact">
                Tạo tài liệu
              </Link>
              <table>
                <thead>
                  <tr>
                    <td>STT</td>
                    <td>Hình ảnh</td>
                    <td>Tên bài viết</td>
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
                        <span>{index +1}</span>
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
                      <td data-label="Mô tả">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: post.desc.replace(/<[^>]+>/g, ""),
                          }}
                        ></span>
                      </td>
                      <td data-label="">
                        <span>
                          {post.status === false && user.isAdmin === true ? (
                            <Link to={`/post/${post._id}`}>
                              <button
                                className="create-contact"
                                style={{
                                  backgroundColor: "#868686",
                                }}
                              >
                                Chờ 
                              </button>
                            </Link>
                          ) : post.status === false ? (
                            <button
                              className="create-contact"
                              style={{
                                backgroundColor: "#868686",
                                cursor: "default",
                              }}
                            >
                              Chờ 
                            </button>
                          ) : (
                            <Link to={`/post/${post._id}`}>
                              <button className="create-contact">
                                Xem bài viết
                              </button>
                            </Link>
                          )}
                        </span>
                      </td>
                      {user.isAdmin && post.status === false && (
                        <td>
                          <span>
                            <button
                              className="create-contact"
                              onClick={() => handleUpdate(post._id)}
                            >
                              Duyệt
                            </button>
                          </span>
                        </td>
                      )}

                      {user.isAdmin && post.status === true && (
                        <td>
                          <span>
                            <button
                              className="create-contact"
                              style={{
                                backgroundColor: "#868686",
                                cursor: "default",
                              }}
                            >
                              Duyệt
                            </button>
                          </span>
                        </td>
                      )}
                      {(user?.isAdmin || post.username === user?.username) && (
                        <td className="actions">
                          <Link to={`/post/edit/${post._id}`} className="edit">
                            <i className="fas fa-pen fa-xs"></i>
                          </Link>
                          <div
                            className="trash"
                            onClick={() => handleDelete(post._id)}
                          >
                            <i className="fas fa-trash fa-xs"></i>
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
