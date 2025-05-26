import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

function Manage_Response(){
    const [phanhoi, setPhanhoi] = useState([]);
    const handleCheck = async (ph) => {
        const newStatus = ph.trangthai === "Chưa duyệt" ? "Đã duyệt" : "Chưa duyệt";
        const res = await axios.put(`http://localhost:8080/auth/check-phanhoi/${ph.maph}`, 
            {trangthai: newStatus},
            {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
        )
        console.log(res);
        fetchPhanhoi();
    }

    const handleDelete = async (maph) => {
        try {
            const res = await axios.post(`http://localhost:8080/auth/delete-phanhoi/${maph}`, {},
            {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
            )
            alert(res.data);
            fetchPhanhoi();
        } catch (error) {
            alert(error.res.data);
        }
    }
    const fetchPhanhoi = async () => {
        const res = await axios.get("http://localhost:8080/auth/get-phanhoi", 
            {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
        )
        setPhanhoi(res.data);
    }

    useEffect(() => {
        fetchPhanhoi();
    },[]);
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
                    {phanhoi.map((ph) => (
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

export default Manage_Response;