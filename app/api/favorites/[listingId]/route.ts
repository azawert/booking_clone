import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/db";

interface IParams {
  listingId?: string;
}

export const POST = async (_: Request, { params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    NextResponse.error();
  }
  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid id");
  }
  const favoriteIds = [...(currentUser?.favoriteIds ?? [])];
  favoriteIds.push(listingId);

  const user = await prisma.user.update({
    data: {
      favoriteIds,
    },
    where: {
      id: currentUser?.id,
    },
  });
  return NextResponse.json(user);
};

export const DELETE = async (_: Request, { params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid id");
  }
  const favoriteIds = [...(currentUser?.favoriteIds ?? [])];
  const newFavoriteIds = favoriteIds.filter((id) => id !== listingId);
  const user = await prisma.user.update({
    data: {
      favoriteIds: newFavoriteIds,
    },
    where: {
      id: currentUser?.id,
    },
  });

  return NextResponse.json(user);
};
