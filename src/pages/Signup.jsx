import React, { useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const errorCode = {
  "auth/email-already-in-use": "이미 가입한 이메일입니다.",
  "auth/invalid-email": "이메일 형식이 올바르지 않습니다.",
  "auth/operation-not-allowed":
    "이메일과 비밀번호 계정이 활성화되지 않았습니다.",
  "auth/weak-password": "비밀번호는 6자리 이상으로 입력해주세요.",
};

export default function Signup() {
  const navigate = useNavigate();

  // 입력값 받기
  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const userChangeHandler = (e) => {
    const { value, name } = e.target;
    setUserInputs((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // 회원가입 버튼
  const singupButton = async (e) => {
    e.preventDefault();
    // 유효성 검사
    if (!userInputs.email) {
      return alert("이메일을 입력해주세요.");
    }
    if (!userInputs.password) {
      return alert("비밀번호를 입력해주세요.");
    }
    if (!userInputs.passwordConfirm) {
      return alert("비밀번호 확인을 입력해주세요.");
    }
    if (userInputs.password !== userInputs.passwordConfirm) {
      return alert("비밀번호가 일치하지 않습니다.");
    }
    // 회원가입 성공
    try {
      await createUserWithEmailAndPassword(
        auth,
        userInputs.email,
        userInputs.password
      );
      // 입력값 초기화
      setUserInputs({
        email: "",
        password: "",
        passwordConfirm: "",
      });
      // 홈으로 이동
      navigate("/");
    } catch (error) {
      // 내가 설정한 에러코드가 아닌 다른 종류의 에러가 있을 경우도 대비!
      if (errorCode[error.code]) {
        alert(errorCode[error.code]);
      } else {
        alert("알 수 없는 오류입니다. 나중에 다시 시도해주세요.");
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
                name="passwordConfirm"
                value={userInputs.passwordConfirm}
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
