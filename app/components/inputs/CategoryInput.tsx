"use client";

import { IconType } from "react-icons";

interface ICategoryInputsProps {
  icon: IconType;
  onClick: (value: string) => void;
  selected?: boolean;
  label: string;
}

export const CategoryInput: React.FC<ICategoryInputsProps> = ({
  icon: Icon,
  label,
  onClick,
  selected,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
	rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black cursor-pointer ${
    selected ? "border-black" : "border-neutral-200"
  }
  `}
    >
      <Icon size={30} />
      <div className='font-semibold'>{label}</div>
    </div>
  );
};
