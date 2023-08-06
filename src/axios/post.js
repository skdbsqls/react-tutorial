import axios from "axios";

const base = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

// 조회
const getPosts = async () => {
  const { data } = await base.get("posts");
  return data;
};

// 추가
const createPost = async (newPost) => {
  await base.post("posts", newPost);
};

// 상세 조회
const getDetailPost = async (id) => {
  const { data } = await base.get(`posts?id=${id}`);
  return data[0];
};

// 삭제
const deletePost = async (id) => {
  await base.delete(`posts/${id}`);
};

// 수정
const updatePost = async (updatePost) => {
  await base.patch(`posts/${updatePost.id}`, updatePost);
};

export { getPosts, createPost, getDetailPost, deletePost, updatePost };
