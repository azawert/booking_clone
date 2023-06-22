"use client";
import { useRentModal } from "@/app/hooks/useRentModal";
import { Modal } from "./Modal";
import { useMemo, useState } from "react";
import { Heading } from "../Heading";
import { categories } from "../nav/Categories";
import { CategoryInput } from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CountrySelect } from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import { IMapProps } from "../Map";
import { Counter } from "../inputs/Counter";
import { ImageUpload } from "../inputs/ImageUpload";
import { Input } from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY,
  LOCATION,
  INFO,
  IMAGES,
  DESCRIPTION,
  PRICE,
}

export const RentModal: React.FC = () => {
  const { isOpen: isRentModalOpened, onClose: closeRentModal } = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestsCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });
  const [category, location, guestsCount, roomCount, bathroomCount, imageSrc] =
    watch([
      "category",
      "location",
      "guestsCount",
      "roomCount",
      "bathroomCount",
      "imageSrc",
    ]);

  const onBack = () => {
    setStep((prev) => prev - 1);
  };
  const onForward = () => {
    setStep((prev) => prev + 1);
  };
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return;
    }
    setIsLoading(true);
    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Congratulations!");
        router.refresh();
        reset();
        setStep(0);
        closeRentModal();
      })
      .catch((e) => toast.error(e.message ?? e))
      .finally(() => setIsLoading(false));
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const setCastValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };
  const Map = useMemo(
    () =>
      dynamic<IMapProps>(() => import("../Map").then((m) => m.Map), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );
  let body = (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Which of these best describes your place'
        subtitle='Pick a category'
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
        {categories.map((item) => (
          <div key={item.label} className='col-span-1'>
            <CategoryInput
              icon={item.icon}
              label={item.label}
              onClick={(category) => setCastValue("category", category)}
              selected={item.label === category}
            />
          </div>
        ))}
      </div>
    </div>
  );
  if (step === STEPS.LOCATION) {
    body = (
      <div className='flex flex-col gap-8'>
        <Heading
          title={"Where is your place located?"}
          subtitle={"Help your guests :)"}
        />
        <CountrySelect
          onChange={(val) => setCastValue("location", val)}
          value={location}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    body = (
      <div className='flex flex-col gap-8'>
        <Heading
          title={"Share some basics about your place"}
          subtitle='What amenities do you have'
        />
        <Counter
          title='Guests'
          subtitle='How many guests do you allow?'
          value={guestsCount}
          onChange={(value) => setCastValue("guestsCount", value)}
        />
        <hr />
        <Counter
          title='Rooms'
          subtitle='How many rooms do you have?'
          value={roomCount}
          onChange={(value) => setCastValue("roomCount", value)}
        />
        <hr />
        <Counter
          title='Bathrooms'
          subtitle='How many bathrooms do you have?'
          value={bathroomCount}
          onChange={(value) => setCastValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    body = (
      <div className='flex flex-col gap-8'>
        <Heading
          title={"Add a photo of your place"}
          subtitle='Show guests what your place looks like!'
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCastValue("imageSrc", value)}
        />
      </div>
    );
  }
  if (step === STEPS.DESCRIPTION) {
    body = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='How would you describe your place?'
          subtitle='Short and sweet works best!'
        />
        <Input
          errors={errors}
          id='title'
          label='Title'
          isDisabled={isLoading}
          required
          register={register}
        />
        <hr />
        <Input
          errors={errors}
          id='description'
          label='Description'
          isDisabled={isLoading}
          required
          register={register}
        />
      </div>
    );
  }
  if (step === STEPS.PRICE) {
    body = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Now, set your price'
          subtitle='How much do you charge per night?'
        />
        <Input
          id='price'
          formatPrice
          label={"Price"}
          type='number'
          isDisabled={isLoading}
          errors={errors}
          required
          register={register}
        />
      </div>
    );
  }

  return (
    <Modal
      title={"Airbnb your home"}
      isOpen={isRentModalOpened}
      onClose={closeRentModal}
      actionLabel={actionLabel}
      onSubmit={step === STEPS.PRICE ? handleSubmit(onSubmit) : onForward}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={body}
      disabled={isLoading}
    />
  );
};
