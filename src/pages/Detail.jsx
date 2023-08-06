import React from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getDetailPost, deletePost } from "../axios/post";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  // 상세 조회
  const {
    isLoading,
    isError,
    data: post,
  } = useQuery(["posts", id], () => getDetailPost(id));

  // 삭제
  // Post 삭제
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });
  const deleteButton = (post) => {
    // 삭제 권한 확인
    if (post.author !== user.email) {
      return alert("삭제 권한이 없습니다.");
    } else {
      const deleteConfirm = window.confirm("게시물을 삭제하시겠습니까?");
      if (deleteConfirm) {
        deleteMutation.mutate(post.id);
        navigate("/");
      }
    }
  };

  // 수정
  const editButton = (post) => {
    // 수정 권한 확인
    if (post.author !== user.email) {
      return alert("수정 권한이 없습니다.");
    } else navigate(`/edit`, { state: post });
  };

  if (isLoading) {
    return <h1>로딩중입니다!</h1>;
  }
  if (isError) {
    return <h1>에러 발생!!</h1>;
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
          {post.title}
        </h1>
        <div
          style={{
            height: "400px",
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          {post.content}
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
