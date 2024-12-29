import Button from "./Button";
import "./DiaryList.css";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
import { useState } from "react";

const DiaryList = ({ data }) => {
  const nav = useNavigate();
  // console.log(data);
  const [sortType, setSortType] = useState();
  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const getSortedData = () => {
    return data.toSorted((a, b) => {
      if (sortType === "oldest") {
        return Number(a.createdDate) - Number(b.createdDate);
      } else {
        return Number(b.createdDate) - Number(a.createdDate);
      }
    });
  };

  const sortedData = getSortedData();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
        </select>
        <Button text={"새 일기 쓰기"} type={"positive"} onClick={() => nav("/new")} />
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
export default DiaryList;
