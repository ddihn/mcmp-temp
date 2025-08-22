import clsx from "clsx"

const COLORS = [
  "blue", "azure", "indigo", "purple", "pink", "red",
  "orange", "yellow", "lime", "green", "teal", "cyan"
]

export default function Loading({
  color = "blue",     // 기본 색상
  size = "md",        // "md" | "sm"
  fullscreen = false, // true면 화면 전체 중앙 정렬
  label = "Loading..."// 시각장애인용 접근성 텍스트
}) {
  const spinnerClass = clsx(
    "spinner-border",
    size === "sm" && "spinner-border-sm",
    COLORS.includes(color) && `text-${color}`
  )

  const wrapperClass = clsx(
    "d-flex align-items-center justify-content-center",
    fullscreen && "vh-100 vw-100 bg-light"
  )

  return (
    <div className={wrapperClass}>
      <div className={spinnerClass} role="status">
        <span className="visually-hidden">{label}</span>
      </div>
    </div>
  )
}
