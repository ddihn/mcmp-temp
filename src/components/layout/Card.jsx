import clsx from "clsx"

export default function Card({ children, className, style }) {
  return (
    <div className={clsx("card", className)}>
      <div className="card-body" style={style}>
        {children}
      </div>
    </div>
  )
}
