import "./App.css";
import { useState, UseRef, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import Notfound from "./pages/Notfound";

const mockData = [
  {
    id: 1,
    creaedDate: new Date().getTime(),
    emotionId: 1,
    content: "1번 일기내용",
  },
  {
    id: 2,
    creaedDate: new Date().getTime(),
    emotionId: 2,
    content: "2번 일기내용",
  },
  {
    id: 3,
    creaedDate: new Date().getTime(),
    emotionId: 3,
    content: "3번 일기내용",
  },
];

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [data, setData] = useState(mockData);

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/new" element={<New />}></Route>
          <Route path="/diary/:id" element={<Diary />}></Route>
          <Route path="/edit/:id" element={<Edit />}></Route>
          <Route path="/*" element={<Notfound />}></Route>
        </Routes>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
