import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useSelector } from "react-redux";

export default function Header() {
  const user = useSelector((state) => state.user);

  // 로그아웃
  const logoutButton = async (e) => {
    e.preventDefault();
    await signOut(auth);
  };

  return (
    <header
      style={{
        height: "100px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px 0 24px",
      }}
    >
      <h1
        style={{
          color: "gray",
          cursor: "pointer",
        }}
      >
        <Link to="/">
          <FaHome />
        </Link>
      </h1>
      <div
        style={{
          display: "flex",
          gap: "12px",
        }}
      >
        {/* 사용자 유무에 따른 버튼 */}
        {user.email ? (
          <>
            <div>{user.email}</div>
            <button onClick={logoutButton}>로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </>
        )}
      </div>
    </header>
  );
}
