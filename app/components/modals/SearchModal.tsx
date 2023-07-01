"use client";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { Modal } from "./Modal";
import { useSearchModal } from "@/app/hooks/useSearchModal";
import { CountrySelect, TCountrySelectValue } from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import { formatISO } from "date-fns";
import { Heading } from "../Heading";
import { Calendar } from "../inputs/Calendar";
import { Counter } from "../inputs/Counter";

enum STEPS {
  LOCATION,
  DATE,
  INFO,
}

export const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const { onClose, isOpen, onOpen } = useSearchModal();

  const [location, setLocation] = useState<TCountrySelectValue | null>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestsCount, setGuestsCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range | null>({
    startDate: new Date(),
    key: "selection",
    endDate: new Date(),
  });
  const Map = useMemo(
    () => dynamic(() => import("../Map").then((m) => m.Map), { ssr: false }),
    [location]
  );
  const onBack = useCallback(() => {
    setStep((val) => val - 1);
  }, []);
  const onNext = useCallback(() => {
    setStep((val) => val + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestsCount,
      roomCount,
      bathroomCount,
    };
    if (dateRange?.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange?.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      {
        skipNull: true,
      }
    );
    setStep(STEPS.LOCATION);
    onClose();
    router.push(url);
    setDateRange(null);
    setLocation(null);
  }, [
    bathroomCount,
    dateRange,
    guestsCount,
    location,
    onClose,
    onNext,
    params,
    router,
    step,
    roomCount,
  ]);
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }
    return "Go back";
  }, [step]);
  const actionLabel = useMemo(() => {
    if (step !== STEPS.INFO) {
      return "Go next";
    }
    return "Search!";
  }, [step]);
  let body = (
    <div className='flex flex-col gap-8'>
      <Heading
        title={"Where do you wanna go?"}
        subtitle='Find the perfect location'
      />
      <CountrySelect onChange={(v) => setLocation(v)} value={location!} />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    body = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='When do you plan to go?'
          subtitle='Make sure everyone is free!'
        />

        <Calendar
          onChange={(v) => setDateRange(v.selection)}
          value={dateRange}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    body = (
      <div className='flex flex-col gap-8'>
        <Heading
          title={"More information"}
          subtitle='Find your perfect place'
        />
        <Counter
          title={"Guests"}
          subtitle='How many guests are coming?'
          onChange={(v) => setGuestsCount(v)}
          value={guestsCount}
        />
        <Counter
          title={"Bathrooms"}
          subtitle='How many bathrooms do you need?'
          onChange={(v) => setBathroomCount(v)}
          value={bathroomCount}
        />
        <Counter
          title={"Rooms"}
          subtitle='How many rooms do you need?'
          onChange={(v) => setRoomCount(v)}
          value={roomCount}
        />
      </div>
    );
  }
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={onSubmit}
      title={"Filters"}
      actionLabel={actionLabel}
      secondaryAction={onBack}
      secondaryActionLabel={secondaryActionLabel}
      body={body}
    />
  );
};
