"use client";

import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { FeatureCard } from "../components/FeatureCard";

export default function Home() {
  return (
    <div>
      <div className="p-1 min-h-screen">
        <Navbar />

        {/* Hero Content */}
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-[2.5rem] lg:max-w-[40%] font-bold text-center mt-[2rem]">
            <span>Analyze thoroughly, and </span>
            <br />
            <span className="text-[#F25F30]">ensure secure lending.</span>
          </h1>

          <p className="text-[1.15rem] max-w-[75%] lg:max-w-[40%] text-center mt-[1rem]">
            Leverage accurate credit analysis to make confident lending decisions and minimize financial risk.
          </p>

          <button className="bg-[#F25F30] text-white px-3 py-1 rounded-md font-bold mt-[2rem]">Try Now</button>
        </div>
      </div>

      {/* Essential Features */}
      <div className="flex flex-col items-center bg-black text-white px-4 py-[6rem]">
        <h1 className="font-extrabold text-5xl bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent text-center">
          ESSENTIAL FEATURES IN OUR PROJECT
        </h1>

        <div className="relative flex flex-col items-center lg:flex-row justify-around w-[50%] gap-[1.5rem]">
          <FeatureCard title="Data Collection And Analysis" desc="Financial data, Credit History, Market data and Customer Profiling" />
          <FeatureCard title="Credit Scroing Models" desc="Machine learning model, and Score calculation" />
        </div>

        <div className="relative flex flex-col items-center lg:flex-row justify-around w-[50%] gap-[1.5rem]">
          <FeatureCard title="Risk Prediction and Evaluation" desc="Default Probability, Loss Given Default (LGD), Exposure at Default (EAD), and Risk Segmentation" />
          <FeatureCard title="Automated Descision Support" desc="Approval Recommendations, Risk Alerts, and Credit Limits" />
        </div>
      </div>

    </div>
  )
}