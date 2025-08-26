import Chart from "react-apexcharts";
import { chartColors } from "../../../utils/styles/colors";

/**
 * @component PieChart
 *
 * @description
 * 도넛(Pie/Donut) 차트를 그려주는 공용 컴포넌트.
 *
 * @prop {Array<number>} series
 *   차트 데이터 값 배열 (예: [100, 200, 300])
 *
 * @prop {Array<string>} labels
 *   각 데이터에 해당하는 라벨 배열 (예: ["EC2", "S3", "RDS"])
 *
 * @prop {string|number} [width="100%"]
 *   차트 너비 (px 또는 %)
 *
 * @prop {string|number} [height=350]
 *   차트 높이 (px)
 *
 * @prop {Array<string>} [colors=chartColors.default]
 *   차트 색상 배열 (기본값은 공통 팔레트)
 *
 * @prop {string} [legendPosition="bottom"]
 *   범례 위치 ("top" | "right" | "bottom" | "left")
 *
 * @prop {string} [legendFontSize="12px"]
 *   범례 텍스트 크기
 *
 * @prop {string} [donutSize="65%"]
 *   도넛 내부 구멍 크기 (예: "65%")
 *
 * @prop {string} [centerValueFontSize="15px"]
 *   도넛 중앙 값 텍스트 크기
 *
 * @prop {string} [centerTotalFontSize="12px"]
 *   도넛 중앙 Total 텍스트 크기
 *
 * @prop {string} [dataLabelFontSize="10px"]
 *   각 조각 위에 표시되는 퍼센트 라벨 크기
 */
export default function PieChart({
  series,
  labels,
  width = "100%",
  height = 350,
  colors,
  legendPosition = "bottom",
  legendFontSize = "12px",
  donutSize = "65%",
  centerValueFontSize = "15px",
  centerTotalFontSize = "12px",
  dataLabelFontSize = "10px",
}) {
  const appliedColors = colors || chartColors.default;

  const options = {
    chart: { type: "donut" },
    labels,
    colors: appliedColors,
    legend: { show: true, position: legendPosition, fontSize: legendFontSize },
    tooltip: {
      theme: "dark",
      y: { formatter: (val) => `${val.toFixed(2)} USD` },
    },
    plotOptions: {
      pie: {
        donut: {
          size: donutSize,
          labels: {
            show: true,
            value: {
              fontSize: centerValueFontSize,
              fontWeight: "bold",
              color: "#333",
            },
            total: {
              show: true,
              label: "Total",
              fontSize: centerTotalFontSize,
              color: "#666",
              formatter: (w) =>
                w.globals.seriesTotals.reduce((a, b) => a + b, 0).toFixed(2) +
                " USD",
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: { fontSize: dataLabelFontSize, fontWeight: "bold" },
      formatter: (val) => val.toFixed(1) + "%",
    },
  };

  return (
    <Chart
      options={options}
      series={series}
      type="donut"
      width={width}
      height={height}
    />
  );
}
