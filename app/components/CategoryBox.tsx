"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import qstring from "query-string";

interface ICategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

export const CategoryBox: React.FC<ICategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClickOnCategory = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = qstring.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }
    const url = qstring.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      {
        skipNull: true,
      }
    );
    router.push(url);
  }, [params, label, router]);
  return (
    <div
      className={`flex flex-col items-center justify-center p-3 gap-2 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
        selected ? "border-b-neutral-800" : "border-transparent"
      } ${selected ? "text-neutral-800" : "text-neutral-500"}`}
      onClick={handleClickOnCategory}
    >
      <Icon size={26} />
      <div className='text-sm font-medium'>{label}</div>
    </div>
  );
};
