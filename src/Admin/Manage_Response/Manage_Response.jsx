import React from "react";

function Manage_Response(){
    return (
        <div className="container mt-4">
            <h4 className="mb-3">Danh sách sinh viên</h4>
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
                    <th>Gmail</th>
                    <th>Mật khẩu</th>
                    <th>Lớp</th>
                    <th>Khoa</th>
                    <th>Lựa chọn</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>â</td>
                    <td>â</td>
                    <td>â</td>
                    <td>â</td>
                    <td>â</td>
                    <td>â</td>
                    <td>â</td>
                    <td>â</td>
                    <td>â</td>
                    <td>â</td>
                    <td>â</td>
                    <td>
                        <button className="btn btn-danger btn-sm me-2">Xóa</button>
                        <button className="btn btn-warning btn-sm">Sửa</button>
                    </td>
                    </tr>
                </tbody>
            </table>

            <div className="text-center my-4">
                <button className="btn btn-danger px-4">Thêm sinh viên mới</button>
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

export default Manage_Response;