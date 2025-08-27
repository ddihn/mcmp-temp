import Card from "../../../common/card/Card";
import Grid from "../../../layout/Grid";
import BarChart from "../../../common/chart/BarChart";
import ChangeIndicator from "../../../common/indicator/ChangeIndicator";
import { toBarChartData, formatYearMonth } from "../../../../utils/chartUtils";
export default function BillingSummaryCard({ chartData }) {
  const { curYear, curMonth, momPer, momBill, curMonthBill, monthlyBill } =
    chartData;
  const { categories, series } = toBarChartData(monthlyBill, 4);

  const yearMonth = `${curYear}${String(curMonth).padStart(2, "0")}`;
  const formatted = formatYearMonth(yearMonth);

  return (
    <Card title={`Billing Summary (${formatted})`} titleSize={2}>
      <Grid colWidths={["2fr", "3fr"]} equalHeight>
        <div>
          <h2>{curMonthBill.toFixed(3)} USD</h2>
          <div>
            Compared to last month
            <ChangeIndicator
              changePercent={parseFloat(momPer)}
              changeAmount={momBill}
              unit="USD"
            />
          </div>
        </div>
        <BarChart
          categories={categories}
          series={series}
          height={250}
          color="#00E396"
          yAxisTitle=""
        />
      </Grid>
    </Card>
  );
}
