import Header from "../components/Header";
import Button from "../components/Button";
import { replace, useNavigate, useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Editor from "../components/Editor";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import usePageTitle from "../hooks/usePageTitle";

const Edit = () => {
  const nav = useNavigate();
  const params = useParams();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
  const curDiaryItem = useDiary(params.id);
  usePageTitle(`${params.id}번 일기 수정`);

  const onClickDelete = () => {
    if (window.confirm("일기를 정말 삭제하시겠습니까?")) {
      onDelete(params.id);
      nav("/", { replace: true });
    }
  };

  const onSubmit = (input) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      onUpdate(params.id, input.createdDate.getTime(), input.emotionId, input.content);
      nav("/", { replace: true });
    }
  };

  return (
    <>
      <Header title={"일기 수정하기"} leftChild={<Button text={"뒤로가기"} onClick={() => nav(-1)} />} rightChild={<Button text={"삭제하기"} onClick={onClickDelete} type={"negative"} />} />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </>
  );
};
export default Edit;
