import { useEffect, useState } from "react";
import AlarmHistoryTable from "../../components/ui/alarm/AlarmHistoryTable";
import MailingGuideModal from "../../components/ui/alarm/modal/MailingGuideModal";
import SlackGuideModal from "../../components/ui/alarm/modal/SlackGuideModal";
import MailTestModal from "../../components/ui/alarm/modal/MailTestModal";
import SlackTestButton from "../../components/ui/alarm/SlackTestButton";
import { getAlarmHistory } from "../../api/alarm/alarm";
import { useProjectStore } from "../../stores/useProjectStore";
import Loading from "../../components/common/loading/Loading";
import Alert from "../../components/common/alert/Alert";
import AlertProvider from "../../components/common/alert/AlertProvider";

export default function AlarmPage() {
  const { projectId, workspaceId } = useProjectStore();
  const [alarmData, setAlarmData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!projectId || !workspaceId) return;

    const req = {
      selectedCsps: ["AWS"],
      selectedWorkspace: workspaceId,
      selectedProjects: [projectId ?? "ns01"],
    };

    setLoading(true);
    setError(null);

    getAlarmHistory(req)
      .then((res) => {
        setAlarmData(res.data.Data.alarmHistory || []);
        console.log(res.data.Data.alarmHistory);
      })
      .catch((err) => {
        console.error("Alarm API Error:", err);
        setError("알람 내역 데이터를 불러오는 중 오류가 발생했습니다.");
      })
      .finally(() => setLoading(false));
  }, [projectId, workspaceId]);

  if (loading)
    return <Loading fullscreen withLabel label="데이터 불러오는 중..." />;

  return (
    <div>
      <div className="d-flex gap-3 mb-3">
        <MailingGuideModal />
        <SlackGuideModal />
        <MailTestModal />
        <SlackTestButton />
      </div>
      <AlarmHistoryTable data={alarmData} />
      {error && (
        <Alert
          variant="danger"
          title="API 에러"
          message={error}
          dismissible
          onClose={() => setError(null)}
        />
      )}
      <AlertProvider />
    </div>
  );
}
