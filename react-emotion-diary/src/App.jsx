import "./App.css";
import { useState, useRef, createContext, useReducer, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import Notfound from "./pages/Notfound";

// const mockData = [
//   {
//     id: 1,
//     createdDate: new Date("2024-12-11").getTime(),
//     emotionId: 1,
//     content: "1번 일기내용",
//   },
//   {
//     id: 2,
//     createdDate: new Date("2024-12-12").getTime(),
//     emotionId: 2,
//     content: "2번 일기내용",
//   },
//   {
//     id: 3,
//     createdDate: new Date("2024-12-13").getTime(),
//     emotionId: 3,
//     content: "3번 일기내용",
//   },
// ];
function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case "init":
      return action.data;
    case "create":
      nextState = [action.data, ...state];
      break;
    case "delete":
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    case "update":
      nextState = state.map((item) => (String(item.id) === String(action.data.id) ? action.data : item));
      break;
    default:
      return state;
  }
  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    const storedData = localStorage.getItem("diary");
    if (!storedData) {
      setIsLoading(false);
      return;
    }
    const parsedData = JSON.parse(storedData);
    // console.log(parsedData);
    if (!Array.isArray(parsedData)) {
      setIsLoading(false);
      return;
    }

    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });

    idRef.current = maxId + 1;

    dispatch({
      type: "init",
      data: parsedData,
    });
    console.log(parsedData);
    setIsLoading(false);
  }, []);

  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "create",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };
  const onDelete = (id) => {
    dispatch({
      type: "delete",
      id,
    });
  };
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "update",
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  if (isLoading) {
    return <div>데이터 로딩 중입니다...</div>;
  }

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onDelete, onUpdate }}>
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
