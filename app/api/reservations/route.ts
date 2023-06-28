import { NextResponse } from "next/server";

import prisma from "@/app/libs/db";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export const POST = async (req: Request) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await req.json();
  const { listingId, startDate, endDate, totalPrice } = body;
  if (!listingId || !endDate || !startDate || !totalPrice) {
    return NextResponse.error();
  }

  const listingReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          endDate,
          startDate,
          totalPrice,
        },
      },
    },
  });
  return NextResponse.json(listingReservation);
};
