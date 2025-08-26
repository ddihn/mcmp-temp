import React from "react";

/**
 * @component Grid
 *
 * @prop {number} [cols=3]
 *   한 줄(row)에 표시할 열(column)의 개수 (기본값: 3).
 *   ※ colWidths가 지정되지 않은 경우에만 사용됩니다.
 *
 * @prop {string[]} [colWidths]
 *   각 열의 너비를 직접 지정 (예: ["2fr", "3fr"] 또는 ["200px", "1fr", "1fr"]).
 *   지정되면 cols는 무시됩니다.
 *
 * @prop {number} [gap=16]
 *   아이템 간의 간격(px 단위, 기본값: 16)
 *
 * @prop {boolean} [equalHeight=false]
 *   true면 한 행(row)에 있는 아이템들의 높이를 동일하게 맞춥니다. (기본값: false)
 *
 * @prop {React.ReactNode} children
 *   Grid 안에 배치될 요소들 (카드, div, 차트 등 자유롭게 가능)
 */
export default function Grid({
  cols = 3,
  colWidths,
  gap = 16,
  equalHeight = false,
  children,
}) {
  return (
    <div
      className="grid"
      style={{
        display: "grid",
        gridTemplateColumns: colWidths
          ? colWidths.join(" ")
          : `repeat(${cols}, minmax(0, 1fr))`,
        gap,
        alignItems: equalHeight ? "stretch" : "start",
      }}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        const colSpan = child.props.colSpan || 1;

        // ✅ equalHeight일 때만 wrapper를 씌움
        if (equalHeight) {
          return (
            <div
              style={{
                gridColumn: `span ${colSpan}`,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {React.cloneElement(child, {
                style: { ...(child.props.style || {}), flex: 1 },
              })}
            </div>
          );
        }

        // 기본: colSpan만 적용
        return <div style={{ gridColumn: `span ${colSpan}` }}>{child}</div>;
      })}
    </div>
  );
}
