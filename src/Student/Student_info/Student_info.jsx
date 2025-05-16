import React from "react";
import '../Student_info/Student_info.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Student_info = () => {
    return (
        <div className="body">
            <div className="container">
            <div className="row gutters">
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                <div className="card h-100">
                    <div className="card-body">
                    <div className="account-settings">
                        <div className="user-profile">
                        <div className="user-avatar">
                            <i class="fa-solid fa-user fa-5x"></i>
                        </div>
                        <h5 className="user-name">Yuki Hayashi</h5>
                        <h6 className="user-email">yuki@Maxwell.com</h6>
                        </div>
                        <div className="about">
                            <p>Mã sinh viên: </p>
                            <p>Lớp: </p>
                            <p>Khoa: </p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                <div className="card h-100" style={{paddingTop: '7px'}}>
                    <div className="card-body">
                    <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 className="mb-3 text-primary">Thông tin cá nhân</h6>
                        </div>
                        <hr></hr>
                        <div className="row mb-3 align-items-center" style={{width: '100%'}}>
                            <div className="col-5">
                                <label>Giới tính: </label>
                            </div>
                            <div className="col-7">
                                <p className="mb-0">Nam</p>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row mb-3 align-items-center" style={{width: '100%'}}>
                            <div className="col-5">
                                <label>Giới tính: </label>
                            </div>
                            <div className="col-7">
                                <p className="mb-0">Nam</p>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row mb-3 align-items-center" style={{width: '100%'}}>
                            <div className="col-5">
                                <label>Giới tính: </label>
                            </div>
                            <div className="col-7">
                                <p className="mb-0">Nam</p>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row mb-3 align-items-center" style={{width: '100%'}}>
                            <div className="col-5">
                                <label>Giới tính: </label>
                            </div>
                            <div className="col-7">
                                <p className="mb-0">Nam</p>
                            </div>
                        </div>
                        <hr></hr>
                        {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="website">Quê quán</label>
                            <input type="url" className="form-control" id="website" placeholder="Website url" />
                        </div>
                        </div> */}
                    </div>

                    <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-2">
                        <div className="text-right">
                            <button type="button" className="btn btn-primary">Chỉnh sửa thông tin cá nhân</button>
                        </div>
                        </div>
                    </div>
                    
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Student_info;