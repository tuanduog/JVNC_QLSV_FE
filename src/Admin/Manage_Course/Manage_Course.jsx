import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Manage_Course(){
    const [hocphan, setHocphan] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 8;
    const navigate = useNavigate();
    const location = useLocation();
    const userInfo = location.state?.userInfo;
    const handleDelete = async (mahp) => {
        const confirmLogout = window.confirm("Bạn có chắc chắn muốn xóa học phần này khỏi hệ thống?");
        if (confirmLogout) {
            try {
                const res = await axios.post(`https://api.student-management.io.vn/auth/delete-hocphan/${mahp}`, {},
                {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
                )
                alert(res.data);
                fetchHocphan();
            } catch (error) {
                alert(error.res.data);
            }
        } else {
            console.log("Không xóa");
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
        const res = await axios.get("https://api.student-management.io.vn/auth/getall-hocphan", 
            {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
        )
        console.log(res.data);
        setHocphan(res.data);
    }

    useEffect(() => {
        fetchHocphan();
    }, []);

    // logic chuyển trang
    const totalPages = Math.ceil(hocphan.length / itemPerPage);
    const lastIndex = currentPage * itemPerPage;
    const firstIndex = lastIndex - itemPerPage;
    const currentItem = hocphan.slice(firstIndex, lastIndex);

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
        <div className="container mt-3">
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
                    {currentItem.map((hp, index) => (
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

export default Manage_Course;