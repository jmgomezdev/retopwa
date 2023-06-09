"use client";

import { ReactNode } from "react";
import { RecoilRoot } from "recoil";

function RecoilRootWrapper({ children }: { children: ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}

export default RecoilRootWrapper;
