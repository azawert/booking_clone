"use client";

import { useCountries } from "@/app/hooks/useCountries";
import Select from "react-select";

export type TCountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface ICountrySelectProps {
  value?: TCountrySelectValue;
  onChange: (value: TCountrySelectValue) => void;
}

export const CountrySelect: React.FC<ICountrySelectProps> = ({
  onChange,
  value,
}) => {
  const { getAll, getByValue } = useCountries();
  const countries = getAll();
  return (
    <div>
      <Select
        placeholder='Anywhere'
        isClearable
        options={countries}
        value={value}
        onChange={(v) => onChange(v as TCountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className='flex flex-row items-center gap-3'>
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className='ml-1 text-neutral-800'>{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};
