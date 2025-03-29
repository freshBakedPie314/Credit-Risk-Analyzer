"use client";

import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="w-full bg-gradient-to-r from-[#F25F30] to-[#E04A1A] text-white py-3 px-4 rounded-md hover:from-[#E04A1A] hover:to-[#C53E10] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#F25F30] focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-[1.02] active:scale-[0.98]"
      {...props}
    >
      {children}
    </button>
  );
}