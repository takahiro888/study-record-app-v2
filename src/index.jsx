import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { StudyLogList } from "./StudyLogList";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <StudyLogList />
  </StrictMode>
);
