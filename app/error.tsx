"use client";
import { useEffect } from "react";
import { EmptyState } from "./components/EmptyState";

interface IErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<IErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return <EmptyState title='Error' subtitle={String(error)} showReset />;
};
