import "./Editor.css";
import Button from "./Button";
import { useState, useEffect } from "react";
import { getStringedDate } from "./../util/get-stringed-date";
import { emotionList } from "../util/constants";
import EmotionItem from "./EmotionItem";

const Editor = ({ initData, onSubmit }) => {
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: "",
  });
  useEffect(() => {
    if (initData) {
      setInput({ ...initData, createdDate: new Date(initData.createdDate) });
    }
  }, [initData]);
  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    // console.log(e.target.value);
    if (name === "createdDate") {
      value = new Date(value);
    }
    setInput({
      ...input,
      [name]: value,
    });
  };
  const onClickSubmitButton = () => {
    onSubmit(input);
  };

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input type="date" name="createdDate" value={getStringedDate(input.createdDate)} onChange={onChangeInput} />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
              onClick={() =>
                onChangeInput({
                  target: {
                    name: "emotionId",
                    value: item.emotionId,
                  },
                })
              }
            />
          ))}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea name="content" id="" cols="30" rows="10" placeholder="오늘은 어땠나요?" value={input.content} onChange={onChangeInput}></textarea>
      </section>
      <section className="button_section">
        <Button text={"취소하기"} onClick={() => nav(-1)} />
        <Button text={`${initData ? "수정하기" : "작성하기"}`} onClick={onClickSubmitButton} type={"positive"} />
      </section>
    </div>
  );
};
export default Editor;
