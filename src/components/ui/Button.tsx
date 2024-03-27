import { FC, ReactNode } from "react";

interface ButtonProps {
  width?: number;
  height?: number;
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ width, height, children }) => {
  const inlineStyle = {
    width: width ? `${width}px` : "auto", // Use 'auto' as a fallback if width is not provided
    height: height ? `${height}px` : "auto", // Use 'auto' as a fallback if height is not provided
  };

  return (
    <button
      className="rounded-[20px] border-2 border-purple-800 justify-center items-center inline-flex"
      style={inlineStyle}
    >
      {children}
    </button>
  );
};

export default Button;
