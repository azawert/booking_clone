"use client";
import { AiOutlineMenu } from "react-icons/ai";
import { Avatar } from "../Avatar";
import { useCallback, useState } from "react";
import { MenuItem } from "./MenuItem";
import { useRegisterModal } from "@/app/hooks/useRegisterModal";
import { useLoginModal } from "@/app/hooks/useLoginModal";

import { signOut } from "next-auth/react";
import { TSafeUser } from "@/app/types";
import { useRentModal } from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface IUserMenuProps {
  currentUser?: TSafeUser | null;
}

export const UserMenu: React.FC<IUserMenuProps> = ({ currentUser }) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const { onOpen: openRegistrationModal } = useRegisterModal();
  const { onOpen: openLoginModal } = useLoginModal();
  const { onOpen: openRentModal } = useRentModal();
  const router = useRouter();
  const toggleOpen = useCallback(() => {
    setIsMenuOpened((prev) => !prev);
  }, []);
  const onRent = useCallback(() => {
    if (!currentUser) {
      return openRegistrationModal();
    }
    openRentModal();
    toggleOpen();
  }, [currentUser, openRegistrationModal, openRentModal, toggleOpen]);
  return (
    <div className='relative'>
      <div className='flex flex-row gap-3 items-center'>
        <div
          className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 cursor-pointer transition'
          onClick={onRent}
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar imageUrl={currentUser?.image ?? undefined} />
          </div>
        </div>
      </div>
      {isMenuOpened && (
        <div className='absolute rounded-xl shadow-md w-[40vw] top-12 text-sm right-0 bg-white overflow-hidden md:w-3/4'>
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
                <MenuItem
                  label={"My trips"}
                  onClick={() => router.push("/trips")}
                />
                <MenuItem
                  label={"My favorites"}
                  onClick={() => router.push("/favorites")}
                />
                <MenuItem
                  label={"My properties"}
                  onClick={() => router.push("/properties")}
                />
                <MenuItem
                  label={"My reservations"}
                  onClick={() => router.push("/reservations")}
                />
                <MenuItem
                  label={"Airbnb my home"}
                  onClick={() => {
                    openRentModal();
                    toggleOpen();
                  }}
                />
                <hr />
                <MenuItem label={"Logout"} onClick={signOut} />
              </>
            ) : (
              <>
                <MenuItem label={"Login"} onClick={openLoginModal} />
                <MenuItem label={"Sign up"} onClick={openRegistrationModal} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
