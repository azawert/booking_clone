"use client";
import { useRentModal } from "@/app/hooks/useRentModal";
import { Modal } from "./Modal";
import { useMemo, useState } from "react";
import { Heading } from "../Heading";
import { categories } from "../nav/Categories";
import { CategoryInput } from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import { CountrySelect } from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import { IMapProps } from "../Map";
import { Counter } from "../inputs/Counter";
import { ImageUpload } from "../inputs/ImageUpload";

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
      title: "",
      description: "",
    },
  });
  const [category, location, guestsCount, roomCount, bathroomCount] = watch([
    "category",
    "location",
    "guestsCount",
    "roomCount",
    "bathroomCount",
  ]);

  const onBack = () => {
    setStep((prev) => prev - 1);
  };
  const onForward = () => {
    setStep((prev) => prev + 1);
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
        <ImageUpload />
      </div>
    );
  }
  return (
    <Modal
      title={"Airbnb your home"}
      isOpen={isRentModalOpened}
      onClose={closeRentModal}
      actionLabel={actionLabel}
      onSubmit={actionLabel === "Create" ? () => {} : onForward}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={body}
      disabled={Object.keys(errors).length > 0}
    />
  );
};
