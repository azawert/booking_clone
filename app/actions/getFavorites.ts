import { NextResponse } from "next/server";
import { getCurrentUser } from "./getCurrentUser";
import prisma from "@/app/libs/db";

export const getFavorites = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return [];
    }
    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(user.favoriteIds ?? [])],
        },
      },
    });
    const safeFavorites = favorites.map((f) => ({
      ...f,
      createdAt: f.createdAt.toISOString(),
    }));
    return safeFavorites;
  } catch (e: any) {
    throw new Error(e.message ?? e);
  }
};
