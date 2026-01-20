import type { ReactNode } from "react";

export interface ButtonType {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean
}

export interface CardContainer {
    title: string;
    children: ReactNode;
}

export interface Children {
    children: ReactNode;
}

export interface SubtitleItemProps {
    fileName: string;
    projectId: string | number; // укажите тип, который используется в ISubtitleProject
    children?: ReactNode; // ReactNode — это стандартный тип для дочерних элементов в React
}

export interface SelectorItemProps {
    id: string;
    label: string;
    email: string;
    type: string;
}
