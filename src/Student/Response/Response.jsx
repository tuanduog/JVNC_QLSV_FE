import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Response = () => {
    return (
        <div className="container mt-4">
            <h4 className="mb-3">Phản hồi</h4>
            <div className="form-group" >
                <textarea className="form-control p-3 fs-6" placeholder="Viết phản hồi của bạn về hệ thống ..." rows="6"></textarea>
                <div className="text-end mt-3">
                    <button className="btn btn-primary">Gửi phản hồi</button>
                </div>
            </div>
        </div>
    )
}

export default Response;