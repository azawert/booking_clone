import prisma from "@/app/libs/db";

export interface IListingParams {
  userId?: string;
  guestsCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  locationValue?: string;
  category?: string;
  endDate?: string;
}

export const getListings = async (params: IListingParams) => {
  try {
    const {
      userId,
      bathroomCount,
      category,
      endDate,
      guestsCount,
      locationValue,
      roomCount,
      startDate,
    } = params;
    let query: any = {};
    if (userId) {
      query.userId = userId;
    }
    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }
    if (category) {
      query.category = category;
    }

    if (guestsCount) {
      query.guestCount = {
        gte: +guestsCount,
      };
    }
    if (locationValue) {
      query.locationValue = locationValue;
    }
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: {
                  gte: startDate,
                },
                startDate: {
                  lte: startDate,
                },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    return safeListings;
  } catch (e: any) {
    throw new Error(e);
  }
};
