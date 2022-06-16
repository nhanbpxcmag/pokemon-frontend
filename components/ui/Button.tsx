import React from "react";
import { ImSpinner6 } from "react-icons/im";

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  title: string;
  loading?: boolean | undefined;
}
const Button: React.FC<ButtonProps> = (props) => {
  const { title, className, disabled, loading, ...other } = props;
  let classNameDefault = "bg-amber-500 py-2 px-4 rounded" + (className ? ` ${className}` : "");
  if (disabled) classNameDefault += " bg-[#283543] text-[#626C76] cursor-not-allowed";
  return (
    <button className={classNameDefault} disabled={disabled || loading} {...other}>
      {loading ? <ImSpinner6 size="24px" className="animate-spin" /> : title}
    </button>
  );
};

export default Button;
