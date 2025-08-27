import Grid from "../../components/layout/Grid";
import BillingSummaryCard from "../../components/ui/billing/card/BillingSummaryCard";
import TopServicesCard from "../../components/ui/billing/card/TopServicesCard";
import ServiceCostListCard from "../../components/ui/billing/card/ServiceCostListCard";
import { chartData, top5billData, billingAsset } from "../../config/mockData";

export default function HomePage() {
  return (
    <Grid cols={2} minColWidth={320} equalHeight>
      <BillingSummaryCard chartData={chartData} />
      <TopServicesCard data={top5billData} />
      <ServiceCostListCard services={billingAsset} />
    </Grid>
  );
}
