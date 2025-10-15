import { useEffect } from "react";
import { useProjectStore } from "../stores/useProjectStore";
import { logger } from "@/utils/logger";

export default function PostMessageListener() {
  const setWorkspace = useProjectStore((s) => s.setWorkspace);
  const setProject = useProjectStore((s) => s.setProject);
  const setUserToken = useProjectStore((s) => s.setUserToken);

  useEffect(() => {
    let messageReceived = false;

    // 디버깅 정보 출력
    console.log("=== [PostMessage] 초기화 정보 ===");
    console.log("현재 origin:", window.location.origin);
    console.log("부모 window 존재:", window.parent !== window);
    console.log("top window 존재:", window.top !== window);
    console.log("====================================");

    // 기본값 설정 함수
    const setDefaultValues = (reason) => {
      console.warn(`⚠️ [PostMessage] ${reason}`);
      logger.warn(reason);
      setWorkspace("ws01", "testWs");
      setProject("ns01", "mock-uuid", "default-project");
      setUserToken("Null");
    };

    function handleMessage(event) {
      console.log("=== [PostMessage] 모든 메시지 수신 ===");
      console.log("event.origin:", event.origin);
      console.log("event.data:", event.data);
      console.log("====================================");

      logger.debug("message received:", event);

      if (event.data && event.data.accessToken) {
        messageReceived = true;
        console.log("=== [PostMessage] 외부에서 받은 데이터 ===");
        console.log("accessToken:", event.data.accessToken);
        console.log("workspaceInfo:", event.data.workspaceInfo);
        console.log("projectInfo:", event.data.projectInfo);
        console.log("====================================");

        setWorkspace(
          event.data.workspaceInfo.id,
          event.data.workspaceInfo.name
        );
        setProject(
          event.data.projectInfo.ns_id,
          event.data.projectInfo.id,
          event.data.projectInfo.name
        );
        setUserToken(event.data.accessToken);

        console.log("=== [Store] 저장된 데이터 ===");
        console.log("workspaceId:", event.data.workspaceInfo.id);
        console.log("workspaceName:", event.data.workspaceInfo.name);
        console.log("projectId (ns_id):", event.data.projectInfo.ns_id);
        console.log("projectUUID:", event.data.projectInfo.id);
        console.log("projectName:", event.data.projectInfo.name);
        console.log("====================================");
      } else {
        messageReceived = true;
        setDefaultValues("프로젝트 코드가 없어서 기본값 적용");
      }
    }

    window.addEventListener("message", handleMessage);

    // 부모 window에 준비 완료 신호 보내기 (데이터 재전송 요청)
    if (window.parent !== window) {
      console.log("=== [PostMessage] 부모에게 준비 완료 신호 전송 ===");
      window.parent.postMessage({ type: "CHILD_READY" }, "*");
    }

    // 개발 모드에서 자동으로 더미 데이터 전송
    if (import.meta.env.MODE === "development") {
      setTimeout(() => {
        window.postMessage(
          {
            accessToken: "dummy-token",
            workspaceInfo: { id: "ws01", name: "Test Workspace" },
            projectInfo: {
              ns_id: "ns01",
              id: "mock-uuid",
              name: "Test Project",
            },
          },
          "*"
        );
      }, 1000);
    }

    // 메시지가 일정 시간 내에 오지 않으면 fallback 데이터 설정
    const fallbackTimeout = setTimeout(() => {
      if (!messageReceived) {
        setDefaultValues("메시지가 오지 않아 기본값 적용");
      }
    }, 3000); // 3초 대기

    return () => {
      window.removeEventListener("message", handleMessage);
      clearTimeout(fallbackTimeout);
    };
  }, [setWorkspace, setProject, setUserToken]);

  return null;
}
