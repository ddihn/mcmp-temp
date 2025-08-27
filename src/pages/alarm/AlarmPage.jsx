import AlarmHistoryTable from "../../components/ui/alarm/AlarmHistoryTable";
import { alarmHistoryData } from "../../config/mockData";
import MailingGuideModal from "../../components/ui/alarm/modal/MailingGuideModal";
import SlackGuideModal from "../../components/ui/alarm/modal/SlackGuideModal";
import MailTestModal from "../../components/ui/alarm/modal/MailTestModal";
import SlackTestButton from "../../components/ui/alarm/SlackTestButton";

export default function AlarmPage() {
  return (
    <div>
      <div className="d-flex gap-3 mb-3">
        <MailingGuideModal />
        <SlackGuideModal />
        <SlackTestButton />
        <MailTestModal />
      </div>
      <AlarmHistoryTable data={alarmHistoryData} />
    </div>
  );
}
