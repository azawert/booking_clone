import React from "react";
import { TSafeUser } from "../types";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useFavorite } from "../hooks/useFavorite";

interface IHeartButton {
  listingId: string;
  currentUser?: TSafeUser | null;
}

export const HeartButton: React.FC<IHeartButton> = ({
  currentUser,
  listingId,
}) => {
  const { isFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <button
      onClick={toggleFavorite}
      className='relative hover:opacity-80 transition cursor-pointer'
    >
      <AiOutlineHeart
        size={28}
        className='fill-white absolute -top-[2px] -right-[2px]'
      />
      <AiFillHeart
        className={isFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
        size={24}
      />
    </button>
  );
};
