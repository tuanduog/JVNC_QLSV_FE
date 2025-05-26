import React from "react";
import { useLocation } from "react-router-dom";

function Hello_Stu() {
  const location = useLocation();
  const userInfo = location.state?.userInfo;

  return (
    <div
      style={{
        minHeight: '88vh',
        background: "linear-gradient(to right, #74ebd5, #ACB6E5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffffcc",
          borderRadius: "16px",
          padding: "40px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          textAlign: "center",
          maxWidth: "600px",
          width: "100%",
          animation: "fadeIn 1s ease-in-out"
        }}
      >
        <h2 style={{ color: "#333", marginBottom: "20px" }}>
          Chào mừng trở lại 👋
        </h2>
        <h3 style={{ color: "#007BFF", fontSize: "28px" }}>
          👨‍🎓 {userInfo?.hovaten || "Người dùng"}
        </h3>
        <p style={{ color: "#555", marginTop: "10px" }}>
          --- Chúc bạn một ngày làm việc hiệu quả ---
        </p>
      </div>

      {/* Optional animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

export default Hello_Stu;
