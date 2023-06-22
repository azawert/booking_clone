import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { getListing } from "@/app/actions/getListingById";
import { ClientOnly } from "@/app/components/ClientOnly";
import { EmptyState } from "@/app/components/EmptyState";
import React from "react";
import { ListingClient } from "./ListingClient";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListing(params);
  const currentUser = await getCurrentUser();
  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState subtitle='Try another listing' title={"No listing"} />
      </ClientOnly>
    );
  }
  return <ListingClient currentUser={currentUser} listing={listing} />;
};

export default ListingPage;
