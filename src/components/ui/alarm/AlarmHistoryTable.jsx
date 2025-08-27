import Table from "../../../components/common/table/Table";
import Card from "../../common/card/Card";

const AlarmHistoryTable = ({ data }) => {
  const columns = [
    { key: "date", label: "일시", className: "text-nowrap" },
    { key: "csp", label: "CSP", className: "text-nowrap" },
    { key: "resourceId", label: "리소스 ID", className: "text-nowrap" },
    { key: "resourceType", label: "리소스 타입", className: "text-nowrap" },
    { key: "alarmType", label: "알람 종류", className: "text-nowrap" },
    { key: "alarmMessage", label: "알람 내용" },
    { key: "recommendType", label: "추천 유형", className: "text-nowrap" },
  ];

  return (
    <Card title={"추천 이력"} titleSize={2} noPadding>
      <Table
        columns={columns}
        data={data}
        striped
        hover
        responsive
        stickyHeader
        pagination
        pageSize={10}
        paginationVariant="outline"
      />
    </Card>
  );
};

export default AlarmHistoryTable;
