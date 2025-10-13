import { useState } from "react";
import { budgetData } from "@/config/mockData";
import Grid from "@/components/layout/Grid";
import Dropdown from "@/components/common/dropdown/Dropdown";
import BudgetComparisonCard from "./components/BudgetComparisonCard";
import MonthlySummaryCard from "./components/MonthlySummaryCard";
import CSPBudgetSettingCard from "./components/CSPBudgetSettingCard";
import { logger } from "@/utils/logger";

export default function BudgetPage() {
  const [selectedYear, setSelectedYear] = useState(budgetData.Data.year);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [cspBudgets, setCspBudgets] = useState(budgetData.Data.cspBudgets);

  const monthlyData = budgetData.Data.monthly;

  const yearOptions = [
    { value: 2023, label: "2023" },
    { value: 2024, label: "2024" },
    { value: 2025, label: "2025" },
  ];

  const currencyOptions = [
    { value: "USD", label: "USD ($)" },
    { value: "KRW", label: "KRW (₩)" },
  ];

  const handleSave = () => {
    logger.info("Saving budget data:", cspBudgets);
    // TODO: API 호출로 저장
  };

  const handleReset = () => {
    setCspBudgets(budgetData.Data.cspBudgets);
  };

  return (
    <div>
      <div className="d-flex gap-2 mb-4">
        <div>
          <label className="form-label">Year</label>
          <Dropdown
            trigger={selectedYear}
            items={yearOptions}
            selectedValue={selectedYear}
            onSelect={(value) => setSelectedYear(value)}
            className="btn-outline-secondary"
          />
        </div>
        <div>
          <label className="form-label">Currency</label>
          <Dropdown
            trigger={
              currencyOptions.find((opt) => opt.value === selectedCurrency)
                ?.label
            }
            items={currencyOptions}
            selectedValue={selectedCurrency}
            onSelect={(value) => setSelectedCurrency(value)}
            className="btn-outline-secondary"
          />
        </div>
      </div>

      <Grid>
        <BudgetComparisonCard
          data={monthlyData}
          currency={selectedCurrency}
          colSpan={12}
        />
        <CSPBudgetSettingCard
          cspBudgets={cspBudgets}
          onBudgetChange={setCspBudgets}
          onSave={handleSave}
          onReset={handleReset}
          currency={selectedCurrency}
          colSpan={12}
        />
        <MonthlySummaryCard
          data={monthlyData}
          currency={selectedCurrency}
          colSpan={12}
        />
      </Grid>
    </div>
  );
}
