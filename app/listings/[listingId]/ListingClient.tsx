"use client";
import { Container } from "@/app/components/Container";
import { categories } from "@/app/components/nav/Categories";
import { TSafeListing, TSafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import React, { useMemo } from "react";
import { ListingHeader } from "./ListingHeader";
import { ListingInfo } from "./ListingInfo";

interface IListingProps {
  listing: TSafeListing & {
    user: TSafeUser;
  };
  currentUser?: TSafeUser | null;
  reservation?: Reservation[];
}

export const ListingClient: React.FC<IListingProps> = ({
  currentUser,
  listing,
  reservation,
}) => {
  const category = useMemo(() => {
    return categories.find((category) => category.label === listing.category);
  }, [listing.category]);
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
          </div>
        </div>
      </div>
    </Container>
  );
};
