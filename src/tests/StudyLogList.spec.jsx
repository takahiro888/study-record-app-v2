import { StudyLogList } from "../StudyLogList";
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  getAllRecords,
  addRecord,
  deleteRecord,
} from "../utils/supabaseFunctions";

// Supabase関数をモック
jest.mock("../utils/supabaseFunctions", () => ({
  getAllRecords: jest.fn(() => Promise.resolve([])),
  addRecord: jest.fn(),
  deleteRecord: jest.fn(),
}));

describe("StudyLogList Title Test", () => {
  it("タイトルが学習記録一覧であること", async () => {
    // testId(title)を指定して取得
    render(<StudyLogList />);

    // 非同期処理が完了するまで待つ
    await waitFor(() => {
      const title = screen.getByTestId("title");
      expect(title).toHaveTextContent("学習記録一覧");
    });
  });

  it("フォームに学習内容と時間を入力して登録ボタンを押すと新たに記録が追加される", async () => {
    const user = userEvent.setup();

    // 初期状態は空の配列
    getAllRecords.mockResolvedValueOnce([]);

    render(<StudyLogList />);

    // ローディングが完了するのを待つ
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    // 初期状態ではレコードが0件
    const initialRecords = screen.queryAllByTestId("study-record");
    expect(initialRecords).toHaveLength(0);

    // 入力フィールドに値を入力
    const titleInput = screen.getByTestId("input-title");
    const timeInput = screen.getByTestId("input-time");
    const addButton = screen.getByTestId("button-add");

    await user.type(titleInput, "React学習");
    await user.clear(timeInput);
    await user.type(timeInput, "3");

    // addRecordが呼ばれた後、getAllRecordsが新しいデータを返すようにモック
    getAllRecords.mockResolvedValueOnce([
      { id: 1, title: "React学習", time: 3 },
    ]);

    // 登録ボタンをクリック
    await user.click(addButton);

    // addRecordが呼ばれたことを確認
    expect(addRecord).toHaveBeenCalledWith("React学習", 3);

    // 新しいレコードが表示されるのを待つ
    await waitFor(() => {
      const records = screen.getAllByTestId("study-record");
      expect(records).toHaveLength(1);
      expect(screen.getByText("React学習 3時間")).toBeInTheDocument();
    });
  });

  it("削除ボタンを押すと学習記録が削除される", async () => {
    const user = userEvent.setup();

    // 初期状態で1件のレコードがある
    getAllRecords.mockResolvedValueOnce([
      { id: 1, title: "TypeScript学習", time: 2 },
    ]);

    render(<StudyLogList />);

    // ローディングが完了するのを待つ
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    // 初期状態ではレコードが1件
    const initialRecords = screen.getAllByTestId("study-record");
    expect(initialRecords).toHaveLength(1);
    expect(screen.getByText("TypeScript学習 2時間")).toBeInTheDocument();

    // 削除ボタンを取得してクリック
    const deleteButton = screen.getByTestId("button-delete");
    await user.click(deleteButton);

    // deleteRecordが正しいIDで呼ばれたことを確認
    expect(deleteRecord).toHaveBeenCalledWith(1);

    // レコードが削除されて0件になることを確認
    await waitFor(() => {
      const records = screen.queryAllByTestId("study-record");
      expect(records).toHaveLength(0);
    });
  });
});
