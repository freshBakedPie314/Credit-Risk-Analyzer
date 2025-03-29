import React from "react";

interface FeatureCardProps {
  title: string;
  desc: string;
}

export function FeatureCard({ title, desc }: FeatureCardProps) {
  return (
    <div className="mt-[3rem] h-[250px] w-[400px] p-6 bg-black border border-gray-800 rounded-lg shadow-[4px_4px_8px_2px_rgba(242,95,48,0.4)] hover:shadow-[5px_5px_10px_3px_rgba(242,95,48,0.5)] transition-shadow">
      <div className="h-[2.5rem] w-[2.5rem] text-center rounded-full bg-gray-500"></div>
      <h1 className="mt-[1rem] text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h1>
      <p className="pt-3">{desc}</p>
    </div>
  );
}