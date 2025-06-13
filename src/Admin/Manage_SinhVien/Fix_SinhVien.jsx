import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { vi } from 'date-fns/locale';
import axios from "axios";

function Fix_SinhVien() {
    const location = useLocation();
    const sv = location.state?.sv;
    const [masv, setMasv] = useState("");
    const [hovaten, setHovaten] = useState("");
    const [gioitinh, setGioitinh] = useState("");
    const [ngaysinh, setNgaysinh] = useState("");
    const [quequan, setQuequan] = useState("");
    const [sodt, setSodt] = useState("");
    const [email, setEmail] = useState("");
    const [lop, setLop] = useState("");
    const [nganh, setNganh] = useState("");
    console.log(sv.ngaysinh);
    const handleRefresh = () => {
        setMasv("");
        setHovaten("");
        setGioitinh("");
        setNgaysinh("");
        setQuequan("");
        setSodt("");
        setEmail("");
        setLop("");
        setNganh("");
    }
    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    const handleUpdate = async () => {
        if(!isValidEmail(email)){
            alert("Email không hợp lệ. Vui lòng nhập đúng định dạng.");
            return;
        }
        const update_sv = {hovaten: hovaten, gioitinh: gioitinh, ngaysinh: ngaysinh, quequan: quequan, sodienthoai: sodt, email: email
            , malop: lop, manganh: nganh
        };

        const res = await axios.post(`https://api.student-management.io.vn/auth/adm-update-sv/${masv}`, update_sv,
            {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
        )
        console.log(res.data);
        alert("Chỉnh sửa sinh viên thành công");
    }
    const fetchSinhVien = () => {
        setMasv(sv.masv);
        setHovaten(sv.hovaten);
        setGioitinh(sv.gioitinh);
        setNgaysinh(sv.ngaysinh);
        setQuequan(sv.quequan);
        setSodt(sv.sodienthoai);
        setEmail(sv.email);
        setLop(sv.malop);
        setNganh(sv.manganh);
    }
    useEffect(() => {
        fetchSinhVien();
    },[]);
    return (
        <div className="container mt-3">
        <div className="card shadow rounded p-4">
            <h4 className="mb-4 text-primary">Chỉnh sửa thông tin sinh viên</h4>
            {/* Mã sinh viên */}
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label fw-bold">Mã sinh viên:</label>
                <div className="col-sm-8">
                <input type="text" className="form-control" value={masv} onChange={(e) => setMasv(e.target.value)} readOnly/>
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

            {/* Lớp */}
            <div className="mb-3 row">
            <label className="col-sm-4 col-form-label fw-bold">Lớp:</label>
            <div className="col-sm-8">
                <select
                    className="form-select"
                    value={lop}
                    style={{fontSize: '13px'}}
                    onChange={(e) => setLop(e.target.value)}
                >
                <option value="lp01">lp01</option>
                <option value="lp02">lp02</option>
                <option value="lp03">lp03</option>
                <option value="lp04">lp04</option>
                <option value="lp05">lp05</option>
                </select>
            </div>
            </div>

            {/* Ngành */}
            <div className="mb-3 row">
            <label className="col-sm-4 col-form-label fw-bold">Ngành:</label>
            <div className="col-sm-8">
                <select
                    className="form-select"
                    style={{fontSize: '13px'}}
                    value={nganh}
                    onChange={(e) => setNganh(e.target.value)}
                >
                <option value="CNTT">CNTT</option>
                <option value="KHMT">KHMT</option>
                <option value="HTTT">HTTT</option>
                <option value="KTPM">KTPM</option>
                <option value="ATTT">ATTT</option>
                <option value="CNDPT">CNDPT</option>
                <option value="KT">KT</option>
                <option value="TCDN">TCDN</option>
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

export default Fix_SinhVien;
