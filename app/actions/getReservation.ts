import prisma from "@/app/libs/db";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export const getReservations = async (params: IParams) => {
  try {
    const { authorId, listingId, userId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }
    if (userId) {
      query.userId = userId;
    }
    if (authorId) {
      query.listing = {
        userId: authorId,
      };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const typeSafeReservations = reservations.map((r) => ({
      ...r,
      createdAt: r.createdAt.toISOString(),
      startDate: r.startDate.toISOString(),
      endDate: r.endDate.toISOString(),
      listing: {
        ...r.listing,
        createdAt: r.listing.createdAt.toISOString(),
      },
    }));

    return typeSafeReservations;
  } catch (e: any) {
    throw new Error(e.message ?? e);
  }
};
