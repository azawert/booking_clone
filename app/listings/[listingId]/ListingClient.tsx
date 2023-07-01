"use client";
import { Container } from "@/app/components/Container";
import { categories } from "@/app/components/nav/Categories";
import { TSafeListing, TSafeReservation, TSafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ListingHeader } from "./ListingHeader";
import { ListingInfo } from "./ListingInfo";
import { useLoginModal } from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ListingReservation } from "./ListingReservation";
import { Range } from "react-date-range";

const initialDate = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};
interface IListingProps {
  listing: TSafeListing & {
    user: TSafeUser;
  };
  currentUser?: TSafeUser | null;
  reservation?: TSafeReservation[];
}

export const ListingClient: React.FC<IListingProps> = ({
  currentUser,
  listing,
  reservation = [],
}) => {
  const category = useMemo(() => {
    return categories.find((category) => category.label === listing.category);
  }, [listing.category]);
  const { onOpen: openLoginModal } = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservation.forEach((res) => {
      const range = eachDayOfInterval({
        start: new Date(res.startDate),
        end: new Date(res.endDate),
      });

      dates = [...dates, ...range];
    });
    return dates;
  }, [reservation]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range | null>(initialDate);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      openLoginModal();
      return;
    }
    setIsLoading(true);
    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange?.startDate,
        endDate: dateRange?.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Success");
        router.push("/trips");
        router.refresh();
        setDateRange(null);
      })
      .catch((e) => toast.error(e.message ?? e))
      .finally(() => setIsLoading(false));
  }, [currentUser, dateRange, listing?.id, router, openLoginModal, totalPrice]);

  useEffect(() => {
    if (dateRange?.startDate && dateRange?.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);
  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-6'>
          <ListingHeader
            title={listing.title}
            imageSrc={listing.imageSrc}
            location={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              bathroomCount={listing.bathroomCount}
              location={listing.locationValue}
              guestCount={listing.guestCount}
            />
            <div className='order-first mb-10 md:order-last md:col-span-3'>
              <ListingReservation
                dateRange={dateRange}
                datesDisabled={disabledDates}
                isDisabled={isLoading}
                onChangeDate={(val) => setDateRange(val)}
                onSubmit={onCreateReservation}
                price={listing.price}
                totalPrice={totalPrice}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
