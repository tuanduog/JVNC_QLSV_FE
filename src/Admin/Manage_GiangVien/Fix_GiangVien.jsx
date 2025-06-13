import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { vi } from 'date-fns/locale';
import axios from "axios";

function Fix_GiangVien() {
    const location = useLocation();
    const gv = location.state?.gv;
    const [magv, setMagv] = useState("");
    const [hovaten, setHovaten] = useState("");
    const [gioitinh, setGioitinh] = useState("");
    const [ngaysinh, setNgaysinh] = useState("");
    const [quequan, setQuequan] = useState("");
    const [sodt, setSodt] = useState("");
    const [email, setEmail] = useState("");
    const [khoa, setKhoa] = useState("");
    const handleRefresh = () => {
        setMagv("");
        setHovaten("");
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
    const handleUpdate = async () => {
        if(!isValidEmail(email)){
            alert("Email không hợp lệ. Vui lòng nhập đúng định dạng.");
            return;
        }
        const update_gv = {hovaten: hovaten, gioitinh: gioitinh, ngaysinh: ngaysinh, quequan: quequan, sodienthoai: sodt, email: email
            , makhoa: khoa
        };

        await axios.post(`https://api.student-management.io.vn/auth/adm-update-gv/${magv}`, update_gv,
            {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
        )
        alert("Chỉnh sửa giảng viên thành công");
    }
    const fetchSinhVien = () => {
        setMagv(gv.magv);
        setHovaten(gv.hovaten);
        setGioitinh(gv.gioitinh);
        setNgaysinh(gv.ngaysinh);
        setQuequan(gv.quequan);
        setSodt(gv.sodienthoai);
        setEmail(gv.email);
        setKhoa(gv.makhoa);
    }
    useEffect(() => {
        fetchSinhVien();
    },[]);
    return (
        <div className="container mt-3">
        <div className="card shadow rounded p-4">
            <h4 className="mb-4 text-primary">Chỉnh sửa thông tin giảng viên</h4>
            {/* Mã sinh viên */}
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label fw-bold">Mã sinh viên:</label>
                <div className="col-sm-8">
                <input type="text" className="form-control" value={magv} onChange={(e) => setMagv(e.target.value)} readOnly/>
                </div>
            </div>

            {/* Họ và tên */}
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label fw-bold">Họ và tên:</label>
                <div className="col-sm-8">
                <input type="text" className="form-control" value={hovaten} onChange={(e) => setHovaten(e.target.value)}/>
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
                selected={ngaysinh ? new Date(ngaysinh) : null}
                onChange={(date) => {
                    const isoDate = date.toISOString().split('T')[0]; // yyyy-MM-dd
                    setNgaysinh(isoDate);
                }}
                dateFormat="dd/MM/yyyy"
                locale={vi}
                className="form-control"
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
            <label className="col-sm-4 col-form-label fw-bold">Khoa:</label>
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
                <button className="btn btn-primary" onClick={handleUpdate}>Cập nhật</button>
            </div>
        </div>
        </div>
    );
}

export default Fix_GiangVien;
