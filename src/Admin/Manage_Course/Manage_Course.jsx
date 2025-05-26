import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Manage_Course(){
    const [hocphan, setHocphan] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const userInfo = location.state?.userInfo;
    const handleDelete = async (mahp) => {
        try {
            const res = await axios.post(`http://localhost:8080/auth/delete-hocphan/${mahp}`, {},
            {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
            )
            alert(res.data);
            fetchHocphan();
        } catch (error) {
            alert(error.res.data);
        }
    }
    const handleFix = async (hp) => {
        navigate("/Home_Admin/Fix_Course",
            {state: 
                {
                    hp: hp,
                    userInfo: userInfo
                }
            }
        )
    }

    const handleAdd = async () => {
        navigate("/Home_Admin/Add_Course",
            {state: {userInfo: userInfo}}
        )
    }

    const fetchHocphan = async () => {
        const res = await axios.get("http://localhost:8080/auth/getall-hocphan", 
            {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
        )
        console.log(res.data);
        setHocphan(res.data);
    }

    useEffect(() => {
        fetchHocphan();
    }, []);
    return (
        <div className="container mt-4">
            <h4 className="mb-3">Danh sách học phần</h4>
            <table className="table table-bordered table-hover text-center">
                <thead className="table-light">
                    <tr>
                        <th>STT</th>
                        <th>Mã học phần</th>
                        <th>Tên học phần</th>
                        <th>Số tín chỉ</th>
                        <th>Ngày học</th>
                        <th>Phòng học</th>
                        <th>Ca học</th>
                        <th>Lựa chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {hocphan.map((hp, index) => (
                        <tr key={hp.mahp} style={{fontSize: '14px'}}>
                            <td style={{paddingTop: '11px'}}>{index + 1}</td>
                            <td style={{paddingTop: '11px'}}>{hp.mahp}</td>
                            <td style={{paddingTop: '11px'}}>{hp.tenhp}</td>
                            <td style={{paddingTop: '11px'}}>{hp.sotc}</td>
                            <td style={{paddingTop: '11px'}}>{hp.ngayhoc}</td>
                            <td style={{paddingTop: '11px'}}>{hp.phonghoc}</td>
                            <td style={{paddingTop: '11px'}}>{hp.cahoc}</td>
                            <td>
                                <button className={`btn btn-warning btn-sm me-2`} onClick={() => handleFix(hp)}>Sửa</button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(hp.mahp)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="text-center my-4">
                <button className="btn btn-primary px-4" style={{width: '500px'}} onClick={handleAdd}>Thêm học phần mới</button>
            </div>
            <nav className="d-flex justify-content-center">
                <ul className="pagination">
                <li className="page-item disabled">
                    <button className="page-link">Trước</button>
                </li>
                    
                <li className="page-item">
                    <button className="page-link">Sau</button>
                </li>
                </ul>
            </nav>
        </div>
    )
}

export default Manage_Course;