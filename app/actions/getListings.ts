import prisma from "@/app/libs/db";

export const getListings = async () => {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return listings;
  } catch (e: any) {
    throw new Error(e);
  }
};
