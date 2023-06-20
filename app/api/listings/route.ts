import { NextResponse } from "next/server";

import prisma from "@/app/libs/db";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    location,
    price,
    category,
    roomCount,
    bathroomCount,
    guestsCount,
  } = body;

  const listing = await prisma.listing.create({
    data: {
      bathroomCount,
      category,
      description,
      guestCount: guestsCount,
      imageSrc,
      locationValue: location.value,
      price: parseInt(price, 10),
      roomCount,
      title,
      userId: currentUser.id,
    },
  });
  return NextResponse.json(listing);
}
