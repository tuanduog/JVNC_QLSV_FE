import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from "react-router-dom";
import axios from "axios";

function Schedule() {
    const location = useLocation();
    const userInfo = location.state?.userInfo;
    const masv = userInfo.sub;
    const [hocPhan, setHocPhan] = useState([]);

    const splitBuoi = (cahoc) => {
        const tiet = parseInt(cahoc.split(",")[0], 10);
        if(tiet >= 1 && tiet <= 5) return "Sáng";
        if(tiet >= 7 && tiet <= 11) return "Chiều";
        if(tiet >= 13 && tiet <= 16) return "Tối";
    }

    const fetchTKB = async () => {
        const res = await axios.get(`https://api.student-management.io.vn/auth/getAll-thoikhoabieu/${masv}`,
            {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
        )
        const hocPhanList = res.data.map(item => item.hocPhan);
        setHocPhan(hocPhanList);
        console.log(hocPhanList);
        // chia ngay hoc
        // ca hoc
    }
    
    const renderTKB = (buoi, thu) => {
        return hocPhan.filter(hp => splitBuoi(hp.cahoc) === buoi && hp.ngayhoc === thu)
        .map((hp, index) => (
            <div
                key={index}
                className={`p-2 border rounded bg-info text-white mb-2`}
            >
                <strong>{hp.tenhp}</strong><br />
                {hp.mahp}<br />
                Tiết: {hp.cahoc}<br />
                Phòng: {hp.phonghoc}
            </div>
        ))
    }

    useEffect(() => {
        fetchTKB();
    },[]);
    return (
        <div className="container mt-4">
        <h4 className="mb-3">Thời khóa biểu</h4>
        <table className="table table-bordered text-center align-middle">
            <thead className="table-light">
            <tr>
                <th>Buổi</th>
                <th>Thứ 2</th>
                <th>Thứ 3</th>
                <th>Thứ 4</th>
                <th>Thứ 5</th>
                <th>Thứ 6</th>
                <th>Thứ 7</th>
                <th>Chủ nhật</th>
            </tr>
            </thead>
            <tbody style={{ fontSize: "14px" }}>
                {["Sáng", "Chiều", "Tối"].map((buoi) => (
                    <tr key={buoi}>
                        <td><strong>{buoi}</strong></td>
                        {["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"].map((thu) => (
                            <td key={thu}>{renderTKB(buoi, thu)}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
}

export default Schedule;
