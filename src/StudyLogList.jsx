import { useState } from "react";
import "./styles.css";

export const StudyLogList = () => {
  const [records, setRecords] = useState([]);
  const [studyTitle, setStudyTitle] = useState("");
  const [studyTime, setStudyTime] = useState(0);
  const [error, setError] = useState("");

  const onChangeTitle = (event) => setStudyTitle(event.target.value);
  const onChangeTime = (event) => setStudyTime(event.target.value);

  const onClickAdd = () => {
    if (studyTitle === "" || studyTime === "" || studyTime === 0) {
      setError("入力されていない項目があります");
      return;
    }

    const newRecord = {
      title: studyTitle,
      time: Number(studyTime),
    };
    const newRecords = [...records, newRecord];
    setRecords(newRecords);
    setStudyTitle("");
    setStudyTime(0);
    setError("");
  };

  const totalTime = records.reduce((total, record) => {
    return total + record.time;
  }, 0);

  return (
    <>
      <div className="App">
        <h1>学習記録一覧</h1>
        <div>
          <p>◾️学習内容</p>
          <input value={studyTitle} onChange={onChangeTitle} />
        </div>
        <div>
          <p>◾️学習記録</p>
          <input type="number" value={studyTime} onChange={onChangeTime} />
          時間
        </div>
        <div>
          <p>入力されている学習内容:{studyTitle}</p>
          <p>入力されている時間:{studyTime}時間</p>
        </div>
        {records.map((record, index) => (
          <div key={index}>
            <p>
              {record.title} {record.time}時間
            </p>
          </div>
        ))}
        <button onClick={onClickAdd}>登録</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>合計時間：{totalTime}/1000(h)</p>
      </div>
    </>
  );
};
