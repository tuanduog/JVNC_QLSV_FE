import React from "react";
import './Home_Lec.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
// #e0e0e0
const Home_Lec = () => {
    const [active, setActive] = useState("Trang chủ");
    const location = useLocation();
    const userInfo = location.state?.userInfo;
    const navigate = useNavigate();
    const handleHome = async (path) => {
        setActive("Trang chủ");
        navigate(path, {state: {userInfo}});
    }
    const handleInfo = async () => {
        setActive("Thông tin");
        navigate("Lecturer_info", {state: {userInfo}});
    }
    const handleSchedule = async () => {
        setActive("Thời khóa biểu");
        navigate("Schedule", {state: {userInfo}});
    }
    const handleCourse = async () => {
        setActive("Học phần");
        navigate("Course", {state: {userInfo}});
    }
    const handleResponse = async () => {
        setActive("Phản hồi");
        navigate("Response", {state: {userInfo}});
    }
    const handleLogout = async () => {
        setActive("Đăng xuất");
        const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?");
        if (confirmLogout) {
            localStorage.removeItem("token");
            navigate("/");
        } else {
            console.log("Hủy đăng xuất");
        }
    }
    
    return (
        <div> 
            <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm" style={{height: '70px'}}>
                <div class="container-fluid">
                    <a class="navbar-brand fw-bold ps-3">QUẢN LÝ SINH VIÊN</a>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="d-flex align-items-center ms-auto me-3">
                        <span class="text-black me-2 pe-2">{userInfo.hovaten}</span>
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
                            <a className={`nav-link text-white ${active === "Trang chủ" ? "active" : ""}`} onClick={() => handleHome("/Home_Lecturer/Hello_Lec")}>Trang chủ</a>
                        </li>
                        <li className="nav-item d-flex align-items-center mb-2">
                            <i class="fa-solid fa-user text-white"></i>
                            <a className={`nav-link text-white ${active === "Thông tin" ? "active" : ""}`} onClick={handleInfo}>Thông tin cá nhân</a>
                        </li>
                        <li className="nav-item d-flex align-items-center mb-2">
                            <i class="fa-solid fa-calendar text-white"></i>
                            <a className={`nav-link text-white ${active === "Thời khóa biểu" ? "active" : ""}`} onClick={handleSchedule}>Lịch giảng dạy</a>
                        </li>
                        <li className="nav-item d-flex align-items-center mb-2">
                            <i class="fa-solid fa-book text-white"></i>
                            <a className={`nav-link text-white ${active === "Học phần" ? "active" : ""}`} onClick={handleCourse}>Học phần giảng dạy</a>
                        </li>
                        <li className="nav-item d-flex align-items-center mb-2">
                            <i class="fa-solid fa-triangle-exclamation text-white"></i>
                            <a className={`nav-link text-white ${active === "Phản hồi" ? "active" : ""}`} onClick={handleResponse}>Phản hồi</a>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <i class="fa-solid fa-right-from-bracket text-white"></i>
                            <a className={`nav-link text-white ${active === "Đăng xuất" ? "active" : ""}`} onClick={handleLogout}>Đăng xuất</a>
                        </li>
                    </ul>
                </div>

                <div className="flex-grow-1 p-4" style={{backgroundColor: '#dee2e6'}}>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Home_Lec;