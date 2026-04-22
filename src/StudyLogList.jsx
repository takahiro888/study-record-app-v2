import { useEffect, useState } from "react";
import "./styles.css";
import {
  getAllRecords,
  addRecord,
  deleteRecord,
} from "./utils/supabaseFunctions";
import { styled } from "styled-components";

export const StudyLogList = () => {
  const [records, setRecords] = useState([]);
  const [studyTitle, setStudyTitle] = useState("");
  const [studyTime, setStudyTime] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getRecords = async () => {
      setIsLoading(true); // ①読み込み開始！
      const records = await getAllRecords();
      setRecords(records);
      setIsLoading(false); // ②読み込み終了！
    };
    getRecords();
  }, []);

  const onChangeTitle = (event) => setStudyTitle(event.target.value);
  const onChangeTime = (event) => setStudyTime(event.target.value);

  const onClickAdd = async () => {
    if (studyTitle === "" || studyTime === "" || studyTime === 0) {
      setError("入力されていない項目があります");
      return;
    }

    await addRecord(studyTitle, Number(studyTime));

    // データベースから最新のデータを再取得
    const updatedRecords = await getAllRecords();
    setRecords(updatedRecords);

    setStudyTitle("");
    setStudyTime(0);
    setError("");
  };

  const onClickDelete = async (id) => {
    await deleteRecord(id);
    const newRecords = records.filter((record) => record.id !== id);
    setRecords(newRecords);
  };
  const totalTime = records.reduce((total, record) => {
    return total + record.time;
  }, 0);

  if (isLoading) {
    return <div style={{}}>Loading...</div>;
  }

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
          <SDiv key={index}>
            <p>
              {record.title} {record.time}時間
            </p>
            <SDeleteButton onClick={() => onClickDelete(record.id)}>
              削除
            </SDeleteButton>
          </SDiv>
        ))}
        <button onClick={onClickAdd}>登録</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>合計時間：{totalTime}/1000(h)</p>
      </div>
    </>
  );
};

const SDiv = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;
const SDeleteButton = styled.button`
  margin-left: 10px;
`;
