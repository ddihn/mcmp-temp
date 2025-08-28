import React from "react";

/**
 * @component Grid
 *
 * 기본적으로 2열, 화면이 좁아지면(예: 768px 이하) 1열로 표시.
 *
 * @prop {number} [gap=16]
 *   아이템 간격(px, 기본값: 16).
 *
 * @prop {boolean} [equalHeight=false]
 *   true면 한 행(row) 아이템 높이를 동일하게 맞춤.
 *
 * @prop {React.ReactNode} children
 *   Grid 안에 배치될 요소들.
 */
export default function Grid({ gap = 16, equalHeight = false, children }) {
  return (
    <div
      className="responsive-grid"
      style={{
        display: "grid",
        gap,
        alignItems: equalHeight ? "stretch" : "start",
      }}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        const colSpan = child.props.colSpan || 1;

        // wrapper div에서 gridColumn 처리
        const wrapperStyle = {
          gridColumn: `span ${colSpan}`,
          display: equalHeight ? "flex" : undefined,
          flexDirection: equalHeight ? "column" : undefined,
        };

        return (
          <div style={wrapperStyle}>
            {equalHeight
              ? React.cloneElement(child, {
                  style: { ...(child.props.style || {}), flex: 1 },
                })
              : child}
          </div>
        );
      })}

      <style jsx>{`
        .responsive-grid {
          grid-template-columns: repeat(2, 1fr);
        }

        @media (max-width: 768px) {
          .responsive-grid {
            grid-template-columns: 1fr;
          }
          /* 화면이 1열일 땐 모든 colSpan을 강제로 1열 전체 차지 */
          .responsive-grid > div {
            grid-column: span 1;
          }
        }
      `}</style>
    </div>
  );
}
