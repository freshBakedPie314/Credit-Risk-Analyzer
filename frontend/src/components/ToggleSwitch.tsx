"use client";

import { useState } from 'react';

interface ToggleSwitchProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

export default function ToggleSwitch({ options, value, onChange }: ToggleSwitchProps) {
  return (
    <div className="flex justify-center mb-6">
      <div className="relative w-full max-w-xs">
        <div className="relative flex items-center bg-[#0C0C0C] rounded-full p-1 border-2 border-[#F25F30]">
          <div
            className={`absolute top-[2px] bottom-[2px] w-[calc(50%-4px)] bg-[#F25F30] rounded-full transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] ${
              value === options[1].value ? 'left-[calc(50%+2px)]' : 'left-[2px]'
            }`}
          ></div>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`relative z-10 w-1/2 px-4 py-2 rounded-full focus:outline-none transition-colors duration-300 ${
                value === option.value ? 'text-white' : 'text-gray-400'
              }`}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}