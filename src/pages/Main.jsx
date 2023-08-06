import React from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getPosts, deletePost } from "../axios/post";

export default function Main() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  // Post 조회
  const { isLoading, isError, data: posts } = useQuery("posts", getPosts);

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
      }
    }
  };

  // 추가 버튼
  const addButton = () => {
    // 로그인 되어 있지 않은 경우
    if (!user.email) {
      return alert("로그인을 해주세요.");
    }
    // 로그인 되어 있는 경우
    else navigate("/create");
  };

  // 수정 버튼
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
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            padding: "12px",
          }}
        >
          <button
            onClick={addButton}
            style={{
              border: "none",
              padding: "8px",
              borderRadius: "6px",
              backgroundColor: "skyblue",
              color: "white",
              cursor: "pointer",
            }}
          >
            추가
          </button>
        </div>
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              backgroundColor: "#EEEEEE",
              height: "100px",
              borderRadius: "24px",
              marginBottom: "12px",
              display: "flex",
              padding: "12px 16px 12px 16px",
            }}
          >
            <div
              onClick={() => {
                navigate(`/detail/${post.id}`);
              }}
              style={{
                flex: 4,
                borderRight: "1px solid lightgrey",
                cursor: "pointer",
              }}
            >
              <h2>{post.title}</h2>
              <p
                style={{
                  width: "300px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {post.content}
              </p>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
                justifyContent: "space-around",
                gap: "12px",
              }}
            >
              <div>{post.author}</div>
              <div>
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
            </div>
          </div>
        ))}
      </Container>
    </>
  );
}
