import clsx from "clsx";

export default function Card({ children, className, ...props }) {
  return (
    <div className={clsx("rounded-lg bg-white p-4", className)} {...props}>
      {children}
    </div>
  );
}
