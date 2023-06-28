import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { getListing } from "@/app/actions/getListingById";
import { ClientOnly } from "@/app/components/ClientOnly";
import { EmptyState } from "@/app/components/EmptyState";
import React from "react";
import { ListingClient } from "./ListingClient";
import { getReservations } from "@/app/actions/getReservation";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListing(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);
  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState subtitle='Try another listing' title={"No listing"} />
      </ClientOnly>
    );
  }
  return (
    <ListingClient
      currentUser={currentUser}
      listing={listing}
      reservation={reservations}
    />
  );
};

export default ListingPage;
