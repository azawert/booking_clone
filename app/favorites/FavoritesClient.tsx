"use client";

import { Container } from "../components/Container";
import { Heading } from "../components/Heading";
import { ListingCard } from "../components/listings/ListingCard";
import { TSafeListing, TSafeUser } from "../types";

interface IFavoritesClient {
  currentUser?: TSafeUser | null;
  favorites: TSafeListing[];
}

export const FavoritesClient: React.FC<IFavoritesClient> = ({
  favorites,
  currentUser,
}) => {
  return (
    <Container>
      <Heading title={"Favorites"} subtitle={"List of places you liked"} />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 2xl:grid-cols-6'>
        {favorites.map((f) => (
          <ListingCard data={f} key={f.id} currentUser={currentUser} />
        ))}
      </div>
    </Container>
  );
};
