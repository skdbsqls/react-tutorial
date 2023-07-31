import React, { Fragment, useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "../redux/modules/postSlice";

export default function Edit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useLocation().state;
  const [editInputs, setEditInputs] = useState({
    editTitle: post?.title || "",
    editContent: post?.content || "",
  });
  const editChangeHandler = (e) => {
    const { value, name } = e.target;
    setEditInputs({
      ...editInputs,
      [name]: value,
    });
  };

  // 수정
  const EditButton = () => {
    const newPost = {
      ...post,
      title: editInputs.editTitle,
      content: editInputs.editContent,
    };
    dispatch(editPost(newPost));
    navigate("/");
  };

  return (
    <Fragment>
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
              name="editTitle"
              value={editInputs.editTitle}
              onChange={editChangeHandler}
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
              name="editContent"
              value={editInputs.editContent}
              onChange={editChangeHandler}
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
            onClick={EditButton}
            style={{
              width: "100%",
              height: "40px",
              border: "none",
              color: "white",
              borderRadius: "12px",
              backgroundColor: "orange",
              cursor: "pointer",
            }}
          >
            수정하기
          </button>
        </form>
      </Container>
    </Fragment>
  );
}
