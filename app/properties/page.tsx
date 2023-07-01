import { EmptyState } from "../components/EmptyState";
import { ClientOnly } from "../components/ClientOnly";
import { TripsClient } from "./PropertiesClient";

import { getCurrentUser } from "../actions/getCurrentUser";

import { getListings } from "../actions/getListings";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title={"Unauthorized"} subtitle='Please login' />
      </ClientOnly>
    );
  }
  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No listings found'
          subtitle='Looks like you haven`t created any listing.'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PropertiesPage;
