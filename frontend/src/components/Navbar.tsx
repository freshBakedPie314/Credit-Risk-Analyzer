import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <div className="flex justify-around items-center py-6">
        {/* Logo */}
        <div className="flex gap-2 items-center">
            <Link href="/">
              <Image src="/logo.png" alt="logo" width={40} height={40} />
            </Link>
            <Link href="/">
                <h1 className="text-[1.4rem]/[1.6rem] font-roboto font-medium ">CrediSure</h1>
                <p className="text-[.65rem] font-moulpali font-thin">SMARTER RISKS, SAFER LENDING</p>
            </Link>
        </div>

        {/* Navbar */}
        <div className=" hidden md:flex items-center gap-[2rem]">
          <Link href="/" className="font-inter font-semibold">Home</Link>
          <Link href="/about" className="font-inter font-semibold">About</Link>
          <Link href="/prediction-record" className="font-inter font-semibold">Prediction Record</Link>
          <Link href="/new-borrower" className="font-inter font-semibold">New Borrower</Link>
        </div>

        {/* Authentication */}
        <div>
          <Link href="/signup">
            <button className="bg-[#f25f30] text-white px-4 py-2 rounded-full cursor-pointer">
              Get Started
            </button>
          </Link>
        </div>

    </div>
  )
}