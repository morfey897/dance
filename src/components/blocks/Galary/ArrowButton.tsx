import clsx from "clsx";

function ArrowButton({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={clsx("group", className)} {...props}>
    <svg className="stroke-pnk-100 group-hover:stroke-pnk-200 group-disabled:stroke-[#323232]" width="70" height="71" viewBox="0 0 70 71" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M41 14.1143L21 34.1143L41 56.1143" />
      <circle cx="35" cy="35.1143" r="34.5" />
    </svg>
  </button >
}

export default ArrowButton;