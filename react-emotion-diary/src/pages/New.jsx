import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Editor from "../components/Editor";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import usePageTitle from "../hooks/usePageTitle";

const New = () => {
  const nav = useNavigate();
  const { onCreate } = useContext(DiaryDispatchContext);

  const onSubmit = (input) => {
    onCreate(input.createdDate.getTime(), input.emotionId, input.content);
    nav("/", { replace: true });
  };
  usePageTitle("새 일기 쓰기");

  return (
    <>
      <Header title={"새 일기 쓰기"} leftChild={<Button text={"뒤로가기"} onClick={() => nav(-1)} />} />
      <Editor onSubmit={onSubmit} />
    </>
  );
};
export default New;
