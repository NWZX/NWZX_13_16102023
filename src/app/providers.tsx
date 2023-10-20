'use client';

import { DataContextProvider } from "@/context/DataContext";
import { ReactNode } from "react";

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <DataContextProvider>{children}</DataContextProvider>
  );
}
