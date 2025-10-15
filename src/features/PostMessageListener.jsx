import { useEffect } from "react";
import { useProjectStore } from "../stores/useProjectStore";
import { logger } from "@/utils/logger";

export default function PostMessageListener() {
  const setWorkspace = useProjectStore((s) => s.setWorkspace);
  const setProject = useProjectStore((s) => s.setProject);
  const setUserToken = useProjectStore((s) => s.setUserToken);

  useEffect(() => {
    let messageReceived = false;

    const setDefaultValues = (reason) => {
      console.warn(`⚠️ [PostMessage] ${reason}`);
      logger.warn(reason);
      setWorkspace("ws01", "testWs");
      setProject("ns01", "mock-uuid", "default-project");
      setUserToken("Null");
    };

    // 전역에 저장된 초기 메시지 확인
    if (window.__INITIAL_POST_MESSAGE__) {
      const data = window.__INITIAL_POST_MESSAGE__;
      console.log("✅ [PostMessage] 전역 메시지 감지, Store 설정", {
        workspaceId: data.workspaceInfo.id,
        workspaceName: data.workspaceInfo.name,
        projectId: data.projectInfo.ns_id,
        projectUUID: data.projectInfo.id,
        projectName: data.projectInfo.name,
      });
      messageReceived = true;

      setWorkspace(data.workspaceInfo.id, data.workspaceInfo.name);
      setProject(data.projectInfo.ns_id, data.projectInfo.id, data.projectInfo.name);
      setUserToken(data.accessToken);

      window.__INITIAL_POST_MESSAGE__ = null;
    }

    function handleMessage(event) {
      if (event.data && event.data.accessToken) {
        console.log("✅ [PostMessage] 새 메시지 수신, Store 업데이트", {
          workspaceId: event.data.workspaceInfo.id,
          workspaceName: event.data.workspaceInfo.name,
          projectId: event.data.projectInfo.ns_id,
          projectUUID: event.data.projectInfo.id,
          projectName: event.data.projectInfo.name,
        });
        messageReceived = true;

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
      }
    }

    window.addEventListener("message", handleMessage);

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
    }, 3000);

    return () => {
      window.removeEventListener("message", handleMessage);
      clearTimeout(fallbackTimeout);
    };
  }, [setWorkspace, setProject, setUserToken]);

  return null;
}
