"use client";
import { AiOutlineMenu } from "react-icons/ai";
import { Avatar } from "../Avatar";
import { useCallback, useState } from "react";
import { MenuItem } from "./MenuItem";

export const UserMenu: React.FC = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsMenuOpened((prev) => !prev);
  }, []);
  return (
    <div className='relative'>
      <div className='flex flex-row gap-3 items-center'>
        <div
          className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 cursor-pointer transition'
          onClick={() => {}}
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar />
          </div>
        </div>
      </div>
      {isMenuOpened && (
        <div className='absolute rounded-xl shadow-md w-[40vw] top-12 text-sm right-0 bg-white overflow-hidden md:w-3/4'>
          <div className='flex flex-col cursor-pointer'>
            <>
              <MenuItem label={"Login"} onClick={() => {}} />
              <MenuItem label={"Sign up"} onClick={() => {}} />
            </>
          </div>
        </div>
      )}
    </div>
  );
};
