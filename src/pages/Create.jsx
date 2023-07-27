import React, { useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

export default function Create({ posts, setPosts }) {
  const navigate = useNavigate();
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");

  // const onChangeTitle = (event) => {
  //   setTitle(event.target.value);
  // };
  // const onChangeContent = (event) => {
  //   setContent(event.target.value);
  // };

  // 위를 아래처럼 한 번에 처리해주기!!
  // 데이터를 한 번에 묶어서 처리하려면? 객체!!
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
  });

  // name 부여해줌으로써 onChangeHandler로 한 번에 할 수 있음!
  const changeHandler = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const addButton = () => {
    const newPost = {
      id: nanoid(),
      ...inputs,
      // title: inputs.title,
      // content: inputs.content,
    };
    setPosts([...posts, newPost]);
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
              value={title}
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
              value={content}
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
              navigate("/");
            }}
          >
            추가하기
          </button>
        </form>
      </Container>
    </>
  );
}
