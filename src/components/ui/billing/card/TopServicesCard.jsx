import Card from "../../../common/card/Card";
import PieChart from "../../../common/chart/PieChart";

export default function TopServicesCard({ data }) {
  const series = data.map((item) => item.bill);
  const labels = data.map((item) => `${item.resourceNm} (${item.csp})`);

  return (
    <Card title="요금 상위 5개 서비스" titleSize={2}>
      <PieChart
        series={series}
        labels={labels}
        height={250}
        donutSize="60%"
        centerValueFontSize="14px"
        centerTotalFontSize="12px"
        dataLabelFontSize="10px"
      />
    </Card>
  );
}
