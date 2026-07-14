import React from "react";
import logo from "../assets/images/logo.png"; // <-- Change this path to where your logo actually is

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Logo({
  className = "",
  size = "md",
}: LogoProps) {
  const sizes = {
    sm: "h-10",
    md: "h-14",
    lg: "h-16",
    xl: "h-20",
  };

  return (
    <img
      src={logo}
      alt="Caldo Freddo"
      className={`${sizes[size]} w-auto object-contain ${className}`}
      draggable={false}
    />
  );
}