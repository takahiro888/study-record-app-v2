import { StudyLogList } from "../StudyLogList";
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

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
});
