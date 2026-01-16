import type { ReactNode } from "react";

export interface ButtonType {
  children: ReactNode;
  className?: string | string[];
}


export interface CardContainer {
  title: string;
  children: ReactNode;
}

export  interface BlockFileList {
  children: ReactNode;
}
