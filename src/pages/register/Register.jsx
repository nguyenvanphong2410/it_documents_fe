import "./register.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { userRequest } from "../../requestMethods";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from './style.module.scss'
import { Col, Row } from "antd";
import { Slide, ToastContainer, toast } from "react-toastify";

const Register = () => {

  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      fullName: "",
      mssv: "",
      address: ""
    },
    validationSchema: Yup.object({
      // username: Yup.string()
      //   .matches(/^[a-zA-Z0-9]{4,}$/,
      //     "Tên người dùng phải có ít nhất 4 ký tự, không dấu, không có khoản trắng và ký tự đặc biệt"),
      email: Yup.string()
        .matches(
          /^[a-zA-Z0-9]{4,}@([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}$/,
          "Email không hợp lệ !"
        ),
      password: Yup.string()
        .matches(
          /^(?=.*[0-9])(?=.*[!@#$%^&*()-_+=])[a-zA-Z0-9!@#$%^&*()-_+=]{8,}$/,
          "Có số, lớn hơn 8 ký tự, có ký tự đặc biệt"
        ),
    }),
    onSubmit: async (values) => {
      try {
        const res = await userRequest.post("/auth/register", {
          username: values.username,
          email: values.email,
          password: values.password,
          fullName: values.fullName,
          mssv: values.mssv,
          address: values.address
        });
        if (res) {
          toast.success('Đăng ký thành công')
          setTimeout(() => {
            res.data && window.location.replace("/login");
          }, 2000);
        }

      } catch (err) {
        toast.error('Đăng ký thất bại !')
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
      }
    },
  });

  return (
    <>
      <ToastContainer
        transition={Slide}
        autoClose={2500}
      />
      <div className="register">
        <div className={styles.registerWrap}>
          <h2 className={styles.headingTextRegister}>Đăng ký</h2>
          <form onSubmit={formik.handleSubmit}>
            <Row>
              <Col xs={24} sm={24} md={11} lg={11}>
                <div className={styles.inputItem}>
                  <label htmlFor="" className={styles.headingTextOriginInput}>Tên đầy đủ<span style={{ color: 'red' }}>*</span></label><br />
                  <input
                    className="register__input"
                    type="text" id="fullName" name="fullName"
                    placeholder="Tên đầy đủ"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    required
                    autoComplete="off"
                  />
                  {formik.errors.fullName && (
                    <p style={{ color: 'red' }}> {formik.errors.fullName} </p>
                  )}
                </div>
              </Col>
              <Col md={2} lg={2}></Col>
              <Col xs={24} sm={24} md={11} lg={11}>
                <div className={styles.inputItem}>
                  <label htmlFor="" className={styles.headingTextOriginInput}>Tên hiển thị<span style={{ color: 'red' }}>*</span></label><br />
                  <input className="register__input" type="text" id="username" name="username" placeholder="Tên người dùng"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    required autoComplete="off"
                  />
                  {formik.errors.username && (
                    <p style={{ color: 'red' }}> {formik.errors.username} </p>
                  )}
                </div>
              </Col>

            </Row>
            <Row>
              <Col xs={24} sm={24} md={11} lg={11}>
                <div className={styles.inputItem}>
                  <label htmlFor="" className={styles.headingTextOriginInput}>Email<span style={{ color: 'red' }}>*</span></label><br />
                  <input className="register__input" type="email" placeholder="Nhập email của bạn" id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    required autoComplete="off"
                  />
                  {formik.errors.email && (
                    <p style={{ color: 'red' }}> {formik.errors.email} </p>
                  )}
                </div>
              </Col>
              <Col md={2} lg={2}></Col>
              <Col xs={24} sm={24} md={11} lg={11}>
                <div className={styles.inputItem}>
                  <label htmlFor="" className={styles.headingTextOriginInput}>Mật khẩu<span style={{ color: 'red' }}>*</span></label><br />
                  <input className="register__input" type="text" placeholder="Mật khẩu" id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    required autoComplete="off"
                  />
                  {formik.errors.password && (
                    <p style={{ color: 'red' }}> {formik.errors.password} </p>
                  )}
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={11} lg={11}>
                <div className={styles.inputItem}>
                  <label htmlFor="" className={styles.headingTextOriginInput}>Mã SV/CB<span style={{ color: 'red' }}>*</span></label><br />
                  <input
                    className="register__input"
                    type="text"
                    id="mssv"
                    name="mssv"
                    placeholder="Nhập mã SV/CB"
                    value={formik.values.mssv}
                    onChange={formik.handleChange}
                    required
                    autoComplete="off"
                  />
                  {formik.errors.mssv && (
                    <p style={{ color: 'red' }}> {formik.errors.mssv} </p>
                  )}
                </div>
              </Col>
              <Col md={2} lg={2}></Col>
              <Col xs={24} sm={24} md={11} lg={11}>
                <div className={styles.inputItem}>
                  <label htmlFor="" className={styles.headingTextOriginInput}>Địa chỉ</label><br />
                  <input
                    className="register__input"
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Nhập địa chỉ"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    // required
                    autoComplete="off"
                  />
                  {formik.errors.mssv && (
                    <p style={{ color: 'red' }}> {formik.errors.address} </p>
                  )}
                </div>
              </Col>

            </Row>

            <Row>
              <Col span={24}>
                <button className={styles.btnRegister} type="submit">
                  Đăng ký
                </button>
              </Col>
            </Row>

          </form>
          <div className={styles.noAccountText}>
            Đã có tài khoản? <Link to="/login" className={styles.switchText}>Đăng nhập</Link>
          </div>
          {error && (
            <span className="register__error" style={{ marginTop: '10px' }}>
              Email người dùng hoặc tên người dùng đã tồn tại!
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;
