"use client";

import { useCountries } from "@/app/hooks/useCountries";
import { useSearchModal } from "@/app/hooks/useSearchModal";
import { differenceInCalendarDays, differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

export const Search: React.FC = () => {
  const { onOpen } = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();
  console.log(
    params?.get("locationValue"),
    getByValue(params?.get("locationValue")!)
  );
  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestsCount");
  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue)?.label;
    }
    return "Anywhere";
  }, [getByValue, locationValue]);
  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const end = new Date(endDate);
      const start = new Date(startDate);
      let diff = differenceInDays(end, start);
      if (diff === 0) {
        diff = 1;
      }
      return `${diff} Days`;
    }
    return "Any week";
  }, [startDate, endDate]);
  const guestCountLabel = useMemo(() => {
    if (guestCount) {
      return guestCount as string;
    }
    return "Add guests";
  }, [guestCount]);
  return (
    <div
      className='border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer'
      onClick={onOpen}
    >
      <div className='flex flex-row items-center justify-between'>
        <div className='text-sm px-6 font-semibold'>{locationLabel}</div>
        <div className='hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center'>
          {durationLabel}
        </div>
        <div className='text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3 font-semibold'>
          <div className='hidden sm:block'>{guestCountLabel}</div>
          <div className='p-2 bg-rose-500 rounded-full text-white'>
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};
