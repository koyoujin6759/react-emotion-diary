import "./EmotionItem.css";
import { getEmotionImage } from "../util/get-emotion-image";

const EmotionItem = ({ emotionId, emotionName, isSelected, onClick }) => {
  return (
    <div className={`EmotionItem ${isSelected ? `EmotionItem_on_${emotionId}` : ""} `} onClick={onClick}>
      <img src={getEmotionImage(emotionId)} className="emotion_img" alt="" />
      <div className="emotion_name">{emotionName}</div>
    </div>
  );
};
export default EmotionItem;
