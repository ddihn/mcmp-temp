import clsx from "clsx";
import { Icons } from "../../../icons/Icons";

export default function Alert({
  variant = "info",
  title,
  message,
  dismissible = false,
  important = false,
  withIcon = true,
  onClose,
}) {
  const classes = clsx(
    "alert",
    `alert-${variant}`,
    important && "alert-important",
    dismissible && "alert-dismissible"
  );

  return (
    <div className={classes} role="alert">
      <div className="d-flex">
        {withIcon && (
          <div>{Icons[variant] ? Icons[variant]({}) : Icons.info({})}</div>
        )}
        <div className="ms-2">
          {title && <h4 className="alert-title">{title}</h4>}
          {message && <div className="text-white">{message}</div>}
        </div>
      </div>
      {dismissible && (
        <a
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="close"
          onClick={onClose}
        />
      )}
    </div>
  );
}
