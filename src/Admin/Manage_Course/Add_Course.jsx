import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function Add_Course() {
    const [mahp, setMahp] = useState("");
    const [tenhp, setTenhp] = useState("");
    const [sotc, setSotc] = useState("");
    const [ngayhoc, setNgayhoc] = useState("");
    const [phonghoc, setPhonghoc] = useState("");
    const [cahoc, setCahoc] = useState("");
    const handleAdd = async () => {
        const parsedSotc = parseInt(sotc);
        if (isNaN(parsedSotc) || parsedSotc <= 0) {
            alert("Số tín chỉ phải là một số nguyên dương!");
            return;
        }
        if(parsedSotc > 10){
            alert("Số tín chỉ tối đa là 10");
            return;
        }
        const new_hp = {mahp: mahp, tenhp: tenhp, sotc: sotc, ngayhoc: ngayhoc, phonghoc: phonghoc, cahoc: cahoc};
        console.log(new_hp);
        try {
            const res = await axios.post("https://api.student-management.io.vn/auth/add-hocphan", new_hp,
                {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
            )
            console.log(res.data);
            alert("Thêm học phần thành công");
        } catch(err){
            alert(err.response?.data);
        }
    }

    const handleRefresh = () => {
        setMahp("");
        setTenhp("");
        setSotc("");
        setNgayhoc("");
        setPhonghoc("");
        setCahoc("");
    }   
    return (
        <div className="container mt-3">
        <div className="card shadow rounded p-4">
            <h4 className="mb-4 text-primary">Thêm học phần mới</h4>
            {/* Mã sinh viên */}
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label fw-bold">Mã học phần:</label>
                <div className="col-sm-8">
                <input type="text" className="form-control" value={mahp} onChange={(e) => setMahp(e.target.value)}/>
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
                <button className="btn btn-primary" onClick={handleAdd}>Cập nhật</button>
            </div>
        </div>
        </div>
    );
}

export default Add_Course;
