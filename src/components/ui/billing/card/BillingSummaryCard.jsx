import Card from "../../../common/card/Card";
import Grid from "../../../layout/Grid";
import BarChart from "../../../common/chart/BarChart";
import ChangeIndicator from "../../../common/indicator/ChangeIndicator";
import { toBarChartData } from "../../../../utils/chartUtils";

export default function BillingSummaryCard({ chartData }) {
  const { curYear, curMonth, momPer, momBill, curMonthBill, monthlyBill } =
    chartData;

  const { categories, series } = toBarChartData(monthlyBill, 4);

  return (
    <Card title={`${curYear}년 ${curMonth}월 청구금액`} titleSize={2}>
      <Grid colWidths={["2fr", "3fr"]} equalHeight>
        <div>
          <h2>{curMonthBill.toFixed(3)} USD</h2>
          <div>
            전월 사용 금액 대비
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
