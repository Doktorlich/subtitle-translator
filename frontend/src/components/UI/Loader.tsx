import React from "react";
import { motion, type Transition } from "framer-motion";

interface LoaderProps {
    size?: number;
    color?: string;
    thickness?: number;
}

const Loader: React.FC<LoaderProps> = ({
    size = 40,
    color = "#3b82f6", // Дефолтный синий
    thickness = 4,
}) => {
    const spinTransition: Transition = {
        repeat: Infinity,
        ease: "linear",
        duration: 1,
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: size,
                height: size,
            }}
        >
            <motion.span
                style={{
                    display: "block",
                    width: size,
                    height: size,
                    border: `${thickness}px solid #e5e7eb`, // Цвет подложки (серый)
                    borderTop: `${thickness}px solid ${color}`, // Цвет активной части
                    borderRadius: "50%",
                    boxSizing: "border-box",
                }}
                animate={{ rotate: 360 }}
                transition={spinTransition}
            />
        </div>
    );
};

export default Loader;
