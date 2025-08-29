import { useEffect } from "react";
import clsx from "clsx";
import { Icons } from "../../../icons/Icons";

/**
 * Toast-style Alert Component
 *
 * @param {Object} props
 * @param {"info" | "success" | "danger" | "warning"} [props.variant="info"] - 알림 색상/아이콘 스타일
 * @param {string} props.title - 알림 제목
 * @param {string} props.message - 알림 메시지
 * @param {boolean} [props.dismissible=true] - 닫기 버튼 표시 여부
 * @param {number} [props.duration=0] - 자동 닫힘 시간(ms). 0이면 자동 닫힘 없음
 * @param {() => void} [props.onClose] - 닫기 버튼 클릭 또는 자동 닫힘 시 실행되는 콜백
 */

export default function Alert({
  variant = "info",
  title,
  message,
  dismissible = true,
  duration = 0, // 0이면 자동으로 안 닫힘
  onClose,
}) {
  // 자동 닫기
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div
      className="toast-container position-fixed top-0 end-0 p-3"
      style={{ zIndex: 9999 }}
    >
      <div
        className={clsx("toast show text-white", {
          "bg-success": variant === "success",
          "bg-danger": variant === "danger",
          "bg-info": variant === "info",
          "bg-warning": variant === "warning",
        })}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          {Icons[variant] && <span className="me-2">{Icons[variant]({})}</span>}
          <strong className="me-auto">{title}</strong>
          {dismissible && (
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          )}
        </div>
        <div className="toast-body">{message}</div>
      </div>
    </div>
  );
}
