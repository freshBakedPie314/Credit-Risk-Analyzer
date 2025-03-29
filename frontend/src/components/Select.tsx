// components/Select.tsx
"use client";

import { SelectHTMLAttributes, ChangeEvent } from 'react';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({
  label,
  options,
  className = '',
  onChange,
  ...props
}: SelectProps) {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <select
        {...props}
        onChange={onChange}
        className={`w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F25F30] focus:border-[#F25F30] text-white ${
          props.disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}