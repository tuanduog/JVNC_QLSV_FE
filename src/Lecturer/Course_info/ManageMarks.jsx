import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function ManageMarks() {
    const location = useLocation();
    const dssv = location.state?.dssv;
    const [tensv, setTensv] = useState([]);
    
    const fetchSinhVien = async () => {
        const promises = dssv.sinhviens.map(async (sv) => {
        const masv = sv.masv;

        const res = await axios.get(`http://localhost:8080/auth/get1SinhVien/${masv}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        return res.data;
        });

        const results = await Promise.all(promises);
        setTensv(results);
    }
    useEffect(() => {
        fetchSinhVien();
    },[])
    return (
        <div className="container mt-4">
            <h4 className="mb-3">Quản lý điểm</h4>
            <table className="table table-bordered table-hover text-center">
                <thead className="table-light">
                    <tr>
                        <th>STT</th>
                        <th>Mã sinh viên</th>
                        <th>Họ tên</th>
                        <th>Điểm TX1</th>
                        <th>Điểm TX2</th>
                        <th>Điểm Giữa kỳ</th>
                        <th>Điểm Cuối kỳ</th>
                        <th>Lựa chọn</th>
                    </tr>
                </thead>
                <tbody>
                        {dssv?.sinhviens?.map((sv, index) => (
                            <tr key={sv.masv} style={{fontSize: '14px'}}>
                            <td>{index + 1}</td>
                            <td>{sv.masv}</td>
                            <td>{tensv[index]?.hovaten}</td>
                            <td>{sv.diemtx1}</td>
                            <td>{sv.diemtx2}</td>
                            <td>{sv.diemgk}</td>
                            <td>{sv.diemck}</td>
                            <td><button>Sửa điểm</button></td>
                        </tr>
                        ))}
                </tbody>
            </table>

            
        </div>
    )
}

export default ManageMarks;