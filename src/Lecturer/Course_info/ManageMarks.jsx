import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

function ManageMarks() {
    const location = useLocation();
    const dssv = location.state?.dssv;
    const mahp = dssv?.mahp;
    const [dssvState, setDssvState] = useState(dssv);
    const [tensv, setTensv] = useState([]);
    const [show, setShow] =  useState(false);
    const [masv, setMasv] = useState("");
    const [hoten, setHoten] = useState("");
    const [diemtx1, setDiemtx1] = useState("");
    const [diemtx2, setDiemtx2] = useState("");
    const [diemgk, setDiemgk] = useState("");
    const [diemck, setDiemck] = useState("");
    const [madhp, setMadhp] = useState("");

    const handlePopup = (sv, hoten) => {
        setShow(true);
        setMasv(sv.masv);
        setHoten(hoten);
        setDiemtx1(sv.diemtx1);
        setDiemtx2(sv.diemtx2);
        setDiemgk(sv.diemgk);
        setDiemck(sv.diemck);
        setMadhp(sv.madhp);
    }
    const handleClose = () => {
        setShow(false);
    }

    const handleUpdate = async () => {
        if(diemtx1 < 0 || diemtx1 > 10){
            alert("Điểm tx1 phải nằm trong khoảng [0, 10]");
            return;
        }
        if(diemtx2 < 0 || diemtx2 > 10){
            alert("Điểm tx2 phải nằm trong khoảng [0, 10]");
            return;
        }
        if(diemgk < 0 || diemgk > 10){
            alert("Điểm gk phải nằm trong khoảng [0, 10]");
            return;
        }
        if(diemck < 0 || diemck > 10){
            alert("Điểm ck phải nằm trong khoảng [0, 10]");
            return;
        }
        try {
            const new_diem = {diemtx1: diemtx1, diemtx2: diemtx2, diemgk: diemgk, diemck: diemck};
            await axios.put(`https://api.student-management.io.vn/auth/update-diem/${madhp}`, new_diem,
                {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
            )
            alert("Sửa điểm thành công");
            const res = await axios.get(`https://api.student-management.io.vn/auth/get-sinhvien-in-hocphan/${mahp}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setDssvState({ sinhviens: res.data });
            setShow(false);
        } catch(err){
            console.error(err);
        }
    }
    const fetchSinhVien = async () => {
        const promises = dssvState.sinhviens.map(async (sv) => {
        const masv = sv.masv;

        const res = await axios.get(`https://api.student-management.io.vn/auth/get1SinhVien/${masv}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        return res.data;
        });

        const results = await Promise.all(promises);
        setTensv(results);
    }
    useEffect(() => {
        fetchSinhVien();
    },[])
    return (
        <div className="container mt-4">
            <h4 className="mb-3">Quản lý điểm</h4>
            <table className="table table-bordered table-hover text-center">
                <thead className="table-light">
                    <tr>
                        <th>STT</th>
                        <th>Mã sinh viên</th>
                        <th>Họ và tên</th>
                        <th>Điểm TX1</th>
                        <th>Điểm TX2</th>
                        <th>Điểm Giữa kỳ</th>
                        <th>Điểm Cuối kỳ</th>
                        <th>Lựa chọn</th>
                    </tr>
                </thead>
                <tbody>
                        {dssvState?.sinhviens?.map((sv, index) => (
                            <tr key={sv.masv} style={{fontSize: '14px'}}>
                            <td>{index + 1}</td>
                            <td>{sv.masv}</td>
                            <td>{tensv[index]?.hovaten}</td>
                            <td>{sv.diemtx1}</td>
                            <td>{sv.diemtx2}</td>
                            <td>{sv.diemgk}</td>
                            <td>{sv.diemck}</td>
                            <td><button onClick={() => handlePopup(sv, tensv[index]?.hovaten)}>Sửa điểm</button></td>
                        </tr>
                        ))}
                </tbody>
            </table>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Sửa điểm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <p className="col-4">Masv: {masv}</p>
                        <p className="col-8">Họ và tên: {hoten}</p>
                    </div>
                        <div className="row mb-3">
                            <div className="col-4">
                                <label>Điểm TX1: </label>
                            </div>
                            <div className="col-7">
                                <input type="number" min="0" max="10" step="0.1" className="form-control" id="website" placeholder=""
                                    value={diemtx1} onChange={(e) => setDiemtx1(e.target.value)}/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-4">
                                <label>Điểm TX2: </label>
                            </div>
                            <div className="col-7">
                                <input type="number" min="0" max="10" step="0.1" className="form-control" id="website" placeholder=""
                                    value={diemtx2} onChange={(e) => setDiemtx2(e.target.value)}/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-4">
                                <label>Điểm giữa kỳ: </label>
                            </div>
                            <div className="col-7">
                                <input type="number" min="0" max="10" step="0.1" className="form-control" id="website" placeholder=""
                                    value={diemgk} onChange={(e) => setDiemgk(e.target.value)}/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-4">
                                <label>Điểm cuối kỳ: </label>
                            </div>
                            <div className="col-7">
                                <input type="number" min="0" max="10" step="0.1" className="form-control" id="website" placeholder=""
                                    value={diemck} onChange={(e) => setDiemck(e.target.value)}/>
                            </div>
                        </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleUpdate}>
                        Xác nhận
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
            
        </div>
    )
}

export default ManageMarks;