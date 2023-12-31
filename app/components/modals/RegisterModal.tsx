"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState, useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useRegisterModal } from "@/app/hooks/useRegisterModal";
import { Modal } from "./Modal";
import { Heading } from "../Heading";
import { Input } from "../inputs/Input";
import { toast } from "react-hot-toast";
import { Button } from "../Button";
import { useLoginModal } from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const RegisterModal = () => {
  const { isOpen, onClose } = useRegisterModal();

  const { onOpen: openLoginModal } = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    mode: "onChange",
    defaultValues: {
      name: "",
      password: "",
      email: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        onClose();
        openLoginModal();
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setIsLoading(false));
  };
  const handleOpenLoginModal = useCallback(() => {
    onClose();
    openLoginModal();
  }, [onClose, openLoginModal]);
  const body = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome!' subtitle={"Create an account"} />
      <Input
        register={register}
        id={"email"}
        label={"Email"}
        isDisabled={isLoading}
        errors={errors}
        required
      />
      <Input
        register={register}
        id={"name"}
        label={"Name"}
        isDisabled={isLoading}
        errors={errors}
        required
      />
      <Input
        register={register}
        id={"password"}
        label={"Password"}
        isDisabled={isLoading}
        errors={errors}
        required
        type={"password"}
      />
    </div>
  );
  const footer = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button
        isOutline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        isOutline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className='flex flex-row items-center gap-2 justify-center'>
          <div>Already have an account?</div>
          <div
            className='text-neutral-800 cursor-pointer hover:underline'
            onClick={handleOpenLoginModal}
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title={"Register"}
      actionLabel='Continue'
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={body}
      reset={reset}
      footer={footer}
    />
  );
};
