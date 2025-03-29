import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <div className="flex justify-around w-[100vw] items-center px-4 py-6">
        {/* Logo */}
        <div className="flex gap-2 items-center">
            <div>
              <Image src="/logo.png" alt="logo" width={40} height={40} />
            </div>
            <div>
                <h1 className="text-[1.4rem]/[1.6rem] font-roboto font-medium ">CrediSure</h1>
                <p className="text-[.65rem] font-moulpali font-thin">SMARTER RISKS, SAFER LENDING</p>
            </div>
        </div>

        {/* Navbar */}
        <div className="flex items-center gap-[2rem]">
          <Link href="/" className="font-inter font-semibold">Home</Link>
          <Link href="/about" className="font-inter font-semibold">About</Link>
          <Link href="/credit-score" className="font-inter font-semibold">Credit Score</Link>
          <Link href="/dashboard" className="font-inter font-semibold">Dashboard</Link>
        </div>

        {/* Authentication */}
        <div>
          <Link href="/login">
            <button className="bg-white text-black">Get Started</button>
          </Link>
        </div>

    </div>
  )
}