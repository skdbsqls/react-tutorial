import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/modules/userSlice";
import { auth } from "./firebase";

function App() {
  // 새로 고침해도 로그인 유무가 사라지지 않게 하기!
  // -> 회원가입/로그인/로그아웃 할 때 state 변경을 해주지 않아도 됨!
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // 로그아웃하면 null이 되기 때문에 옵셔널체이닝 걸어주기!
      dispatch(setUser(user?.email));
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit" element={<Edit />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
