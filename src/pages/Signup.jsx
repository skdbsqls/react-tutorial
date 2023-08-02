import React, { useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  // 입력값 받기
  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
    checkpassword: "",
  });
  const userChangeHandler = (e) => {
    const { value, name } = e.target;
    setUserInputs({
      ...userInputs,
      [name]: value,
    });
  };

  // 회원가입 버튼
  const singupButton = async (e) => {
    e.preventDefault();
    // 입력값 검사
    if (!userInputs.email) {
      return alert("이메일을 입력해주세요.");
    }
    if (!userInputs.password || !userInputs.checkpassword) {
      return alert("비밀번호와 비밀번호 확인란을 모두 입력해주세요.");
    }
    // 비밀번호 확인
    if (userInputs.password !== userInputs.checkpassword) {
      return alert("비밀번호가 일치하지 않습니다.");
    }
    // 회원가입 성공
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userInputs.email,
        userInputs.password
      );
      // 입력값 초기화
      setUserInputs({
        email: "",
        password: "",
        checkpassword: "",
      });
      // 홈으로 이동
      navigate("/");
    } catch (error) {
      // 회원가입 실패 (에러 처리)
      if (error.message === "Firebase: Error (auth/invalid-email).") {
        return alert("이메일 형식이 올바르지 않습니다.");
      }
      if (
        error.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        return alert("비밀번호는 6자리 이상으로 입력해주세요.");
      }
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        return alert("이미 가입한 이메일입니다.");
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
              <input
                name="checkpassword"
                value={userInputs.checkpassword}
                onChange={userChangeHandler}
                placeholder="비밀번호 확인"
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
                onClick={singupButton}
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
                회원가입하기
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
                  backgroundColor: "#78C1F3",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                로그인하러 가기
              </button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
