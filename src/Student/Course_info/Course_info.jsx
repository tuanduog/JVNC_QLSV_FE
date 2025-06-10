import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Course_info(){
    const [hocPhan, setHocPhan] = useState([]);
    const location = useLocation();
    const userInfo = location.state?.userInfo;
    const masv = userInfo.sub;
    const fetchDiem = async () => {
        const res = await axios.get(`https://api.student-management.io.vn/auth/getAll-diemhocphan/${masv}`, 
            {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
        );
        setHocPhan(res.data);
    }
    useEffect(() => {
        fetchDiem();
    },[]);
    return (
        <div className="container mt-4">
            <h4 className="mb-3">Thông tin học phần</h4>
            <table className="table table-bordered table-hover text-center">
                <thead className="table-light">
                    <tr>
                        <th>Tên học phần</th>
                        <th>Mã học phần</th>
                        <th>Số tín chỉ</th>
                        <th>Điểm tx1</th>
                        <th>Điểm tx2</th>
                        <th>Điểm giữa kỳ</th>
                        <th>Điểm thi</th>
                    </tr>
                </thead>
                <tbody>
                    {hocPhan.map((hp) => (
                        <tr key={hp.madhp} style={{fontSize: '14px', cursor: 'pointer'}}>
                            <td>{hp.hocPhan.tenhp}</td>
                            <td>{hp.hocPhan.mahp}</td>
                            <td>{hp.hocPhan.sotc}</td>
                            <td>{hp.diemtx1}</td>
                            <td>{hp.diemtx2}</td>
                            <td>{hp.diemgk}</td>
                            <td>{hp.diemck}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            
        </div>
    )
}

export default Course_info;