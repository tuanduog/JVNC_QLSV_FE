import React from "react";
import styles from '../Login/Login.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [tendn, setTendn] = useState("");
    const [matkhau, setMatkhau] = useState("");
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
        const user = { tendn: tendn, matkhau: matkhau, remember: remember };
        const res = await axios.post("https://api.student-management.io.vn/auth/login", user);
        console.log("Token nhận được:", res.data.token);
        const userInfo = jwtDecode(res.data.token);
        // console.log(userInfo.sub);
        localStorage.setItem("token", res.data.token);
        const role = res.data.role;
        alert("Đăng nhập thành công!");
        if(role === "ROLE_SINHVIEN"){
            navigate('/Home_Student/Hello_Stu', {state : {userInfo : userInfo}});
        }
        if(role === "ROLE_GIANGVIEN"){
            navigate('/Home_Lecturer/Hello_Lec', {state : {userInfo : userInfo}});
        }
        if(role === "ROLE_ADMIN"){
            navigate('/Home_Admin/Hellopage', {state : {userInfo : userInfo}})
        }
    } catch (err) {
        console.error(err);
        alert(err.response.data);
    }
  };
    return (
        <div className={styles.main}>
            <div className="container">
            <div className="row">
                <div className="col-sm-7 col-md-5 col-lg-4 mx-auto">
                <div className="card border-0 shadow rounded-3 my-5 p-2">
                    <div className="card-body p-4 p-sm-5">
                    <h3 className="card-title text-center mb-5 fw-semibold">Đăng nhập</h3>
                    <form>
                        <div className="form-floating mb-4" style={{border: '1px solid gray', borderRadius: '5px'}}>
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            value={tendn}
                            onChange={(e) => setTendn(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Tên đăng nhập</label>
                        </div>
                        <div className="form-floating mb-3" style={{border: '1px solid gray', borderRadius: '5px'}}>
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            value={matkhau}
                            onChange={(e) => setMatkhau(e.target.value)}
                        />
                        <label htmlFor="floatingPassword">Mật khẩu</label>
                        </div>

                        <div className="form-check mb-3 pt-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="rememberPasswordCheck"
                            style={{border: '1px solid gray'}}
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="rememberPasswordCheck">
                            Ghi nhớ mật khẩu
                        </label>
                        </div>
                        <div className="d-grid pt-3">
                        <button className={`btn btn-primary ${styles['btn-login']} text-uppercase fw-bold`} type="submit"
                        onClick={handleLogin}>
                            ĐĂNG NHẬP
                        </button>
                        </div>
                        
                    </form>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Login;