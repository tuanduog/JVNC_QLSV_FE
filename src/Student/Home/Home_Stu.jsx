import React from "react";
import './Home_Stu.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

// #e0e0e0
const Home_Stu = () => {
    const [active, setActive] = useState("Trang chủ");
    const location = useLocation();
    const userInfo = location.state?.userInfo;
    const navigate = useNavigate();
    const handleHome = async (path) => {
        setActive("Trang chủ");
        navigate(path, { state: { userInfo }});
    }
    const handleInfo = async (path) => {
        setActive("Thông tin");
        navigate(path, { state: { userInfo }});
    }
    const handleSchedule = async (path) => {
        setActive("Thời khóa biểu");
        navigate(path, { state: { userInfo }});
    }
    const handleCourse = async (path) => {
        setActive("Học phần");
        navigate(path, { state: {userInfo}});
    }
    const handleResponse = async (path) => {
        setActive("Phản hồi");
        navigate(path, { state: {userInfo}});
    }
    const handleLogout = async (e) => {
        e.preventDefault();
        setActive("Đăng xuất");
        setActive("Đăng xuất");
        const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?");
        if (confirmLogout) {
            localStorage.removeItem("token");
            navigate("/");
        } else {
            console.log("Hủy đăng xuất");
        }
    }

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if(!token){
    //         navigate("/");
    //     }
    // }, []);
    return (
        <div> 
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm" style={{height: '70px'}}>
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold ps-3" href="">QUẢN LÝ SINH VIÊN</a>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="d-flex align-items-center ms-auto me-3">
                        <span className="text-black me-2 pe-2">{userInfo.hovaten}</span>
                        {/* <img src="https://via.placeholder.com/40" alt="User Avatar" class="rounded-circle" style="width: 40px; height: 40px;"/> */}
                        <i className="fa-solid fa-circle-user fa-2x"></i>
                    </div>
                    </div>
                </div>
            </nav>
            <div className="d-flex" style={{ height: 'calc(100vh - 70px)' }}>
                <div className="p-3" style={{width: '250px', minHeight: '100%', backgroundColor: '#0d6efd'}}>
                    <p className="text-white">Tài khoản sinh viên</p>
                    <hr style={{border: '1px solid', color: 'white'}}></hr>
                    <ul className="nav flex-column">
                        <li className="nav-item d-flex align-items-center mb-2">
                            <i class="fa-solid fa-house text-white"></i>
                            <a className={`nav-link text-white ${active === "Trang chủ" ? "active" : ""}`} onClick={() => handleHome("/Home_Student/Hello_Stu")}>Trang chủ</a>
                        </li>
                        <li className="nav-item d-flex align-items-center mb-2">
                            <i class="fa-solid fa-user text-white"></i>
                            <a className={`nav-link text-white ${active === "Thông tin" ? "active": ""}`} onClick={() => handleInfo("/Home_Student/Student_info")}>Thông tin cá nhân</a>
                        </li>
                        <li className="nav-item d-flex align-items-center mb-2">
                            <i class="fa-solid fa-calendar text-white"></i>
                            <a className={`nav-link text-white ${active === "Thời khóa biểu" ? "active": ""}`} onClick={() => handleSchedule("/Home_Student/Schedule")}>Thời khóa biểu</a>
                        </li>
                        <li className="nav-item d-flex align-items-center mb-2">
                            <i class="fa-solid fa-book text-white"></i>
                            <a className={`nav-link text-white ${active === "Học phần" ? "active": ""}`} onClick={() => handleCourse("/Home_Student/Course")}>Thông tin học phần</a>
                        </li>
                        <li className="nav-item d-flex align-items-center mb-2">
                            <i class="fa-solid fa-triangle-exclamation text-white"></i>
                            <a className={`nav-link text-white ${active === "Phản hồi" ? "active": ""}`} onClick={() => handleResponse("/Home_Student/Response")}>Phản hồi</a>
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

export default Home_Stu;