"use client";
import { useRouter } from "next/navigation";
import { Container } from "../components/Container";
import { Heading } from "../components/Heading";
import { TSafeReservation, TSafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ListingCard } from "../components/listings/ListingCard";

interface IReservationClient {
  currentUser?: TSafeUser | null;
  reservations: TSafeReservation[];
}

export const ReservationClient: React.FC<IReservationClient> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          router.refresh();
          toast.success("Successfully deleted");
        })
        .catch((e) => toast.error(e.message ?? e))
        .finally(() => setDeletingId(""));
    },
    [router]
  );

  return (
    <Container>
      <Heading title='Reservations' subtitle='Bookings on your properties' />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 2xl:grid-cols-6'>
        {reservations.map((r) => (
          <ListingCard
            data={r.listing}
            actionId={r.id}
            actionLabel='Cancel'
            currentUser={currentUser}
            disabled={deletingId === r.id}
            onAction={onCancel}
            reservation={r}
            key={r.id}
          />
        ))}
      </div>
    </Container>
  );
};
