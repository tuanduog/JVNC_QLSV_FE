import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

const Response = () => {
    const [phanhoi, setPhanhoi] = useState("");

    const handlePost = async () => {
        const res = await axios.post("https://api.student-management.io.vn/auth/add-phanhoi", {noidung: phanhoi}, 
            {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
        );
        console.log(res.data);
        alert("Gửi phàn hồi thành công");
    }
    return (
        <div className="container mt-4">
            <h4 className="mb-3">Phản hồi</h4>
            <div className="form-group" >
                <textarea className="form-control p-3 fs-6" placeholder="Viết phản hồi của bạn về hệ thống ..." rows="6"
                value={phanhoi} onChange={(e) => setPhanhoi(e.target.value)}></textarea>
                <div className="text-end mt-3">
                    <button className="btn btn-primary" onClick={handlePost}>Gửi phản hồi</button>
                </div>
            </div>
        </div>
    )
}

export default Response;