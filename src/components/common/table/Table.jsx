import { useState } from "react";
import clsx from "clsx";

/**
 * Table Component
 *
 * @param {Array} columns - [{ key: 'name', label: 'Name' }, ...]
 * @param {Array} data - [{ name: 'Paweł Kuna', title: 'UI Designer', ... }]
 * @param {boolean} striped - zebra 효과
 * @param {boolean} hover - hover 시 하이라이트
 * @param {boolean} responsive - 수평 스크롤 가능
 * @param {boolean} nowrap - 줄바꿈 방지
 * @param {boolean} stickyHeader - sticky header
 * @param {string} variant - row 스타일 ("primary", "secondary", "success", ...)
 * @param {boolean} pagination - 페이지네이션 활성화 여부
 * @param {number} pageSize - 페이지당 행 수
 * @param {string} paginationVariant - 페이지네이션 스타일 ("default" | "outline" | "circle" | "text")
 */
export default function Table({
  columns = [],
  data = [],
  striped = false,
  hover = false,
  responsive = true,
  nowrap = false,
  stickyHeader = false,
  variant = "",
  pagination = false,
  pageSize = 10,
  paginationVariant = "default",
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = pagination ? Math.ceil(data.length / pageSize) : 1;

  const paginatedData = pagination
    ? data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : data;

  const tableClasses = clsx("table", {
    "table-striped": striped,
    "table-hover": hover,
    "table-nowrap": nowrap,
  });

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // pagination class 설정
  const paginationClasses = clsx("pagination justify-content-center mt-3", {
    "pagination-outline": paginationVariant === "outline",
    "pagination-circle": paginationVariant === "circle",
  });

  return (
    <div className={clsx({ "table-responsive": responsive })}>
      <table className={tableClasses}>
        <thead className={clsx({ "sticky-top": stickyHeader })}>
          <tr>
            {columns.map((col) => (
              <th key={col.key} scope="col" className={col.className || ""}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, i) => (
            <tr key={i} className={variant ? `table-${variant}` : ""}>
              {columns.map((col) => (
                <td key={col.key} className={col.className || ""}>
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      {/* 페이지네이션 */}
      {pagination && totalPages > 1 && (
        <ul
          className={paginationClasses}
          style={{ marginTop: "1rem", marginBottom: "1rem" }} // 위·아래 여백
        >
          {/* 이전 버튼 */}
          <li className={clsx("page-item", { disabled: currentPage === 1 })}>
            <button
              className={clsx("page-link", {
                "page-text": paginationVariant === "text",
              })}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {paginationVariant === "text" ? "Previous" : "«"}
            </button>
          </li>

          {/* 페이지 번호 */}
          {Array.from({ length: totalPages }, (_, idx) => (
            <li
              key={idx + 1}
              className={clsx("page-item", {
                active: currentPage === idx + 1,
              })}
            >
              <button
                className={clsx("page-link", {
                  "page-text": paginationVariant === "text",
                })}
                onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
              </button>
            </li>
          ))}

          {/* 다음 버튼 */}
          <li
            className={clsx("page-item", {
              disabled: currentPage === totalPages,
            })}
          >
            <button
              className={clsx("page-link", {
                "page-text": paginationVariant === "text",
              })}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              {paginationVariant === "text" ? "Next" : "»"}
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
