import React from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";

export default function Detail({ posts, setPosts }) {
  const navigate = useNavigate();
  const { id } = useParams();

  // find는 undefined가 될 수 있음 따라서 undefined 일 때의 처리를 해줘야 됨
  // 처리해주지 않고 오류를 내버리면 사용자 입장에서 좋지 않기 때문!!
  // ? 옵션널체이닝으로 처리해 주거나
  const post = posts.find((post) => post.id === id);

  const deleteButton = (id) => {
    const newPosts = posts.filter((post) => post.id !== id);
    setPosts(newPosts);
  };

  // 존재 하지 않을 경우에 알맞는 페이지?를 처리해주기
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
          {/* 에러 발생 가능성이 있음 -> 사용자 경험에 안좋을 수 있음 */}
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
            onClick={() => {
              navigate(`/edit/${post.id}`);
            }}
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
              alert("삭제할까?");
              deleteButton(post.id);
              navigate("/");
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
