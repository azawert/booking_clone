import { Listing, User } from "@prisma/client";

export type TSafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type TSafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};
