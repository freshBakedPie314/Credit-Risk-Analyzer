"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/Input';
import Button from '@/components/Button';
import ToggleSwitch from '@/components/ToggleSwitch';
import Link from 'next/link';

export default function Signup() {
  const [userType, setUserType] = useState('borrower');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: ''
  });

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 10
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "radial-gradient(ellipse 170% 75% at top, #F25F30 5%, #0C0C0C 42%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative bg-[#0C0C0C] p-6 rounded-xl w-full max-w-sm overflow-hidden"
      >
        <div 
          className="absolute inset-0 rounded-xl p-[1px] pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, #F25F30, transparent)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        ></div>
        
        <div className="relative z-10">
          <motion.h1 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-xl font-bold text-center mb-4 text-white"
          >
            Create Your Account
          </motion.h1>
          
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <ToggleSwitch
              options={[
                { value: 'borrower', label: 'Borrower' },
                { value: 'lender', label: 'Lender' }
              ]}
              value={userType}
              onChange={setUserType}
            />
          </motion.div>

          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="space-y-3"
          >
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="First Name"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <Input
                label="Last Name"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Input
                label="Email"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Input
                label="Password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                showPasswordToggle
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Input
                label="Phone Number"
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="space-y-2"
            >
              <Button type="submit">
                Register
              </Button>
              <p className="text-center text-sm text-gray-400">
                Already have an account?{' '}
                <Link href="/login" className="text-[#F25F30] hover:underline">
                  Login
                </Link>
              </p>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}