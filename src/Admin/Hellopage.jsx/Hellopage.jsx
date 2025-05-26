import React from "react";
import { useLocation } from "react-router-dom";

function Hellopage(){
    const location = useLocation();
    const userInfo = location.state?.userInfo;
    return (
        <h4>Chào mừng {userInfo.hovaten} đến với trang quản lý sinh viên</h4>
    )
}

export default Hellopage;