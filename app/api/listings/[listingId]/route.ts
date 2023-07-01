import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/db";

interface IParams {
  listingId?: string;
}

export const DELETE = async (_: Request, { params }: { params: IParams }) => {
  const user = await getCurrentUser();
  const { listingId } = params;
  if (!user || !listingId) {
    return NextResponse.error();
  }
  const list = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: user.id,
    },
  });
  return NextResponse.json(list);
};
