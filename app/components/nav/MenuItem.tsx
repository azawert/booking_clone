"use client";
interface IMenuItemProps {
  label: string;
  onClick: () => void;
}

export const MenuItem: React.FC<IMenuItemProps> = ({ label, onClick }) => {
  return (
    <div
      className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
      onClick={onClick}
    >
      {label}
    </div>
  );
};
