"use client";

import { IconType } from "react-icons";

interface IButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isSmall?: boolean;
  isOutline?: boolean;
  isDisabled?: boolean;
  icon?: IconType;
}

export const Button: React.FC<IButtonProps> = ({
  label,
  onClick,
  icon: Icon,
  isDisabled,
  isOutline,
  isSmall,
}) => {
  return (
    <button
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ${
        isOutline ? "bg-white" : "bg-rose-500"
      } ${isOutline ? "border-black" : "border-rose-500"} ${
        isOutline ? "text-black" : "text-white"
      } ${isSmall ? "py-1" : "py-3"} ${isSmall ? "text-sm" : "text-md"} ${
        isSmall ? "font-light" : "font-semibold"
      } ${isSmall ? "border-[1px]" : "border-2"}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {Icon && <Icon size={24} className='absolute left-4 top-3 ' />}
      {label}
    </button>
  );
};
