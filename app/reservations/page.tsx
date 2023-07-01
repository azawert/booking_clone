import { EmptyState } from "../components/EmptyState";
import { ClientOnly } from "../components/ClientOnly";

import { getCurrentUser } from "../actions/getCurrentUser";
import { getReservations } from "../actions/getReservation";
import { ReservationClient } from "./ReservationClient";

const ReservationPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title='Unauthorized' subtitle='Please login before:)' />
      </ClientOnly>
    );
  }
  const reservations = await getReservations({
    authorId: currentUser.id,
  });
  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title={"No reservations found"}
          subtitle='Looks like you have no reservations'
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <ReservationClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ReservationPage;
