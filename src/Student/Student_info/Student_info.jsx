import React, { useEffect } from "react";
import '../Student_info/Student_info.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from "react";
import axios from "axios";
import { format } from 'date-fns';

const Student_info = () => {
    const [show, setShow] = useState("Chỉnh sửa");
    const [userInfo, setUserInfo] = useState({});
    const [gioiTinh, setGioiTinh] = useState("");
    const [queQuan, setQueQuan] = useState("");
    const [sodt, setSodt] = useState("");
    const [ngaySinh, setNgaySinh] = useState("");
    const [email, setEmail] = useState("");
    const [hovaten, setHovaten] = useState("");

    const handleFix = async () => {
        setShow("Cập nhật");
    }
    const handleCancle = () => {
        setShow("Chỉnh sửa");
    }
    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    const handleUpdate = async () => {
        if(!isValidEmail(email)){
            alert("Email không hợp lệ. Vui lòng nhập đúng định dạng.");
            return;
        }
        const new_info = {hovaten: hovaten, gioitinh: gioiTinh, quequan: queQuan, sodienthoai: sodt, ngaysinh:ngaySinh, email: email};
        
        await axios.put(`https://api.student-management.io.vn/auth/update-sinhvien/${userInfo.masv}`, new_info,
            {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
        );
        alert("Chỉnh sửa thông tin thành công!");
        setShow("Chỉnh sửa");
        fetchUser();
    }
    const fetchUser = async () => {
            const res = await axios.get("https://api.student-management.io.vn/auth/user-info",
                {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
            );
            setUserInfo(res.data);
            setGioiTinh(res.data.gioitinh);
            setQueQuan(res.data.quequan);
            setSodt(res.data.sodienthoai);
            setNgaySinh(res.data.ngaysinh);
            setEmail(res.data.email);
            setHovaten(res.data.hovaten);
        }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="body">
            <div className="container">
            <div className="row gutters">
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                <div className="card h-100">
                    <div className="card-body">
                    <div className="account-settings">
                        <div className="user-profile">
                        <div className="user-avatar">
                            <i className="fa-solid fa-user fa-5x"></i>
                        </div>
                        <h5 className="user-name">{userInfo.hovaten}</h5>
                        <h6 className="user-email">{email}</h6>
                        </div>
                        <div className="about">
                            <p>Mã sinh viên: {userInfo.masv}</p>
                            <p>Lớp: {userInfo.malop}</p>
                            <p>Ngành: {userInfo.manganh}</p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                <div className="card h-100" style={{paddingTop: '7px'}}>
                    <div className="card-body">
                    <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            {show === "Chỉnh sửa" ? (
                                <h5 className="mb-3 text-primary">Thông tin cá nhân</h5>
                            ) : (
                                <h5 className="mb-3 text-primary">Chỉnh sửa thông tin cá nhân</h5>
                            )}
                        </div>
                        <hr></hr>
                        {show === "Chỉnh sửa" ? (
                            <div>
                            <div className="row mb-3 align-items-center" style={{width: '100%'}}>
                                <div className="col-5">
                                    <label>Giới tính: </label>
                                </div>
                                <div className="col-7">
                                    <p className="mb-0">{userInfo.gioitinh}</p>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="row mb-3 align-items-center" style={{width: '100%'}}>
                                <div className="col-5">
                                    <label>Ngày sinh: </label>
                                </div>
                                <div className="col-7">
                                    {userInfo.ngaysinh && (
                                        <p className="mb-0">{format(new Date(userInfo.ngaysinh), 'dd/MM/yyyy')}</p>
                                    )}
                                </div>
                            </div>
                            <hr></hr>
                            <div className="row mb-3 align-items-center" style={{width: '100%'}}>
                                <div className="col-5">
                                    <label>Quê quán: </label>
                                </div>
                                <div className="col-7">
                                    <p className="mb-0">{userInfo.quequan}</p>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="row mb-3 align-items-center" style={{width: '100%'}}>
                                <div className="col-5">
                                    <label>Số điện thoại: </label>
                                </div>
                                <div className="col-7">
                                    <p className="mb-0">{userInfo.sodienthoai}</p>
                                </div>
                            </div>
                            </div>
                        ) : (
                            <div>
                                <div className="row mb-3 align-items-center" style={{width: '100%'}}>
                                    <div className="col-5">
                                        <label>Họ và tên: </label>
                                    </div>
                                    <div className="col-7">
                                        <input type="text" className="form-control" id="website" placeholder=""
                                        value={hovaten} onChange={(e) => setHovaten(e.target.value)}/>
                                    </div> 
                                </div>
                                <hr></hr>
                                <div className="row mb-3 align-items-center" style={{width: '100%'}}>
                                    <div className="col-5">
                                        <label>Giới tính: </label>
                                    </div>
                                    <div className="col-7">
                                        <select className="form-select" style={{fontSize: '0.875rem', color: '#2e323c'}} aria-label="Default select"
                                        value={gioiTinh} onChange={(e) => setGioiTinh(e.target.value)}>
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                            <option value="Khác">Khác</option>
                                        </select>
                                    </div>
                                </div>
                                <hr></hr>
                                <div className="row mb-3 align-items-center" style={{width: '100%'}}>
                                    <div className="col-5">
                                        <label>Ngày sinh: </label>
                                    </div>
                                    <div className="col-7">
                                        <input type="date" className="form-control" id="website" placeholder=""
                                        value={ngaySinh} onChange={(e) => setNgaySinh(e.target.value)}/>
                                    </div>
                                </div>
                                <hr></hr>
                                <div className="row mb-3 align-items-center" style={{width: '100%'}}>
                                    <div className="col-5">
                                        <label>Quê quán: </label>
                                    </div>
                                    <div className="col-7">
                                        <input type="url" className="form-control" id="website" placeholder=""
                                        value={queQuan} onChange={(e) => setQueQuan(e.target.value)}/>
                                    </div>
                                </div>
                                <hr></hr>
                                <div className="row mb-3 align-items-center" style={{width: '100%'}}>
                                    <div className="col-5">
                                        <label>Số điện thoại: </label>
                                    </div>
                                    <div className="col-7">
                                        <input type="url" className="form-control" id="website" placeholder=""
                                        value={sodt} onChange={(e) => setSodt(e.target.value)}/>
                                    </div>
                                </div>
                                <hr></hr>
                                <div className="row mb-3 align-items-center" style={{width: '100%'}}>
                                    <div className="col-5">
                                        <label>Email: </label>
                                    </div>
                                    <div className="col-7">
                                        <input type="email" className="form-control" id="website" placeholder=""
                                        value={email} onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                        )}
                        <hr></hr>
                        {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="website">Quê quán</label>
                            <input type="url" className="form-control" id="website" placeholder="Website url" />
                        </div>
                        </div> */}
                    </div>

                    <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-2">
                        <div className="text-right">
                            {show === "Chỉnh sửa" ? (
                                <button type="button" className="btn btn-primary" onClick={() => handleFix()}>Chỉnh sửa thông tin</button>
                            ) : (
                                <div>
                                    <button type="button" className="btn btn-primary" onClick={() => handleUpdate()}>Xác nhận</button>
                                    <button type="button" className="btn btn-danger ms-2" onClick={handleCancle}>Hủy bỏ</button>
                                </div>
                            )}
                        </div>
                        </div>
                    </div>
                    
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Student_info;