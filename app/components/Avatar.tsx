"use client";

import Image from "next/image";
import image from "../../public/placeholder.jpg";

export const Avatar: React.FC = () => {
  return (
    <Image
      className='rounded-full'
      height='30'
      width='30'
      alt='Avatar'
      src={image}
    />
  );
};
