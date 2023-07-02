import { getCurrentUser } from "./actions/getCurrentUser";
import { IListingParams, getListings } from "./actions/getListings";
import { Container } from "./components/Container";
import { EmptyState } from "./components/EmptyState";
import { ListingCard } from "./components/listings/ListingCard";

interface HomeParams {
  searchParams: IListingParams;
}
export const dynamic = "force-dynamic";
const Home = async ({ searchParams }: HomeParams) => {
  const currentUser = await getCurrentUser();
  const listings = await getListings(searchParams);

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      {listings.length === 0 ? (
        <EmptyState showReset />
      ) : (
        <div className='pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          ))}
        </div>
      )}
    </Container>
  );
};

export default Home;
