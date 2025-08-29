// src/pages/BillingReportPage.jsx
import { useEffect, useState } from "react";
import Grid from "../../components/layout/Grid";
import BaseInfoCard from "../../components/ui/billing/card/BaseInfoCard";
import InvoiceTable from "../../components/ui/billing/card/InvoiceTable";
import MonthlyOverviewCard from "../../components/ui/billing/card/MonthlyOverviewCard";
import Loading from "../../components/common/loading/Loading";
import Alert from "../../components/common/alert/Alert";
import {
  getBillingBaseInfo,
  getInvoiceSummary,
  getInvoice,
} from "../../api/billing/invoice";
import { useProjectStore } from "../../stores/useProjectStore";

export default function BillingReportPage() {
  const { projectId, workspaceId } = useProjectStore();
  const [baseInfo, setBaseInfo] = useState(null);
  const [summary, setSummary] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const req = {
      today: new Date().toISOString().slice(0, 10).replace(/-/g, ""),
      selectedProjects: [projectId ?? "ns01"],
      selectedCsps: ["AWS"],
      selectedWorkspace: workspaceId ?? "ws01",
    };

    setLoading(true);
    setError(null);

    Promise.all([
      getBillingBaseInfo(req),
      getInvoiceSummary(req),
      getInvoice(req),
    ])
      .then(([baseRes, summaryRes, invoiceRes]) => {
        setBaseInfo(baseRes.data.Data);
        setSummary(summaryRes.data.Data);
        setInvoice(invoiceRes.data.Data);
      })
      .catch((err) => {
        console.error("Invoice API Error:", err);
        setError("인보이스 데이터를 불러오는 중 오류가 발생했습니다.");
      })
      .finally(() => setLoading(false));
  }, [projectId, workspaceId]);

  if (loading)
    return <Loading fullscreen withLabel label="데이터 불러오는 중..." />;

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
    <Grid cols={2} gap={5} equalHeight>
      {baseInfo && (
        <BaseInfoCard
          totalAmount={baseInfo.reduce((sum, item) => sum + item.cost, 0)}
          providers={baseInfo}
        />
      )}
      {summary && <MonthlyOverviewCard data={summary} />}
      {invoice && <InvoiceTable invoice={invoice.invoice} colSpan={12} />}
    </Grid>
  );
}
