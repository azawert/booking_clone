"use client";

import { FC } from "react";
import { Container } from "../Container";

export const Navbar: FC = () => {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container></Container>
      </div>
    </div>
  );
};
