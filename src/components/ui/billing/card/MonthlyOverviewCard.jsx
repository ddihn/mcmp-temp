import Card from "../../../common/cards/Card";
import LineChart from "../../../common/chart/LineChart";
import {
  formatYearMonth,
  pickQuarterMonths,
} from "../../../../utils/chartUtils";

/**
 * @component MonthlyOverviewCard
 *
 * @description
 * CSP별 최근 12개월 청구금액 추이를 라인 차트로 보여주는 카드.
 */
export default function MonthlyOverviewCard({ data }) {
  if (!data) return null;

  const { curYear, curMonth, yearMonths, summaryBill } = data;
  const selectedMonths = pickQuarterMonths(yearMonths, curYear, curMonth);
  const categories = selectedMonths.map((ym) => formatYearMonth(ym));
  const series = summaryBill.map((provider) => ({
    name: provider.csp,
    data: selectedMonths.map((ym) => {
      const found = provider.monthlyBill.find((m) => m.yearMonth === ym);
      return found ? found.bill : 0;
    }),
  }));

  return (
    <Card title="Monthly Overview" titleSize={2}>
      <LineChart
        categories={categories}
        series={series}
        height={260}
        colors={["#F59E0B", "#10B981", "#3B82F6", "#8B5CF6"]}
        curve="smooth"
      />
    </Card>
  );
}
