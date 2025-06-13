import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { vi } from 'date-fns/locale';
import axios from "axios";

function Add_GiangVien() {
    const [magv, setMagv] = useState("");
    const [hovaten, setHovaten] = useState("");
    const [matkhau, setMatkhau] = useState("");
    const [gioitinh, setGioitinh] = useState("Nam");
    const [ngaysinh, setNgaysinh] = useState("");
    const [quequan, setQuequan] = useState("");
    const [sodt, setSodt] = useState("");
    const [email, setEmail] = useState("");
    const [khoa, setKhoa] = useState("");
    const handleRefresh = () => {
        setMagv("");
        setHovaten("");
        setMatkhau("");
        setGioitinh("");
        setNgaysinh("");
        setQuequan("");
        setSodt("");
        setEmail("");
        setKhoa("");
    }
    const isValidEmail = () => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    const handleAdd = async () => {
        if(!isValidEmail(email)){
            alert("Email không hợp lệ. Vui lòng nhập đúng định dạng.");
            return;
        }
        const new_gv = {magv: magv, hovaten: hovaten, gioitinh: gioitinh, ngaysinh: ngaysinh, quequan: quequan, sodienthoai: sodt, 
            email: email, matkhau: matkhau, makhoa: khoa, quyen_nd: "ROLE_GIANGVIEN"}
        console.log(new_gv);
        try {
            const res = await axios.post("https://api.student-management.io.vn/auth/add-giangvien", new_gv,
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
                }
            )
            console.log(res.data);
            alert("Thêm giảng viên thành công");
        } catch (err){
            alert(err.response?.data);
        }
    }

    return (
        <div className="container mt-3">
        <div className="card shadow rounded p-4">
            <h4 className="mb-4 text-primary">Thêm mới giảng viên</h4>
            {/* Mã sinh viên */}
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label fw-bold">Mã giảng viên:</label>
                <div className="col-sm-8">
                <input type="text" className="form-control" value={magv} onChange={(e) => setMagv(e.target.value)}/>
                </div>
            </div>

            {/* Họ và tên */}
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label fw-bold">Họ và tên:</label>
                <div className="col-sm-8">
                <input type="text" className="form-control" value={hovaten} onChange={(e) => setHovaten(e.target.value)}/>
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label fw-bold">Mật khẩu:</label>
                <div className="col-sm-8">
                <input type="password" className="form-control" value={matkhau} onChange={(e) => setMatkhau(e.target.value)}/>
                </div>
            </div>

            {/* Giới tính */}
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label fw-bold">Giới tính:</label>
                <div className="col-sm-8">
                <select className="form-control" value={gioitinh} onChange={(e) => setGioitinh(e.target.value)}>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                </select>
                </div>
            </div>

            {/* Ngày sinh */}
            <div className="mb-3 row">
            <label className="col-sm-4 col-form-label fw-bold">Ngày sinh:</label>
            <div className="col-sm-8">
                <DatePicker
                dateFormat="dd/MM/yyyy"
                locale={vi}
                className="form-control"
                selected={ngaysinh}
                onChange={(date) => setNgaysinh(date)}
                />
            </div>
            </div>

            {/* Quê quán */}
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label fw-bold">Quê quán:</label>
                <div className="col-sm-8">
                <input type="text" className="form-control" value={quequan} onChange={(e) => setQuequan(e.target.value)}/>
                </div>
            </div>

            {/* Số điện thoại */}
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label fw-bold">Số điện thoại:</label>
                <div className="col-sm-8">
                <input type="text" className="form-control" value={sodt} onChange={(e) => setSodt(e.target.value)}/>
                </div>
            </div>

            {/* Email */}
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label fw-bold">Email:</label>
                <div className="col-sm-8">
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
            </div>

            {/* Khoa */}
            <div className="mb-3 row">
            <label className="col-sm-4 col-form-label fw-bold">Ngành:</label>
            <div className="col-sm-8">
                <select
                    className="form-select"
                    value={khoa}
                    onChange={(e) => setKhoa(e.target.value)}
                >
                <option value="CNTT">CNTT</option>
                <option value="KTKT">KTKT</option>
                <option value="CKOT">CKOT</option>
                <option value="DT">DT</option>
                </select>
            </div>
            </div>

            {/* Buttons */}
            <div className="text-center">
                <button className="btn btn-warning me-3" onClick={handleRefresh}>Làm mới</button>
                <button className="btn btn-primary" onClick={handleAdd}>Thêm mới</button>
            </div>
        </div>
        </div>
    );
}

export default Add_GiangVien;
