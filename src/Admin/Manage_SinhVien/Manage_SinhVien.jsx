import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Manage_SinhVien(){
    const [sinhVien, setSinhVien] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const userInfo = location.state?.userInfo;
    const handleFix = (sv) => {
        navigate("/Home_Admin/Fix_SinhVien", {
            state: {
                sv: sv,
                userInfo: userInfo
            }
        });
    }
    const handleAdd = () => {
        navigate("/Home_Admin/Add_SinhVien", {
            state: { userInfo: userInfo}
        });
        fetchSinhVien();
    }
    const handleDelete = async (masv) => {
        const res = await axios.post(`http://localhost:8080/auth/delete-sinhvien/${masv}`,{}, 
            {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
        );
        if(res.data === true){
            alert("Xóa sinh viên thành công");
            fetchSinhVien();
        } else {
            alert("Xóa sinh viên thất bại!");
        }
    }   
    const fetchSinhVien = async () => {
        const res = await axios.get("http://localhost:8080/auth/getall-sinhvien", 
            {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
        )
        setSinhVien(res.data);
        
    }
    useEffect(() => {
        fetchSinhVien();
    },[]);
    return (
        <div className="container">
            <div className="d-flex justify-content-left align-items-center mb-4" style={{ gap: '10px' }}>
            <select
                style={{ width: '100px', height: '31px' }}
                className="ps-1"
            >
                <option value="DL01">DL01</option>
                <option value="DL02">DL02</option>
            </select>

            <button>
                Lọc theo lớp
            </button>
            </div>
            <table className="table table-bordered table-hover text-center">
                <thead className="table-light">
                    <tr>
                        <th>STT</th>
                        <th>Mã sinh viên</th>
                        <th>Họ và tên</th>
                        <th>Giới tính</th>
                        <th>Ngày sinh</th>
                        <th>Quê quán</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Lớp</th>
                        <th>Khoa</th>
                        <th>Lựa chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {sinhVien.map((sv, index) => (
                        <tr key={sv.masv} style={{fontSize: '14px'}}>
                            <td style={{paddingTop: '11px'}}>{index+1}</td>
                            <td style={{paddingTop: '11px'}}>{sv.masv}</td>
                            <td style={{paddingTop: '11px'}}>{sv.hovaten}</td>
                            <td style={{paddingTop: '11px'}}>{sv.gioitinh}</td>
                            <td style={{paddingTop: '11px'}}>{format(new Date(sv.ngaysinh), 'dd/MM/yyyy')}</td>
                            <td style={{paddingTop: '11px'}}>{sv.quequan}</td>
                            <td style={{paddingTop: '11px'}}>{sv.sodienthoai}</td>
                            <td style={{paddingTop: '11px'}}>{sv.email}</td>
                            <td style={{paddingTop: '11px'}}>{sv.lop}</td>
                            <td style={{paddingTop: '11px'}}>{sv.khoa}</td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2" onClick={() => handleFix(sv)}>Sửa</button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(sv.masv)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="text-center my-4">
                <button className="btn btn-primary px-4" style={{width: '500px'}} onClick={handleAdd}>Thêm sinh viên mới</button>
            </div>
        </div>
    )
}

export default Manage_SinhVien;