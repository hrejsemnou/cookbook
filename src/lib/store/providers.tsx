"use client";

import { Provider as ReduxProvider } from "react-redux";
import { ReactNode } from "react";
import { store } from "@/lib/store";

const Providers = ({ children }: { children: ReactNode }) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

export default Providers;
