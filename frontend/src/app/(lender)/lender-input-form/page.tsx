"use client";

import { useState, ChangeEvent, useEffect } from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Select from '@/components/Select';

export default function LenderForm() {
  const [formData, setFormData] = useState({
    loan_amount: '',
    emi: '',
    tenure: '',
    rate_of_interest: '',
    gender: '',
    employment_type: '',
    residence_type: '',
    customer_age: '',
    num_loans: '',
    secured_loans: '',
    unsecured_loans: '',
    new_loans_last_3_months: '',
    tier: ''
  });

  // Calculate EMI whenever loan amount, tenure or interest rate changes
  useEffect(() => {
    if (formData.loan_amount && formData.tenure && formData.rate_of_interest) {
      const principal = parseFloat(formData.loan_amount);
      const annualRate = parseFloat(formData.rate_of_interest);
      const months = parseFloat(formData.tenure);

      if (principal > 0 && annualRate > 0 && months > 0) {
        const t = principal + principal * annualRate / 100;
        const emi = t / months;
        setFormData(prev => ({
          ...prev,
          emi: emi.toFixed(2)
        }));
      }
    }
  }, [formData.loan_amount, formData.tenure, formData.rate_of_interest]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mapped_data = {
      'Loan Amount': formData.loan_amount,
      'EMI': formData.emi,
      'Tenure': formData.tenure,
      'Rate of interest': formData.rate_of_interest,
      'Gender': formData.gender,
      'Employment type': formData.employment_type,
      'Resident type of customer': formData.residence_type,
      'Customer age when loan was taken': formData.customer_age,
      'No of loans': formData.num_loans,
      'No of secured loans': formData.secured_loans,
      'No of unsecured loans': formData.unsecured_loans,
      'No of new loans in last 3 months': formData.new_loans_last_3_months,
      'Tier': formData.tier,
      'Maximum MOB': 0
    };
    console.log('Lender data:', mapped_data);
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
        className="relative bg-[#0C0C0C] p-6 rounded-xl w-full max-w-md overflow-hidden border border-[#F25F30]/20"
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
            className="text-xl font-bold text-center mb-6 text-white"
          >
            Lender Information
          </motion.h1>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Loan Amount (₹)"
                name="loan_amount"
                type="number"
                value={formData.loan_amount}
                onChange={handleChange}
                required
                min="1"
              />

              <Input
                label="Interest Rate (%)"
                name="rate_of_interest"
                type="number"
                step="0.01"
                value={formData.rate_of_interest}
                onChange={handleChange}
                required
                min="0.01"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Tenure (months)"
                name="tenure"
                type="number"
                value={formData.tenure}
                onChange={handleChange}
                required
                min="1"
              />

            <Input
            label="EMI (₹)"
            name="emi"
            type="number"
            value={formData.emi}
            onChange={handleChange}
            required
            readOnly
            />
            </div>

            <Select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={[
                { value: '', label: 'Select Gender', disabled: true },
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
                { value: 'Other', label: 'Other' }
              ]}
              required
            />

            <Select
              label="Employment Type"
              name="employment_type"
              value={formData.employment_type}
              onChange={handleChange}
              options={[
                { value: '', label: 'Select Employment Type', disabled: true },
                { value: 'Salaried', label: 'Salaried' },
                { value: 'Self-employed', label: 'Self-employed' },
                { value: 'Unemployed', label: 'Unemployed' }
              ]}
              required
            />

            <Select
              label="Residence Type"
              name="residence_type"
              value={formData.residence_type}
              onChange={handleChange}
              options={[
                { value: '', label: 'Select Residence Type', disabled: true },
                { value: 'Owned', label: 'Owned' },
                { value: 'Rented', label: 'Rented' },
                { value: 'Other', label: 'Other' }
              ]}
              required
            />

            <Input
              label="Customer Age (years)"
              name="customer_age"
              type="number"
              value={formData.customer_age}
              onChange={handleChange}
              required
              min="18"
              max="80"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Total Loans"
                name="num_loans"
                type="number"
                value={formData.num_loans}
                onChange={handleChange}
                required
                min="0"
              />

              <Input
                label="Secured Loans"
                name="secured_loans"
                type="number"
                value={formData.secured_loans}
                onChange={handleChange}
                required
                min="0"
              />

              <Input
                label="Unsecured Loans"
                name="unsecured_loans"
                type="number"
                value={formData.unsecured_loans}
                onChange={handleChange}
                required
                min="0"
              />
            </div>

            <Input
              label="New Loans (last 3 months)"
              name="new_loans_last_3_months"
              type="number"
              value={formData.new_loans_last_3_months}
              onChange={handleChange}
              required
              min="0"
            />

            <Select
              label="Customer Tier"
              name="tier"
              value={formData.tier}
              onChange={handleChange}
              options={[
                { value: '', label: 'Select Tier', disabled: true },
                { value: 'T1', label: 'Tier 1 (Best)' },
                { value: 'T2', label: 'Tier 2 (Average)' },
                { value: 'T3', label: 'Tier 3 (Risky)' }
              ]}
              required
            />

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button type="submit" className="w-full mt-4">
                Submit Lender Information
              </Button>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}