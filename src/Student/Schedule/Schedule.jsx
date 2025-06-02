import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Schedule() {
  return (
    <div className="container mt-4">
      <h4 className="mb-3">Thời khóa biểu</h4>
      <table className="table table-bordered text-center align-middle">
        <thead className="table-light">
          <tr>
            <th>Buổi</th>
            <th>Thứ 2</th>
            <th>Thứ 3</th>
            <th>Thứ 4</th>
            <th>Thứ 5</th>
            <th>Thứ 6</th>
            <th>Thứ 7</th>
            <th>Chủ nhật</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: "14px" }}>
          {/* Sáng */}
          <tr>
            <td><strong>Sáng</strong></td>
            <td>
                <div className="p-2 border rounded bg-primary text-white mb-2">
                    <strong>Thiết kế Web</strong><br />
                    HP003<br />
                    Tiết: 7,8,9<br />
                    Phòng: 402-A9
                </div>
                <div className="p-2 border rounded bg-info text-white">
                    <strong>Thiết kế Web</strong><br />
                    HP003<br />
                    Tiết: 7,8,9<br />
                    Phòng: 402-A9
                </div>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          {/* Chiều */}
          <tr>
            <td><strong>Chiều</strong></td>
            <td></td>
            <td>
              <div className="p-2 border rounded bg-info text-white">
                <strong>Thiết kế Web</strong><br />
                HP003<br />
                Tiết: 7,8,9<br />
                Phòng: 402-A9
              </div>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          {/* Tối */}
          <tr>
            <td><strong>Tối</strong></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Schedule;
