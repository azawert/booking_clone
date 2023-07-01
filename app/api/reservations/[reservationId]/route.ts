import { NextResponse } from "next/server";

import prisma from "@/app/libs/db";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

interface IParams {
  reservationId?: string;
}

export const DELETE = async (req: Request, { params }: { params: IParams }) => {
  try {
    const { reservationId } = params;
    const currentUser = await getCurrentUser();
    if (!reservationId || !currentUser) {
      return NextResponse.error();
    }
    const res = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } },
        ],
      },
    });
    return NextResponse.json(res);
  } catch (e: any) {
    throw new Error(e.message ?? e);
  }
};
