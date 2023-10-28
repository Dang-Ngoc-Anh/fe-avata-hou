import React from "react";
import CustemInput from "../../components/Custeminput";
import "./Login.scss";
const Login = () => {
  return (
    <form action="" method="">
      <div className="login">
        <div className="logo">
          <img src="./logo.svg" alt="loi" />
        </div>
        <CustemInput type="email" name="email" placeholder="Email" />
        <CustemInput type="password" name="password" placeholder="Password" />
        <div class="input-group row">
          <div class="row">
            <input type="checkbox" id="remember" />
            <label for="remember" lass="custom-checkbox">
              Remember me?
            </label>
          </div>

          <div class="row">
            <a href="#" target="blank" className="forgot-password">
              Forgot password?
            </a>
          </div>
        </div>

        <button
          className="btn-login"
          type="submit"
          onClick={(e) => e.preventDefault()}
        >
          Đăng Nhập
        </button>
      </div>
    </form>
  );
};

export default Login;
