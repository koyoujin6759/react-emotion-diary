import Header from "../components/Header";
import DiaryList from "../components/DiaryList";
import Button from "../components/Button";
import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";

const getMonthlyData = (pivotData, data) => {};

const Home = () => {
  const [pivotData, setPivotData] = useState(new Date());
  const data = useContext(DiaryStateContext);

  const onDecreaseMonth = () => {
    setPivotData(new Date(pivotData.getFullYear(), pivotData.getMonth() - 1));
  };
  const onIncreaseMonth = () => {
    setPivotData(new Date(pivotData.getFullYear(), pivotData.getMonth() + 1));
  };

  return (
    <div>
      <Header title={`${pivotData.getFullYear()}년 ${pivotData.getMonth() + 1}월`} leftChild={<Button text={"<"} onClick={onDecreaseMonth} />} rightChild={<Button text={">"} onClick={onIncreaseMonth} />} />
      <DiaryList data={data} />
    </div>
  );
};
export default Home;
