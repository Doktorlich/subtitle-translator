import type { ButtonType } from "../../models/typesUI.ts";

export default function ButtonItem({ children, className, ...props }: ButtonType) {
    return (
        <button className={className} {...props}>
            {children}
        </button>
    );
}
