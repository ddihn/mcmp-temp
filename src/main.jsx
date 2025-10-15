import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Tabler CSS / JS (전역 스타일)
import "@tabler/core/dist/css/tabler.min.css";
import "@tabler/core/dist/js/tabler.min.js";

// React 앱 시작 전에 postMessage를 받아서 저장
window.__INITIAL_POST_MESSAGE__ = null;

window.addEventListener("message", (event) => {
  if (event.data && event.data.accessToken) {
    console.log("✅ [Global] 초기 메시지 저장 완료", event.data);
    window.__INITIAL_POST_MESSAGE__ = event.data;
  }
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
