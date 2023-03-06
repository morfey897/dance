import clsx from "clsx";
function DotButton({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={clsx("bg-[#323232] border border-black hover:border-pnk-100 w-[20px] h-[20px] rounded-full disabled:bg-pnk-200", className)} {...props} />
}

export default DotButton;