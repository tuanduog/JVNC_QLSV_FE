import React from "react";
import './Home_Lec.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// #e0e0e0
const Home_Lec = () => {
    return (
        <div> 
            <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm" style={{height: '70px'}}>
                <div class="container-fluid">
                    <a class="navbar-brand fw-bold ps-3">QUẢN LÝ SINH VIÊN</a>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="d-flex align-items-center ms-auto me-3">
                        <span class="text-black me-2 pe-2">Nguyễn Văn A</span>
                        {/* <img src="https://via.placeholder.com/40" alt="User Avatar" class="rounded-circle" style="width: 40px; height: 40px;"/> */}
                        <i class="fa-solid fa-circle-user fa-2x"></i>
                    </div>
                    </div>
                </div>
            </nav>
            <div className="d-flex" style={{ height: 'calc(100vh - 70px)' }}>
                <div className="p-3" style={{width: '250px', minHeight: '100%', backgroundColor: '#0d6efd'}}>
                    <p className="text-white">Tài khoản giảng viên</p>
                    <hr style={{border: '1px solid', color: 'white'}}></hr>
                    <ul className="nav flex-column">
                        <li className="nav-item d-flex align-items-center mb-2">
                            <i class="fa-solid fa-house text-white"></i>
                            <a className="nav-link text-white">Trang chủ</a>
                        </li>
                        <li className="nav-item d-flex align-items-center mb-2">
                            <i class="fa-solid fa-user text-white"></i>
                            <a className="nav-link text-white">Thông tin giảng viên</a>
                        </li>
                        <li className="nav-item d-flex align-items-center mb-2">
                            <i class="fa-solid fa-calendar text-white"></i>
                            <a className="nav-link text-white">Thời khóa biểu</a>
                        </li>
                        <li className="nav-item d-flex align-items-center mb-2">
                            <i class="fa-solid fa-book text-white"></i>
                            <a className="nav-link text-white">Thông tin học phần</a>
                        </li>
                        <li className="nav-item d-flex align-items-center mb-2">
                            <i class="fa-solid fa-triangle-exclamation text-white"></i>
                            <a className="nav-link text-white">Phản hồi</a>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <i class="fa-solid fa-right-from-bracket text-white"></i>
                            <a className="nav-link text-white">Đăng xuất</a>
                        </li>
                    </ul>
                </div>

                <div className="flex-grow-1 p-4" style={{backgroundColor: '#dee2e6'}}>
                </div>
            </div>
        </div>
    )
}

export default Home_Lec;