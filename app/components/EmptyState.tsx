"use client";
import { useRouter } from "next/navigation";
import { Heading } from "./Heading";
import { Button } from "./Button";

interface IEmptyState {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

export const EmptyState: React.FC<IEmptyState> = ({
  showReset,
  subtitle = "Try changing or removing some of your filters",
  title = "No exact matches",
}) => {
  const router = useRouter();
  return (
    <div className='h-[60vh] flex flex-col gap-2 justify-center items-center'>
      <Heading title={title} subtitle={subtitle} isCentered />
      <div className='w-48 mt-4'>
        {showReset && (
          <Button
            isOutline
            label={"Remove all filters"}
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};
