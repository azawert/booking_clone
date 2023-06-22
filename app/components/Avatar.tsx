"use client";

import Image from "next/image";
import image from "../../public/placeholder.jpg";

interface IAvatarProps {
  imageUrl?: string | null;
}

export const Avatar: React.FC<IAvatarProps> = ({ imageUrl }) => {
  return (
    <Image
      className='rounded-full'
      height='30'
      width='30'
      alt='Avatar'
      src={imageUrl ?? image}
    />
  );
};
