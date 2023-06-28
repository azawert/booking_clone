"use client";

import { TSafeReservation, TSafeUser } from "../types";

interface ITripsClientProps {
  reservations: TSafeReservation[];
  currentUser: TSafeUser;
}

export const TripsClient: React.FC<ITripsClientProps> = ({
  currentUser,
  reservations,
}) => {
  return <div>TripsClient</div>;
};
