"use client";

import { useRouter } from "next/navigation";
import { Container } from "../components/Container";
import { Heading } from "../components/Heading";
import { TSafeListing, TSafeReservation, TSafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ListingCard } from "../components/listings/ListingCard";

interface IPropertiesClientProps {
  listings: TSafeListing[];
  currentUser?: TSafeUser | null;
}

export const TripsClient: React.FC<IPropertiesClientProps> = ({
  currentUser,
  listings,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Successfully deleted property");
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
      <Heading
        title={"Your properties"}
        subtitle='Where you`ve want your guests to be'
      />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 2xl:grid-cols-6'>
        {listings.map((l) => (
          <ListingCard
            key={l.id}
            data={l}
            currentUser={currentUser}
            actionId={l.id}
            disabled={l.id === deletingId}
            actionLabel='Delete'
            onAction={onDelete}
          />
        ))}
      </div>
    </Container>
  );
};
