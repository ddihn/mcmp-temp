import Card from "@/components/common/card/Card";
import {
  calculateCSPTotal,
  calculateMonthTotal,
  calculateYearTotal,
  getCSPColorClass,
  validateBudgetInput,
  MONTH_NAMES,
  getCurrencySymbol,
  convertCurrency,
} from "@/utils/budgetUtils";

export default function CSPBudgetSettingCard({
  cspBudgets,
  onBudgetChange,
  onSave,
  onReset,
  currency = "USD",
}) {
  if (!cspBudgets) return null;

  const currencySymbol = getCurrencySymbol(currency);

  const handleBudgetChange = (csp, monthIndex, value) => {
    const validation = validateBudgetInput(value);
    if (validation.isValid) {
      const newBudgets = {
        ...cspBudgets,
        [csp]: cspBudgets[csp].map((val, idx) =>
          idx === monthIndex ? validation.value : val
        ),
      };
      onBudgetChange(newBudgets);
    }
  };

  return (
    <Card title="CSP Budget Setting">
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>CSP</th>
              <th className="text-center">Total</th>
              {MONTH_NAMES.map((month, idx) => (
                <th key={idx} className="text-center">
                  {month}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(cspBudgets).map(([csp, budgets]) => (
              <tr key={csp}>
                <td>
                  <span
                    className={`badge fs-10 px-2 py-2 ${getCSPColorClass(csp)}`}
                  >
                    {csp}
                  </span>
                </td>
                <td className="text-center fw-bold">
                  {currencySymbol}
                  {convertCurrency(
                    calculateCSPTotal(cspBudgets, csp),
                    currency
                  ).toLocaleString()}
                </td>
                {budgets.map((budget, monthIdx) => (
                  <td key={monthIdx} style={{ width: "80px" }}>
                    <input
                      type="number"
                      className="form-control form-control-sm text-end"
                      value={convertCurrency(budget, currency)}
                      onChange={(e) =>
                        handleBudgetChange(csp, monthIdx, e.target.value)
                      }
                      min="0"
                      step={currency === "USD" ? "100" : "100000"}
                    />
                  </td>
                ))}
              </tr>
            ))}
            {/* Monthly Totals */}
            <tr className="table-info fw-bold">
              <td>Monthly Total</td>
              <td className="text-center">
                {currencySymbol}
                {convertCurrency(
                  calculateYearTotal(cspBudgets),
                  currency
                ).toLocaleString()}
              </td>
              {Array.from({ length: 12 }, (_, idx) => (
                <td key={idx} className="text-center">
                  {currencySymbol}
                  {convertCurrency(
                    calculateMonthTotal(cspBudgets, idx),
                    currency
                  ).toLocaleString()}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="mt-3">
        <div className="btn-list">
          <button className="btn btn-primary" onClick={onSave}>
            Save Budget
          </button>
          <button className="btn btn-outline-secondary" onClick={onReset}>
            Reset
          </button>
        </div>
      </div>
    </Card>
  );
}
