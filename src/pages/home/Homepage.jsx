// src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import Grid from "../../components/layout/Grid";
import BillingSummaryCard from "../../components/ui/billing/card/BillingSummaryCard";
import TopServicesCard from "../../components/ui/billing/card/TopServicesCard";
import ServiceCostListCard from "../../components/ui/billing/card/ServiceCostListCard";
import Loading from "../../components/common/loading/Loading";
import Alert from "../../components/common/alert/Alert";
import {
  getCurMonthBill,
  getTop5Bill,
  getBillAsset,
} from "../../api/billing/billing";
import { useProjectStore } from "../../stores/useProjectStore";

export default function HomePage() {
  const { projectId, workspaceId } = useProjectStore();

  const [summary, setSummary] = useState(null);
  const [top5, setTop5] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const req = {
      today: new Date().toISOString().slice(0, 10).replace(/-/g, ""),
      selectedProjects: [projectId ?? "mock-proj"],
      selectedCsps: ["AWS"],
      selectedWorkspace: workspaceId,
    };

    setLoading(true);
    setError(null);

    Promise.all([getCurMonthBill(req), getTop5Bill(req), getBillAsset(req)])
      .then(([summaryRes, top5Res, servicesRes]) => {
        setSummary(summaryRes.data.Data);
        setTop5(top5Res.data.Data.top5bill || []);
        setServices(servicesRes.data.Data.billingAsset || []);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      })
      .finally(() => setLoading(false));
  }, [projectId, workspaceId]);

  if (loading) {
    return <Loading fullscreen withLabel label="데이터 불러오는 중..." />;
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert
          variant="danger"
          title="API 에러"
          message={error}
          dismissible
          important
        />
      </div>
    );
  }

  return (
    <Grid cols={2} minColWidth={320} equalHeight>
      {summary && <BillingSummaryCard chartData={summary} />}
      <TopServicesCard data={top5} />
      <ServiceCostListCard services={services} />
    </Grid>
  );
}
