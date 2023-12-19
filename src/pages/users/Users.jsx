import { Link } from "react-router-dom";
import useSWR from "swr";
import Loading from "../../components/loading/Loading";
import EmptyResults from "../../components/emptyResults/EmptyResults";
import { domainApi } from "../../requestMethods";
import ImgDefault from "../../assets/images/img_default.jpg";
import { userRequest } from "../../requestMethods";
import { Context } from "../../context/Context";
import { useContext } from "react";

const Users = () => {
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

  return (
    <>
      {data ? (
        users.length > 0 ? (
          <>
            <div className="content read">
              <h2>Xem thành viên</h2>
              <Link to="/write" className="create-contact">
                Tạo tài liệu
              </Link>
              <table style={{ marginBottom: "32px" }}>
                <thead>
                  <tr>
                    <td>STT</td>
                    <td>Hình ảnh</td>
                    <td>Tên </td>
                    <td>Email</td>
                    <td>Quyền</td>
                    <td>Tài liệu</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {users.map((userData, index) => (
                    <tr key={userData._id}>
                      <td data-label="STT">
                        <span>{index +1}</span>
                      </td>
                      <td data-label="Hình ảnh">
                        <span>
                          <img
                            style={{ width: "100px" }}
                            src={
                              userData.profilePic
                                ? userData.profilePic
                                : ImgDefault
                            }
                            alt="alt"
                          />
                        </span>
                      </td>
                      <td data-label="Tên thành viên">
                        <span>
                          <Link
                            className="linkTable"
                            to={`/?user=${userData.username}`}
                          >
                            {userData.username}
                          </Link>
                        </span>
                      </td>
                      <td data-label="Email">
                        <span>{userData.email}</span>
                      </td>
                      <td data-label="Quyền">
                        <span>
                          {userData.isAdmin ? "Admin ❗" : "Người dùng thường ✅"}
                        </span>
                      </td>

                      <td data-label="Tất cả bài viết">
                        <span>
                          <Link
                            className="linkTable"
                            to={`/?user=${userData.username}`}
                          >
                            Xem tài liệu của: {userData.username}
                          </Link>
                        </span>
                      </td>
                      {(user?.isAdmin) ? (
                        <td className={userData?.isAdmin === true ? "hide" : "actions"}>
                          <div className="trash" onClick={() => handleDelete(userData._id)} >
                            <i className="fas fa-trash fa-xs"></i>
                          </div>
                        </td>
                      ) : (
                        <td></td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
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

export default Users;
