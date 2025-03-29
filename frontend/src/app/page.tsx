"use client";

import { Navbar } from "../components/Navbar";

export default function Home() {
  return (
    <div className="relative h-screen">
      {/* <!-- Background Pattern --> */}
      <div>
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_30%_30%,#000_60%,#f25f30_100%)]"></div>
      </div>

      
      <Navbar />

      {/* <!-- Hero Content --> */}
      <div className="mt-[20vh] flex flex-col items-center">
        <h1 className="text-[2.5rem] text-white">
          <span className="block">Lorem ipsum</span>
          <span className="text-[#F25F30]">Lorem ipsum</span>
        </h1>

        <p className="text-white max-w-[40vw] text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio sit quaerat doloremque dolor sapiente cupiditate ex obcaecati, velit molestiae dignissimos placeat sequi suscipit natus repellat voluptatum soluta adipisci minima dicta.
        </p>

        <button className="bg-[#F25F30] text-white">
          Try Now
        </button>
      </div>
    </div>
  )
}