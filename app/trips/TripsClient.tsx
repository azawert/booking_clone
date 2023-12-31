"use client";

import { useRouter } from "next/navigation";
import { Container } from "../components/Container";
import { Heading } from "../components/Heading";
import { TSafeReservation, TSafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ListingCard } from "../components/listings/ListingCard";

interface ITripsClientProps {
  reservations: TSafeReservation[];
  currentUser?: TSafeUser | null;
}

export const TripsClient: React.FC<ITripsClientProps> = ({
  currentUser,
  reservations,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Successfully deleted reservation");
          router.refresh();
        })
        .catch((e) =>
          toast.error(e?.response?.data?.error ?? "Unexpected error")
        )
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading title={"Your trips"} subtitle='Where you`ve been' />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 2xl:grid-cols-6'>
        {reservations.map((r) => (
          <ListingCard
            key={r.id}
            data={r.listing}
            reservation={r}
            actionId={r.id}
            currentUser={currentUser}
            onAction={onCancel}
            disabled={deletingId === r.id}
            actionLabel='Cancel reservation'
          />
        ))}
      </div>
    </Container>
  );
};
