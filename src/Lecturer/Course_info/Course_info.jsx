import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Course_info(){
    const location = useLocation();
    const userInfo = location.state?.userInfo;
    const magv = userInfo.sub;
    const [hocPhan, setHocPhan] = useState([]);
    const [dssv, setDssv] = useState([]);
    const navigate = useNavigate();

    const handleQLDiem = (dssv) => {
        navigate("/Home_Lecturer/Marks", {state: {
            userInfo,
            dssv: dssv
        }})
    }

    const fetchHPAndSV = async () => {
    try {
        const res1 = await axios.get(`https://api.student-management.io.vn/auth/getAll-hocphan/${magv}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setHocPhan(res1.data);
        const promises = res1.data.map(async (hp) => {
            const mahp = hp.hocPhan.mahp;
            const res2 = await axios.get(`https://api.student-management.io.vn/auth/get-sinhvien-in-hocphan/${mahp}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            return {
                mahp: mahp,
                sinhviens: res2.data,
                soluong: res2.data.length
            };
        });

        const results = await Promise.all(promises);
        setDssv(results);

    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu học phần hoặc sinh viên:", error);
    }
    };

    useEffect(() => {
    fetchHPAndSV();
    }, []);
    return (
        <div className="container mt-4">
            <h4 className="mb-3">Học phần giảng dạy</h4>
            <table className="table table-bordered table-hover text-center">
                <thead className="table-light">
                    <tr>
                        <th>Tên học phần</th>
                        <th>Mã học phần</th>
                        <th>Số tín chỉ</th>
                        <th>Số lượng sinh viên</th>
                        <th>Lựa chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {hocPhan.map((hp, index) => (
                        <tr key={hp.mahppt || index} style={{fontSize: '14px'}}>
                            <td>{hp.hocPhan.tenhp}</td>
                            <td>{hp.hocPhan.mahp}</td>
                            <td>{hp.hocPhan.sotc}</td>
                            <td>{dssv[index]?.soluong || 0}</td>
                            <td><button
                            onClick={() => handleQLDiem(dssv[index])}>Quản lý điểm</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            
        </div>
    )
}

export default Course_info;