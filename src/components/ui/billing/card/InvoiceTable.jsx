import React, { useLayoutEffect, useRef } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css"; // Tabulator 기본 CSS
import * as XLSX from "xlsx";
import Card from "../../../common/card/Card";
import Button from "../../../common/button/Button";
import { Icons } from "../../../../icons/Icons";
import "../../../../index.css";

window.XLSX = XLSX;

export default function InvoiceTable({ invoice }) {
  const tableRef = useRef(null);
  const tabulatorInstance = useRef(null);
  const today = new Date().toISOString().split("T")[0];

  useLayoutEffect(() => {
    if (!tableRef.current) return;

    if (tabulatorInstance.current) {
      tabulatorInstance.current.replaceData(invoice);
      return;
    }

    tabulatorInstance.current = new Tabulator(tableRef.current, {
      data: invoice,
      layout: "fitColumns",
      height: "450px",
      responsiveLayout: "collapse",
      groupBy: ["csp", "productID"],
      groupStartOpen: [true, false],
      groupHeader: [
        (value, count, data) => {
          const total = data.reduce((sum, row) => sum + row.bill, 0).toFixed(2);
          return `CSP: ${value} — ${count} items / Total: ${total} USD`;
        },
        (value, count, data) => {
          const total = data.reduce((sum, row) => sum + row.bill, 0).toFixed(2);
          return `Service: ${value} — ${count} items / Total: ${total} USD`;
        },
      ],
      columns: [
        { title: "CSP", field: "csp" },
        { title: "Account ID", field: "accountID" },
        { title: "Product", field: "productID" },
        { title: "Resource", field: "resourceID" },
        {
          title: "Amount (USD)",
          field: "bill",
          hozAlign: "right",
          sorter: "number",
          formatter: "money",
          formatterParams: { symbol: "$", precision: 2 },
          bottomCalc: "sum",
          bottomCalcFormatter: "money",
          bottomCalcFormatterParams: { symbol: "$", precision: 2 },
        },
      ],
    });
  }, [invoice]);

  const handleExportCSV = () => {
    tabulatorInstance.current.download("csv", `invoice_${today}.csv`);
  };

  const handleExportExcel = () => {
    tabulatorInstance.current.download("xlsx", `invoice_${today}.xlsx`, {
      sheetName: "Invoice Data",
    });
  };

  return (
    <Card
      title="Invoices"
      titleSize={2}
      noBodyWrapper
      noPadding
      actions={
        <div className="btn-list">
          <Button
            icon={Icons.exportCsv}
            iconPosition="only"
            variant="info"
            size="sm"
            onClick={handleExportCSV}
          />
          <Button
            icon={Icons.exportXls}
            iconPosition="only"
            variant="info"
            size="sm"
            onClick={handleExportExcel}
          />
        </div>
      }
    >
      <div ref={tableRef} style={{ width: "100%" }} />
    </Card>
  );
}
