import "./login.scss";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { userRequest } from "../../requestMethods";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  useEffect(() => {
    document.title = "Đăng nhập.";
  }, []);

  const { dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().matches(
        /^[a-zA-Z0-9]{4,}@([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}$/,
        "Email có ký tự @, ít nhất 4 ký tự, và không có khoản trắng, không chứa ký tự đặc biệt, không dấu"
      ),
      password: Yup.string().matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*()-_+=])[a-zA-Z0-9!@#$%^&*()-_+=]{4,}$/,
        "Mật khẩu có số, ít nhất 4 ký tự và có chứa 1 ký tự đặc biệt"
      ),
    }),
    onSubmit: async (values) => {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await userRequest.post("/auth/login", {
          email: values.email,
          password: values.password,
        });
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE" });
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 1400);
      }
    },
  });

  return (
    <div className="login">
      <h2 className="login__title">Đăng nhập</h2>
      <form className="login__form" onSubmit={formik.handleSubmit}>
        <label htmlFor="">Email của bạn</label>
        <input
          className="login__input"
          type="email"
          placeholder="Email"
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
        <label htmlFor="">Mật khẩu</label>
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
        <button className="login__button" type="submit" disabled={isFetching}>
          Đăng nhập
        </button>
      </form>
      <div className="login__link">
        Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
      </div>
      {error && (
        <span className="login__error">
          Email người dùng hoặc mật khẩu chưa đúng!
        </span>
      )}
    </div>
  );
};

export default Login;
