"use client";

interface IHeadingProps {
  title: string;
  subtitle?: string;
  isCentered?: boolean;
}

export const Heading: React.FC<IHeadingProps> = ({
  title,
  isCentered,
  subtitle,
}) => {
  return (
    <div className={isCentered ? "text-center" : "text-start"}>
      <div className='text-2xl font-bold'>{title}</div>
      <div className='font-light text-neutral-500 mt-2'>{subtitle}</div>
    </div>
  );
};
