import axios from "axios";

import { useRouter } from "next/navigation";

import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { TSafeUser } from "../types";

import { useLoginModal } from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: TSafeUser | null;
}

export const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const { onOpen } = useLoginModal();
  const isFavorited = useMemo(() => {
    return currentUser?.favoriteIds.includes(listingId);
  }, [currentUser?.favoriteIds, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!currentUser) {
        onOpen();
        return;
      }
      try {
        let request;
        if (isFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }
        await request();
        router.refresh();
        toast.success("Successfully toggled!");
      } catch (e: any) {
        toast.error(e.message ?? e);
      }
    },
    [isFavorited, listingId, currentUser, onOpen, router]
  );
  return { isFavorited, toggleFavorite };
};
