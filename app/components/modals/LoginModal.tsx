"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Modal } from "./Modal";
import { Input } from "../inputs/Input";
import { Heading } from "../Heading";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useLoginModal } from "@/app/hooks/useLoginModal";
import { Button } from "../Button";
import { useRegisterModal } from "@/app/hooks/useRegisterModal";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

export const LoginModal = () => {
  const router = useRouter();
  const { isOpen, onClose } = useLoginModal();
  const { onOpen: openRegistrationModal } = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    mode: "onChange",
    defaultValues: {
      password: "",
      email: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((cb) => {
      setIsLoading(false);
      if (cb?.ok) {
        toast.success("Successfully logged in");
        router.refresh();
        onClose();
      }
      if (cb?.error) {
        toast.error(cb.error);
      }
    });
  };
  const handleOpenAnotherModal = () => {
    onClose();
    openRegistrationModal();
  };
  const body = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome back!' subtitle={"Login into your account!"} />
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
          <div>{`Don't have an account?`}</div>
          <div
            className='text-neutral-800 cursor-pointer hover:underline'
            onClick={handleOpenAnotherModal}
          >
            Create one
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title={"Login"}
      actionLabel='Continue'
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={body}
      reset={reset}
      footer={footer}
    />
  );
};
