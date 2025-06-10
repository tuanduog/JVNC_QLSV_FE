import React, { useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Manage_SinhVien(){
    const [sinhVien, setSinhVien] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 8;
    const navigate = useNavigate();
    const location = useLocation();
    const userInfo = location.state?.userInfo;
    const [selectedValue, setSelectedValue] = useState("all");
    const refSelected = useRef();
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
        const confirmLogout = window.confirm("Bạn có chắc chắn muốn xóa sinh viên này khỏi hệ thống?");
        if (confirmLogout) {
            const res = await axios.post(`https://api.student-management.io.vn/auth/delete-sinhvien/${masv}`,{}, 
            {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
            );
            if(res.data === true){
                alert("Xóa sinh viên thành công");
                fetchSinhVien();
            } else {
                alert("Xóa sinh viên thất bại!");
            }
        } else {
            console.log("Không xóa");
        }
    }   
    const fetchSinhVien = async () => {
        const res = await axios.get("https://api.student-management.io.vn/auth/getall-sinhvien", 
            {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
        )
        setSinhVien(res.data);
        
    }
    useEffect(() => {
        fetchSinhVien();
    },[]);

    const handleChose = () => {
        setSelectedValue(refSelected.current.value);
    }
    const filteredSinhVien = selectedValue === 'all' 
    ? sinhVien 
    : sinhVien.filter((sv) => sv.malop === selectedValue);
    const totalPages = Math.ceil(filteredSinhVien.length / itemPerPage);
    const lastIndex = currentPage * itemPerPage;
    const firstIndex = lastIndex - itemPerPage;
    const currentItem = filteredSinhVien.slice(firstIndex, lastIndex);

    const handlePrev = () => {
        if(currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
    }
    const handleNext = () => {
        if(currentPage < totalPages){
            setCurrentPage(currentPage + 1);
        }
    }
    const handlePageClick = (page) => {
        setCurrentPage(page);
    }
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        if (endPage - startPage < maxVisiblePages - 1) {
            if (startPage === 1) {
                endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
            } else if (endPage === totalPages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }
        }

        if (startPage > 1) {
            pageNumbers.push(
                <li key={1} className="page-item">
                    <button className="page-link" onClick={() => handlePageClick(1)}>1</button>
                </li>
            );
            if (startPage > 2) {
                pageNumbers.push(<li key="start-ellipsis" className="page-item disabled"><span className="page-link">...</span></li>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
                    <button className="page-link" onClick={() => handlePageClick(i)}>{i}</button>
                </li>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push(<li key="end-ellipsis" className="page-item disabled"><span className="page-link">...</span></li>);
            }
            pageNumbers.push(
                <li key={totalPages} className="page-item">
                    <button className="page-link" onClick={() => handlePageClick(totalPages)}>{totalPages}</button>
                </li>
            );
        }

        return pageNumbers;
    };
    return (
        <div className="container">
            <div className="d-flex justify-content-left align-items-center mb-4" style={{ gap: '10px' }}>
            <select
                style={{ width: '100px', height: '31px' }}
                className="ps-1"
                ref={refSelected}
                defaultValue="all"
            >
                <option value="all">Tất cả</option>
                <option value="lp01">lp01</option>
                <option value="lp02">lp02</option>
                <option value="lp03">lp03</option>
                <option value="lp04">lp04</option>
                <option value="lp05">lp05</option>
                <option value="lp06">lp06</option>
            </select>

            <button onClick={handleChose}>
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
                        <th>Ngành</th>
                        <th>Lựa chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItem.map((sv, index) => (
                        <tr key={sv.masv} style={{fontSize: '14px'}}>
                            <td style={{paddingTop: '11px'}}>{index+1}</td>
                            <td style={{paddingTop: '11px'}}>{sv.masv}</td>
                            <td style={{paddingTop: '11px'}}>{sv.hovaten}</td>
                            <td style={{paddingTop: '11px'}}>{sv.gioitinh}</td>
                            <td style={{paddingTop: '11px'}}>{format(new Date(sv.ngaysinh), 'dd/MM/yyyy')}</td>
                            <td style={{paddingTop: '11px'}}>{sv.quequan}</td>
                            <td style={{paddingTop: '11px'}}>{sv.sodienthoai}</td>
                            <td style={{paddingTop: '11px'}}>{sv.email}</td>
                            <td style={{paddingTop: '11px'}}>{sv.malop}</td>
                            <td style={{paddingTop: '11px'}}>{sv.manganh}</td>
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

            <nav className="d-flex justify-content-center">
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={handlePrev}>Trước</button>
                    </li>

                    {renderPageNumbers()}

                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button className="page-link" onClick={handleNext}>Sau</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Manage_SinhVien;