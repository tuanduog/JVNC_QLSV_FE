import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from "react-router-dom";


function Fix_Course() {
    const location = useLocation();
    const hp = location.state?.hp;
   
    return (
        <div className="container mt-3">
        <div className="card shadow rounded p-4">
            <h4 className="mb-4 text-primary">Chỉnh sửa thông tin học phần</h4>
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label fw-bold">Mã học phần:</label>
                <div className="col-sm-8">
                <input type="text" className="form-control" />
                </div>
            </div>

            {/* Họ và tên */}
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label fw-bold">Tên học phần:</label>
                <div className="col-sm-8">
                <input type="text" className="form-control" />
                </div>
            </div>

            {/* Giới tính */}
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label fw-bold">Số tín chỉ:</label>
                <div className="col-sm-8">
                <input type="text" className="form-control" />
                </div>
            </div>

            {/* Quê quán */}
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label fw-bold">Ngày học:</label>
                <div className="col-sm-8">
                <input type="text" className="form-control" />
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label fw-bold">Phòng học:</label>
                <div className="col-sm-8">
                <input type="text" className="form-control" />
                </div>
            </div>

            {/* Số điện thoại */}
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label fw-bold">Ca học:</label>
                <div className="col-sm-8">
                <input type="text" className="form-control" />
                </div>
            </div>

            {/* Buttons */}
            <div className="text-center">
                <button className="btn btn-warning me-3" >Làm mới</button>
                <button className="btn btn-primary">Cập nhật</button>
            </div>
        </div>
        </div>
    );
}

export default Fix_Course;
