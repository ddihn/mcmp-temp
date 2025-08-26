// yearMonth -> "Sep 24" 포맷 변환
export const formatYearMonth = (yearMonth) => {
  const year = yearMonth.substring(0, 4);
  const month = parseInt(yearMonth.substring(4), 10);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${monthNames[month - 1]} ${year.slice(2)}`;
};

// 3개월 단위 + 현재 월 포함
export const pickQuarterMonths = (months, curYear, curMonth) => {
  const sorted = [...months].sort((a, b) => parseInt(a) - parseInt(b));
  const result = [];
  for (let i = 0; i < sorted.length; i += 3) {
    result.push(sorted[i]);
  }
  const cur = `${curYear}${curMonth}`;
  if (!result.includes(cur)) result.push(cur);
  return result.sort((a, b) => parseInt(a) - parseInt(b));
};

// 최근 N개월 추출
export const getLastMonthsData = (monthlyBill, count = 4) => {
  const sorted = [...monthlyBill].sort(
    (a, b) => parseInt(a.year + a.month) - parseInt(b.year + b.month)
  );
  return sorted.slice(-count);
};

// BarChart용 데이터 변환
export const toBarChartData = (monthlyBill, count = 4) => {
  const lastMonths = getLastMonthsData(monthlyBill, count);
  return {
    categories: lastMonths.map((m) => formatYearMonth(`${m.year}${m.month}`)),
    series: [{ name: "Bill", data: lastMonths.map((m) => m.bill) }],
  };
};

// LineChart용 데이터 변환
export const toLineChartData = (summaryBill, yearMonths, curYear, curMonth) => {
  const selectedMonths = pickQuarterMonths(yearMonths, curYear, curMonth);
  const categories = selectedMonths.map((ym) => formatYearMonth(ym));

  const series = summaryBill.map((provider) => ({
    name: provider.csp,
    data: selectedMonths.map((ym) => {
      const found = provider.monthlyBill.find((m) => m.yearMonth === ym);
      return found ? found.bill : 0;
    }),
  }));

  return { categories, series };
};
