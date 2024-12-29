import Button from "./Button";
import "./DiaryList.css";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";

const DiaryList = ({ data }) => {
  const nav = useNavigate();
  // console.log(data);
  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select>
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
        </select>
        <Button text={"새 일기 쓰기"} type={"positive"} onClick={() => nav("/new")} />
      </div>
      <div className="list_wrapper">
        {data.map((item) => {
          return <DiaryItem {...item} />;
        })}
      </div>
    </div>
  );
};
export default DiaryList;
