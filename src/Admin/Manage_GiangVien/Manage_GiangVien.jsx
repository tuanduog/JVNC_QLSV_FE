import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Manage_GiangVien(){
    const [giangvien, setGiangVien] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const userInfo = location.state?.userInfo;
    const handleDelete = async (magv) => {
        const res = await axios.post(`http://localhost:8080/auth/delete-giangvien/${magv}`, {},
            {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
        );
        if(res){
            alert("Xóa giảng viên thành công!");
            fetchGiangVien();
        } else {
            alert("Xóa sinh viên thất bại!");
        }
    }

    const handleAdd = async () => {
        navigate('/Home_Admin/Add_GiangVien', {state: {userInfo: userInfo}});
        fetchGiangVien();
    }

    const handleFix = async (gv) => {
        navigate('/Home_Admin/Fix_GiangVien', {state: {
            gv: gv,
            userInfo: userInfo}});
        fetchGiangVien();
    }

    const fetchGiangVien = async () => {
        const res = await axios.get("http://localhost:8080/auth/getall-giangvien", 
            {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
        )
        setGiangVien(res.data);
    }
    useEffect(() => {
        fetchGiangVien();
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
                        <th>Mã giảng viên</th>
                        <th>Họ và tên</th>
                        <th>Giới tính</th>
                        <th>Ngày sinh</th>
                        <th>Quê quán</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Khoa</th>
                        <th>Lựa chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {giangvien.map((gv, index) => (
                        <tr key={gv.magv}  style={{fontSize: '14px'}}>
                        <td style={{paddingTop: '11px'}}>{index + 1}</td>
                        <td style={{paddingTop: '11px'}}>{gv.magv}</td>
                        <td style={{paddingTop: '11px'}}>{gv.hovaten}</td>
                        <td style={{paddingTop: '11px'}}>{gv.gioitinh}</td>
                        <td style={{paddingTop: '11px'}}>{format(new Date(gv.ngaysinh), 'dd/MM/yyyy')}</td>
                        <td style={{paddingTop: '11px'}}>{gv.quequan}</td>
                        <td style={{paddingTop: '11px'}}>{gv.sodienthoai}</td>
                        <td style={{paddingTop: '11px'}}>{gv.email}</td>
                        <td></td>
                        <td>
                            <button className="btn btn-warning btn-sm me-2" onClick={() => handleFix(gv)}>Sửa</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(gv.magv)}>Xóa</button>
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

export default Manage_GiangVien;