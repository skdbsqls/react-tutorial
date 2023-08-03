import React, { useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const navigate = useNavigate();

  // 입력값 받기
  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
  });
  const userChangeHandler = (e) => {
    const { value, name } = e.target;
    setUserInputs({
      ...userInputs,
      [name]: value,
    });
  };

  // 로그인 버튼
  const loginButton = async (e) => {
    e.preventDefault();
    // 유효성 검사
    if (!userInputs.email) {
      return alert("이메일을 입력해주세요.");
    }
    if (!userInputs.password) {
      return alert("비밀번호를 입력해주세요.");
    }
    // 로그인 성공
    try {
      await signInWithEmailAndPassword(
        auth,
        userInputs.email,
        userInputs.password
      );
      // 입력값 초기화
      setUserInputs({
        email: "",
        password: "",
      });
      // 홈으로 이동
      navigate("/");
    } catch (error) {
      // 로그인 실패 (에러 처리) -> 에러 코드로 바꾸기
      if (error.code === "auth/invalid-email") {
        return alert("이메일 주소가 유효하지 않습니다.");
      }
      if (error.code === "auth/user-disabled") {
        return alert("해당 이메일의 사용자는 비활성화되어 있습니다.");
      }
      if (error.code === "auth/user-not-found") {
        return alert("일치하는 유저의 정보가 없습니다.");
      }
      if (error.code === "auth/wrong-password") {
        return alert("비밀번호가 일치하지 않습니다.");
      }
    }
  };

  return (
    <>
      <Header />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "600px",
            alignItems: "center",
          }}
        >
          <form>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                name="email"
                value={userInputs.email}
                onChange={userChangeHandler}
                placeholder="이메일"
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                name="password"
                value={userInputs.password}
                onChange={userChangeHandler}
                placeholder="비밀번호"
                type="password"
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <button
                onClick={loginButton}
                style={{
                  width: "100%",
                  border: "none",
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#78C1F3",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                로그인하기
              </button>
            </div>
            <div
              style={{
                width: "360px",
              }}
            >
              <button
                style={{
                  width: "100%",
                  border: "none",
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#FF6969",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                회원가입하러 가기
              </button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
