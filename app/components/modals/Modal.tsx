"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Button } from "../Button";
import { FieldValues, UseFormReset } from "react-hook-form";
interface IModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  footer?: React.ReactElement;
  body?: React.ReactElement;
  title?: string;
  secondaryAction?: () => void;
  disabled?: boolean;
  secondaryActionLabel?: string;
  actionLabel: string;
  reset?: UseFormReset<FieldValues>;
}

export const Modal: React.FC<IModalProps> = ({
  actionLabel,
  onClose,
  onSubmit,
  body,
  disabled,
  footer,
  isOpen,
  secondaryAction,
  secondaryActionLabel,
  title,
  reset,
}) => {
  const [isModalShowed, setIsModalShowed] = useState(isOpen);
  useEffect(() => {
    setIsModalShowed(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setIsModalShowed(false);
    setTimeout(() => {
      onClose();
      reset?.();
    }, 300);
  }, [disabled, onClose, reset]);
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);
  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);
  if (!isOpen) {
    return null;
  }

  return (
    <div className='justify-center flex items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70'>
      <div className='relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto'>
        {/* modal content */}
        <div
          className={`translate duration-300 h-full ${
            isModalShowed ? "translate-y-0" : "translate-y-full"
          } ${isModalShowed ? "opacity-100" : "opacity-0"}`}
        >
          <div className='translate h-full lg:h-auto md:h-auto border-0 relative rounded-lg shadow-lg flex flex-col w-full bg-white outline-none focus:outline-none'>
            {/* modal header */}
            <div className='flex items-center p-6 rounded-t justify-center border-b-[1px]'>
              <button
                onClick={handleClose}
                className='p-1 border-0 hover:opacity-70 transition absolute left-9'
              >
                <IoMdClose size={18} />
              </button>
              {/* title */}
              <div className='text-lg font-semibold'>{title}</div>
            </div>
            {/* body */}
            <div className='relative p-6 flex-auto'>{body}</div>
            {/* footer */}
            <div className='flex flex-col gap-2 p-6'>
              <div className='flex flex-row w-full gap-4 items-center'>
                {secondaryActionLabel && secondaryAction && (
                  <Button
                    isDisabled={disabled}
                    label={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                    isOutline
                  />
                )}

                <Button
                  isDisabled={disabled}
                  label={actionLabel}
                  onClick={handleSubmit}
                />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
