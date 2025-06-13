import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function Fix_Course() {
    const location = useLocation();
    const hp = location.state?.hp;
    const [mahp, setMahp] = useState("");
    const [tenhp, setTenhp] = useState("");
    const [sotc, setSotc] = useState("");
    const [ngayhoc, setNgayhoc] = useState("");
    const [phonghoc, setPhonghoc] = useState("");
    const [cahoc, setCahoc] = useState("");

    const handleRefresh = () => {
        setMahp("");
        setTenhp("");
        setSotc("");
        setNgayhoc("");
        setPhonghoc("");
        setCahoc("");
    }

    const handleUpdate = async () => {
        const parsedSotc = parseInt(sotc);
        if(isNaN(parsedSotc) || sotc <= 0){
            alert("Số tín chỉ phải là số nguyên dương");
            return;
        }
        if(parsedSotc > 10){
            alert("Số tín chỉ tối đa là 10");
            return;
        }
        const new_hp = {tenhp: tenhp, sotc: sotc, ngayhoc: ngayhoc, phonghoc: phonghoc, cahoc: cahoc};
        const res = await axios.post(`https://api.student-management.io.vn/auth/adm-update-hp/${mahp}`, new_hp,
            {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
        )
        console.log(res.data);
        alert("Chỉnh sửa học phần thành công");
    }

    const fetchHocphan = () => {
        setMahp(hp.mahp);
        setTenhp(hp.tenhp);
        setSotc(hp.sotc);
        setPhonghoc(hp.phonghoc);
        setNgayhoc(hp.ngayhoc);
        setCahoc(hp.cahoc);
    }

    useEffect(() => {
        fetchHocphan();
    },[]);
    return (
        <div className="container mt-3">
        <div className="card shadow rounded p-4">
            <h4 className="mb-4 text-primary">Chỉnh sửa thông tin học phần</h4>
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label fw-bold">Mã học phần:</label>
                <div className="col-sm-8">
                <input type="text" className="form-control" value={mahp} onChange={(e) => setMahp(e.target.value)} readOnly/>
                </div>
            </div>

            {/* Họ và tên */}
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label fw-bold">Tên học phần:</label>
                <div className="col-sm-8">
                <input type="text" className="form-control" value={tenhp} onChange={(e) => setTenhp(e.target.value)}/>
                </div>
            </div>

            {/* Giới tính */}
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label fw-bold">Số tín chỉ:</label>
                <div className="col-sm-8">
                <input type="text" className="form-control" value={sotc} onChange={(e) => setSotc(e.target.value)}/>
                </div>
            </div>

            {/* Quê quán */}
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label fw-bold">Ngày học:</label>
                <div className="col-sm-8">
                <input type="text" className="form-control" value={ngayhoc} onChange={(e) => setNgayhoc(e.target.value)}/>
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label fw-bold">Phòng học:</label>
                <div className="col-sm-8">
                <input type="text" className="form-control" value={phonghoc} onChange={(e) => setPhonghoc(e.target.value)}/>
                </div>
            </div>

            {/* Số điện thoại */}
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label fw-bold">Ca học:</label>
                <div className="col-sm-8">
                <input type="text" className="form-control" value={cahoc} onChange={(e) => setCahoc(e.target.value)}/>
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

export default Fix_Course;
