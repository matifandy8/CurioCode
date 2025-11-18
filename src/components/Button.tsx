import { cn } from "../shared/utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-50 cursor-pointer";

  const variants = {
    primary:
      "bg-cyan-300 text-black hover:bg-cyan-600 shadow-[0_0_10px_#00FFFF50] focus:ring-cyan-400",
    secondary:
      "bg-black text-white hover:bg-cyan-800 shadow-[0_0_10px_#B6FF0050] focus:ring-lime-300",
    outline:
      "border border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 focus:ring-cyan-400",
    ghost:
      "text-white hover:text-cyan-300 hover:bg-white/5 focus:ring-cyan-400",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
