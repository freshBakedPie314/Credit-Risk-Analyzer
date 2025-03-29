"use client";

import { useState } from 'react';

export default function Signup() {
  const [userType, setUserType] = useState('borrower');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Signup data:', { ...formData, userType });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "radial-gradient(ellipse 170% 75% at top, #F25F30 5%, #0C0C0C 42%)",
      }}
    >
      <div className="relative bg-[#0C0C0C] p-8 rounded-[20px] w-full max-w-md overflow-hidden">
        <div 
          className="absolute inset-0 rounded-[20px] p-[2px] pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, #F25F30, transparent)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        ></div>
        
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-center mb-6 text-white">Create Your Account</h1>
          
          <div className="flex justify-center mb-6">
            <div className="relative w-full max-w-xs">
              <div className="relative flex items-center bg-[#0C0C0C] rounded-full p-1 border-2 border-[#F25F30]">
                <div
                  className={`absolute top-[2px] bottom-[2px] w-[calc(50%-4px)] bg-[#F25F30] rounded-full transition-all duration-300 ${
                    userType === 'lender' ? 'left-[calc(50%+2px)]' : 'left-[2px]'
                  }`}
                ></div>
                <button
                  className={`relative z-10 w-1/2 px-4 py-2 rounded-full focus:outline-none ${
                    userType === 'borrower' ? 'text-white' : 'text-gray-400'
                  }`}
                  onClick={() => setUserType('borrower')}
                >
                  Borrower
                </button>
                <button
                  className={`relative z-10 w-1/2 px-4 py-2 rounded-full focus:outline-none ${
                    userType === 'lender' ? 'text-white' : 'text-gray-400'
                  }`}
                  onClick={() => setUserType('lender')}
                >
                  Lender
                </button>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F25F30] focus:border-[#F25F30] text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F25F30] focus:border-[#F25F30] text-white"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F25F30] focus:border-[#F25F30] text-white"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F25F30] focus:border-[#F25F30] text-white pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="mb-6 transform transition-transform duration-300 focus-within:scale-105 hover:scale-105">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300 mb-1">
              Phone Number
              </label>
              <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F25F30] focus:border-[#F25F30] text-white"
              placeholder="e.g. 1234567890"
              required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#F25F30] to-[#E04A1A] text-white py-3 px-4 rounded-md hover:from-[#E04A1A] hover:to-[#C53E10] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#F25F30] focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}