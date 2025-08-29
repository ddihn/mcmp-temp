import React from "react";

/**
 * @component Grid (Tabler 기반)
 *
 * Tabler의 row/col 클래스를 활용한 반응형 Grid
 *
 * @prop {boolean} [equalHeight=false]
 *   true면 같은 행의 아이템 높이를 맞춤.
 *
 * @prop {React.ReactNode} children
 *   Grid 안에 배치될 요소들.
 */
export default function Grid({ equalHeight = false, children }) {
  return (
    <div className={`row gy-4 ${equalHeight ? "align-items-stretch" : ""}`}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        const colSpan = child.props.colSpan || 6;
        const colClass = `col-12 col-md-${colSpan}`;

        return (
          <div className={colClass}>
            {equalHeight
              ? React.cloneElement(child, {
                  className: `${child.props.className || ""} h-100`,
                })
              : child}
          </div>
        );
      })}
    </div>
  );
}
