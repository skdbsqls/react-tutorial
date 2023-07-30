import React, { useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { addPost } from "../redux/modules/postSlice";
import { useDispatch } from "react-redux";

export default function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
  });
  const changeHandler = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // 추가
  const addButton = () => {
    const newPost = {
      id: nanoid(),
      ...inputs,
    };
    dispatch(addPost(newPost));
    navigate("/");
  };

  return (
    <>
      <Header />
      <Container>
        <form
          style={{
            height: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            console.log("제출!");
          }}
        >
          <div>
            <input
              name="title"
              value={inputs.title}
              onChange={changeHandler}
              placeholder="제목"
              style={{
                width: "100%",
                height: "60px",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "8px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div
            style={{
              height: "400px",
            }}
          >
            <textarea
              name="content"
              value={inputs.content}
              onChange={changeHandler}
              placeholder="내용"
              style={{
                resize: "none",
                height: "100%",
                width: "100%",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "12px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <button
            style={{
              width: "100%",
              height: "40px",
              border: "none",
              color: "white",
              borderRadius: "12px",
              backgroundColor: "skyblue",
              cursor: "pointer",
            }}
            onClick={() => {
              addButton();
            }}
          >
            추가하기
          </button>
        </form>
      </Container>
    </>
  );
}
