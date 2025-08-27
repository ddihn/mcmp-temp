import Grid from "../../components/layout/Grid";
import BaseInfoCard from "../../components/ui/billing/card/BaseInfoCard";
import InvoiceTable from "../../components/ui/billing/card/InvoiceTable";
import MonthlyOverviewCard from "../../components/ui/billing/card/MonthlyOverviewCard";
import {
  baseInfoData,
  summaryBillData,
  InvoiceData,
} from "../../config/mockData";

export default function BillingReportPage() {
  return (
    <Grid cols={2} equalHeight={true}>
      <BaseInfoCard
        totalAmount={baseInfoData.totalAmount}
        providers={baseInfoData.providers}
      />
      <MonthlyOverviewCard data={summaryBillData} />
      <InvoiceTable invoice={InvoiceData.Data.invoice} colSpan={2} />
    </Grid>
  );
}
