import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = [
  {
    id: nanoid(),
    title: "달러구트 꿈 백화점",
    content:
      "여기는 잠들어야만 입장할 수 있는 ‘달러구트 꿈 백화점’입니다. 잠들어야만 입장할 수 있는 독특한 마을. 그곳에 들어온 잠든 손님들에게 가장 인기 있는 곳은, 온갖 꿈을 한데 모아 판매하는 ‘달러구트의 꿈 백화점’이다. 긴 잠을 자는 사람들은 물론이고, 짧은 낮잠을 자는 사람들과 동물들로 매일매일 대성황을 이룬다. 범상치 않은 혈통의 주인장 ‘달러구트’, 그리고 그의 최측근에서 일하게 된 신참 직원 ‘페니’, 꿈을 만드는 제작자 ‘아가넵 코코’, 그리고 베일에 둘러싸인 비고 마이어스…등이 등장한다.",
    author: "이미예",
  },
  {
    id: nanoid(),
    title: "세이노의 가르침",
    content:
      "인생은 자전거와 같다. 뒷바퀴를 돌리는 것은 당신의 발이지만 앞바퀴를 돌려 방향을 잡는 것은 당신의 손이며 눈이고 의지이며 정신이다. 당신의 발이 ‘생활’이라는 이름으로 당신을 움직여는 주지만 정작 당신의 손은 호주머니 속에 깊이 박혀 있는지도 모른다. 정작 당신의 눈은 당신 앞에 놓인 길을 바라보지 않고 옆에서 빠른 속도로 지나가는 오토바이들과 스포츠카만 부러운 마음으로 바라볼지도 모른다. 때문에 비록 열심히 페달을 밟고는 있지만 당신이 탄 자전거는 제자리를 맴돌 뿐이다.",
    author: "세이노",
  },
  {
    id: nanoid(),
    title: "도둑맞은 집중력",
    content:
      "전 세계 모든 곳에서, 집중하는 우리의 능력은 붕괴하고 있다. 미국의 10대들은 한 가지 일에 65초 이상 집중하지 못한다. 직장인들의 평균 집중 시간은 단 3분에 불과하다. 뉴욕타임스 베스트셀러 작가이자 저널리스트인 요한 하리는 왜 이런 현상이 벌어지는지 알아보기 위해 이 분야를 주도하는 전 세계 과학자들과 전문가들을 만나기 위한 대장정을 떠났다. 그리고 그동안 이 주제에 대해 우리가 잘못 알고 있음을 발견했다.",
    author: "요한 하리",
  },
  {
    id: nanoid(),
    title: "메리골드 마음 세탁소",
    content:
      "우리는 가끔 시간을 되돌려 과거로 돌아가 후회됐던 일을 되돌리고 싶어한다. 그런데 과연 그 일을 지워버리는 게 현명한 선택일까? 그리고 그 기억을 지웠을 때 지금의 내가 있을 수 있을까? 만약 그 기억만 없다면 앞으로 행복만 할 수 있을까? 『메리골드 마음 세탁소』는 한밤중 언덕 위에 생겨난, 조금 수상하고도 신비로운 세탁소에서 벌어지는 일들을 그린 힐링 판타지 소설이다. 창백하게 하얀 얼굴에 젓가락처럼 마른 몸, 까맣고 구불구불 긴 머리의 미스테리한 여자는 세탁소를 찾아오는 누군가를 위해 매일같이 따뜻한 차를 끓인다. 차를 마신 이들은 어느 누구에게도 말하지 못했던 비밀스러운 이야기들을 자기도 모르게 그녀에게 털어놓는다. 아픈 날의 기억을 얼룩 지우듯 모조리 깨끗이 지워달라고 부탁한 사람들은 과연 세탁소를 나서며 행복해질 수 있을까?",
    author: "윤정은",
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },
    deletePost: (state, action) => {
      return state.filter((post) => post.id !== action.payload);
    },
    editPost: (state, action) => {
      return state.map((post) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            title: action.payload.title,
            content: action.payload.content,
          };
        } else return post;
      });
    },
  },
});

export const { addPost, deletePost, editPost } = postSlice.actions;
export default postSlice.reducer;
