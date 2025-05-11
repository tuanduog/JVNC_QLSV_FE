import React from "react";
import styles from '../Login/Login.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
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
                        />
                        <label htmlFor="floatingInput">Tên đăng nhập</label>
                        </div>
                        <div className="form-floating mb-3" style={{border: '1px solid gray', borderRadius: '5px'}}>
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                        />
                        <label htmlFor="floatingPassword">Mật khẩu</label>
                        </div>

                        <div className="form-check mb-3 pt-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="rememberPasswordCheck"
                            style={{border: '1px solid gray'}}
                        />
                        <label className="form-check-label" htmlFor="rememberPasswordCheck">
                            Ghi nhớ mật khẩu
                        </label>
                        </div>
                        <div className="d-grid pt-3">
                        <button className={`btn btn-primary ${styles['btn-login']} text-uppercase fw-bold`} type="submit">
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