import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

function Manage_Response(){
    const [phanhoi, setPhanhoi] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 8;
    const handleCheck = async (ph) => {
        const newStatus = ph.trangthai === "Chưa duyệt" ? "Đã duyệt" : "Chưa duyệt";
        const res = await axios.put(`https://api.student-management.io.vn/auth/check-phanhoi/${ph.maph}`, 
            {trangthai: newStatus},
            {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
        )
        console.log(res);
        fetchPhanhoi();
    }

    const handleDelete = async (maph) => {
        const confirmLogout = window.confirm("Bạn có chắc chắn muốn xóa phản hồi này khỏi hệ thống?");
        if (confirmLogout) {
            try {
                const res = await axios.post(`https://api.student-management.io.vn/auth/delete-phanhoi/${maph}`, {},
                {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
                )
                alert(res.data);
                fetchPhanhoi();
            } catch (error) {
                alert(error.res.data);
            }
        } else {
            console.log("Không xóa");
        }
    }
    const fetchPhanhoi = async () => {
        const res = await axios.get("https://api.student-management.io.vn/auth/get-phanhoi", 
            {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
        )
        setPhanhoi(res.data);
    }

    useEffect(() => {
        fetchPhanhoi();
    },[]);

    const totalPages = Math.ceil(phanhoi.length / itemPerPage);
    const lastIndex = currentPage * itemPerPage;
    const firstIndex = lastIndex - itemPerPage;
    const currentItem = phanhoi.slice(firstIndex, lastIndex);
    
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
        <div className="container mt-4">
            <h4 className="mb-3">Danh sách phản hồi</h4>
            <table className="table table-bordered table-hover text-center">
                <thead className="table-light">
                    <tr>
                        <th>Mã phản hồi</th>
                        <th>Nội dung</th>
                        <th>Trạng thái</th>
                        <th>Lựa chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItem.map((ph) => (
                        <tr key={ph.maph} style={{fontSize: '14px'}}>
                            <td style={{paddingTop: '11px'}}>{ph.maph}</td>
                            <td style={{paddingTop: '11px'}}>{ph.noidung}</td>
                            <td style={{paddingTop: '11px', fontWeight: 'bold', color: ph.trangthai === "Chưa duyệt" ? 'red' : 'green'}}>
                                {ph.trangthai}</td>
                            <td>
                                <button className={`btn ${ph.trangthai === "Chưa duyệt" ? "btn-primary" : "btn-secondary"} btn-sm me-2`} onClick={() => handleCheck(ph)}>{ph.trangthai === "Chưa duyệt" ? "Duyệt" : "Bỏ duyệt"}</button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(ph.maph)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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

export default Manage_Response;