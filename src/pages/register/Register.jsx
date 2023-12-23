import "./register.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { userRequest } from "../../requestMethods";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from './style.module.scss'

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
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .matches(/^[a-zA-Z0-9]{4,}$/,
          "Tên người dùng phải có ít nhất 4 ký tự, không dấu, không có khoản trắng và ký tự đặc biệt"),
      email: Yup.string()
        .matches(
          /^[a-zA-Z0-9]{4,}@([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}$/,
          "Email có ký tự @, ít nhất 4 ký tự, và không có khoản trắng, không chứa ký tự đặc biệt, không dấu"
        ),
      password: Yup.string()
        .matches(
          /^(?=.*[0-9])(?=.*[!@#$%^&*()-_+=])[a-zA-Z0-9!@#$%^&*()-_+=]{4,}$/,
          "Mật khẩu có số, ít nhất 4 ký tự và có chứa 1 ký tự đặc biệt"
        ),
    }),
    onSubmit: async (values) => {
      try {
        const res = await userRequest.post("/auth/register", {
          username: values.username,
          email: values.email,
          password: values.password,
        });
        res.data && window.location.replace("/login");
      } catch (err) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 1400);
      }
    },
  });

  return (
    <div className="register">
      <div className={styles.registerWrap}>
      <h2 className={styles.headingTextRegister}>Đăng ký</h2>
      <form className="register__form" onSubmit={formik.handleSubmit}>

        <label htmlFor=""  className={styles.headingTextOriginInput}>Tên người dùng</label>
        <input
          className="register__input"
          type="text"
          id="username"
          name="username"
          placeholder="Tên người dùng"
          value={formik.values.username}
          onChange={formik.handleChange}
          required
          autoComplete="off"
        />
        {formik.errors.username && (
          <p className="errorMsg"> {formik.errors.username} </p>
        )}
{/* 
        <label htmlFor="">Tên hiển thị</label>
        <input
          className="register__input"
          type="text"
          id="username"
          name="username"
          placeholder="Tên người dùng"
          value={formik.values.username}
          onChange={formik.handleChange}
          required
          autoComplete="off"
        />
        {formik.errors.username && (
          <p className="errorMsg"> {formik.errors.username} </p>
        )}
        <label htmlFor="">Mã SV/CB</label>
        <input
          className="register__input"
          type="text"
          id="username"
          name="username"
          placeholder="Nhập mã SV/CB"
          value={formik.values.username}
          onChange={formik.handleChange}
          required
          autoComplete="off"
        />
        {formik.errors.username && (
          <p className="errorMsg"> {formik.errors.username} </p>
        )} */}

        <label htmlFor=""  className={styles.headingTextOriginInput}>Email</label>
        <input
          className="register__input"
          type="email"
          placeholder="Nhập email của bạn"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          required
          autoComplete="off"
        />
        {formik.errors.email && (
          <p className="errorMsg"> {formik.errors.email} </p>
        )}

        <label htmlFor=""  className={styles.headingTextOriginInput}>Mật khẩu</label>
        <input
          className="register__input"
          type="text"
          placeholder="Mật khẩu"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          required
          autoComplete="off"
        />
        {formik.errors.password && (
          <p className="errorMsg"> {formik.errors.password} </p>
        )}

        <button className="register__button" type="submit">
          Đăng ký
        </button>
      </form>
      <div className={styles.noAccountText}>
        Đã có tài khoản? <Link to="/login" className={styles.switchText}>Đăng nhập</Link>
      </div>
      {error && (
        <span className="register__error">
          Email người dùng hoặc tên người dùng đã tồn tại!
        </span>
      )}
      </div>
    </div>
  );
};

export default Register;
