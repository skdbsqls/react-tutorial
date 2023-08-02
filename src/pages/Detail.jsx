import React, { useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../redux/modules/postSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const posts = useSelector((state) => state.posts);
  const post = posts.find((post) => post.id === id);

  // 유저의 이메일 셋팅
  onAuthStateChanged(auth, (user) => {
    setEmail(user.email);
  });

  // 삭제
  const deleteButton = (post) => {
    // 삭제 권한 확인
    if (post.author !== email) {
      return alert("삭제 권한이 없습니다.");
    } else {
      alert("게시물을 삭제하시겠습니까?");
      dispatch(deletePost(post.id));
      navigate("/");
    }
  };

  // 수정
  const editButton = (post) => {
    // 수정 권한 확인
    if (post.author !== email) {
      return alert("수정 권한이 없습니다.");
    } else navigate(`/edit`, { state: post });
  };

  if (!post) {
    return <div>해당 게시물은 존재하지 않습니다.</div>;
  }
  return (
    <>
      <Header />
      <Container>
        <h1
          style={{
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          {post?.title}
        </h1>
        <div
          style={{
            height: "400px",
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          {post?.content}
        </div>
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <button
            onClick={() => editButton(post)}
            style={{
              border: "none",
              padding: "8px",
              borderRadius: "6px",
              backgroundColor: "orange",
              color: "white",
              cursor: "pointer",
              marginRight: "6px",
            }}
          >
            수정
          </button>
          <button
            onClick={() => {
              deleteButton(post);
            }}
            style={{
              border: "none",
              padding: "8px",
              borderRadius: "6px",
              backgroundColor: "red",
              color: "white",
              cursor: "pointer",
            }}
          >
            삭제
          </button>
        </div>
      </Container>
    </>
  );
}
