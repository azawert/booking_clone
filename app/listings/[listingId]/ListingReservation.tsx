"use client";

import { Button } from "@/app/components/Button";
import { Calendar } from "@/app/components/inputs/Calendar";
import { Range } from "react-date-range";

interface IListingReservationProps {
  price: number;
  totalPrice: number;
  onChangeDate: (val: Range) => void;
  dateRange: Range | null;
  onSubmit: () => void;
  isDisabled?: boolean;
  datesDisabled: Date[];
}

export const ListingReservation: React.FC<IListingReservationProps> = ({
  dateRange,
  datesDisabled,
  isDisabled,
  onChangeDate,
  onSubmit,
  price,
  totalPrice,
}) => {
  return (
    <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
      <div className='flex flex-row items-center gap-1 p-4'>
        <div className='text-2xl font-semibold'>$ {price}</div>
        <div className='font-light text-neutral-600'>night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={datesDisabled}
        onChange={(val) => onChangeDate(val.selection)}
      />
      <hr />
      <div className='p-4'>
        <Button isDisabled={isDisabled} label={"Reserve"} onClick={onSubmit} />
      </div>
      <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};
