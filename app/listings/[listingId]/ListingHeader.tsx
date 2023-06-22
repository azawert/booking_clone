"use client";
import { Heading } from "@/app/components/Heading";
import { HeartButton } from "@/app/components/HeartButton";
import { useCountries } from "@/app/hooks/useCountries";
import { TSafeUser } from "@/app/types";
import Image from "next/image";
import React from "react";

interface IListingHeaderProps {
  title: string;
  imageSrc: string;
  location: string;
  id: string;
  currentUser?: TSafeUser | null;
}

export const ListingHeader: React.FC<IListingHeaderProps> = ({
  id,
  imageSrc,
  location,
  title,
  currentUser,
}) => {
  const { getByValue } = useCountries();
  const fullLocation = getByValue(location);
  return (
    <>
      <Heading
        title={title}
        subtitle={`${fullLocation?.region}, ${fullLocation?.label}`}
      />
      <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
        <Image
          alt={`${title}`}
          src={imageSrc}
          fill
          className='object-cover w-full'
        />
        <div className='absolute top-5 right-5'>
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};
