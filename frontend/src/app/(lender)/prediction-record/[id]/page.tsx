"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, CreditCard, User, Briefcase, Home, AlertCircle, Shield } from 'lucide-react';
import Link from 'next/link';

// Borrower interface based on your data structure
interface Borrower {
  id: number;
  loan_amount: number;
  emi: number;
  tenure: number;
  rate_of_interest: number;
  customer_age: number;
  gender: string;
  employment_type: string;
  residence_type: string;
  num_loans: number;
  secured_loans: number;
  unsecured_loans: number;
  new_loans_last_3_months: number;
  tier: string;
  credit_score: number;
  risk_level: string;
  default_probability: number;
  default_prediction: boolean;
  created_at: string;
}

// Mock API function - replace with your actual API call
const fetchBorrowerById = async (id: string): Promise<Borrower | null> => {
  // In a real app, you would fetch from your API
  // For example: return fetch(`/api/borrowers/${id}`).then(res => res.json());
  
  // Mock data for demonstration
  const mockBorrower: Borrower = {
    id: parseInt(id),
    loan_amount: 100000.0,
    emi: 4000.0,
    tenure: 48,
    rate_of_interest: 9.8,
    customer_age: 60,
    gender: "Female",
    employment_type: "RET",
    residence_type: "OWN",
    num_loans: 6,
    secured_loans: 4,
    unsecured_loans: 2,
    new_loans_last_3_months: 0,
    tier: "Tier 1",
    credit_score: 56,
    risk_level: "Moderate Risk",
    default_probability: 0.43537524342536926,
    default_prediction: false,
    created_at: "2025-03-29T10:23:34.529806Z"
  };
  
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => resolve(mockBorrower), 500);
  });
};

export default function BorrowerDetails() {
  const params = useParams();
  const router = useRouter();
  const [borrower, setBorrower] = useState<Borrower | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Get the borrower ID from the URL params
  const borrowerId = params.id as string;
  
  useEffect(() => {
    const loadBorrower = async () => {
      try {
        setLoading(true);
        const data = await fetchBorrowerById(borrowerId);
        setBorrower(data);
      } catch (error) {
        console.error("Failed to fetch borrower:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadBorrower();
  }, [borrowerId]);
  
  // Function to get risk badge styling
  const getRiskBadge = (risk: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    
    if (risk.includes("Low")) {
      return <span className={`${baseClasses} bg-green-900 text-green-300`}>{risk}</span>;
    } else if (risk.includes("Moderate")) {
      return <span className={`${baseClasses} bg-amber-900 text-amber-300`}>{risk}</span>;
    } else {
      return <span className={`${baseClasses} bg-red-900 text-red-300`}>{risk}</span>;
    }
  };
  
  // Function to get appropriate icon for employment type
  const getEmploymentIcon = (type: string) => {
    switch (type) {
      case "RET":
        return <Calendar className="w-5 h-5 text-gray-400" />;
      default:
        return <Briefcase className="w-5 h-5 text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0C0C0C] text-white p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F25F30]"></div>
      </div>
    );
  }

  if (!borrower) {
    return (
      <div className="min-h-screen bg-[#0C0C0C] text-white p-6">
        <div className="max-w-4xl mx-auto text-center py-12">
          <AlertCircle className="w-16 h-16 text-[#F25F30] mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Borrower Not Found</h2>
          <p className="text-gray-400 mb-6">The borrower you're looking for doesn't exist or has been removed.</p>
          <Link 
            href="/borrowers"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#F25F30] text-white rounded-lg hover:bg-[#D95429] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Borrowers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header with back button */}
        <div className="mb-8">
          <button 
            onClick={() => router.push('/borrowers')}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Borrowers
          </button>
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold">Borrower Details</h1>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-[#1A1A1A] border border-gray-700 text-white rounded-lg hover:border-[#F25F30] transition-colors">
                Edit
              </button>
              <button className="px-4 py-2 bg-[#F25F30] text-white rounded-lg hover:bg-[#D95429] transition-colors">
                Analyze Risk
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column - Personal details */}
          <div className="md:col-span-1">
            <div className="bg-[#1A1A1A] rounded-lg p-6 border border-gray-800">
              <h2 className="text-lg font-semibold mb-4">Borrower Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Borrower #{borrower.id}</div>
                    <div className="font-medium">{borrower.gender}, {borrower.customer_age} years</div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-sm text-gray-400 mb-1">Credit Score</div>
                  <div className={`font-medium ${
                    borrower.credit_score >= 70 ? 'text-green-400' : 
                    borrower.credit_score >= 50 ? 'text-amber-400' : 'text-red-400'
                  }`}>
                    {borrower.credit_score}/100
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                    <div
                      className={`h-2 rounded-full ${
                        borrower.credit_score >= 70 ? 'bg-green-500' : 
                        borrower.credit_score >= 50 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${borrower.credit_score}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-sm text-gray-400 mb-1">Risk Assessment</div>
                  <div className="flex items-center gap-2 mb-2">
                    {borrower.risk_level.includes("Low") ? (
                      <Shield className="w-5 h-5 text-green-500" />
                    ) : borrower.risk_level.includes("Moderate") ? (
                      <AlertCircle className="w-5 h-5 text-amber-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                    {getRiskBadge(borrower.risk_level)}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Default Probability:</span>
                    <span className="font-mono">{(borrower.default_probability * 100).toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-400">Default Prediction:</span>
                    <span className={borrower.default_prediction ? "text-red-400" : "text-green-400"}>
                      {borrower.default_prediction ? "Yes" : "No"}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-sm text-gray-400 mb-2">Personal Details</div>
                  
                  <div className="flex items-center gap-3 mb-3">
                    {getEmploymentIcon(borrower.employment_type)}
                    <div>
                      <div className="text-sm text-gray-400">Employment</div>
                      <div className="font-medium">
                        {borrower.employment_type === "RET" ? "Retired" : borrower.employment_type}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Home className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-400">Residence</div>
                      <div className="font-medium">
                        {borrower.residence_type === "OWN" ? "Owner" : "Rented"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Loan details */}
          <div className="md:col-span-2">
            <div className="bg-[#1A1A1A] rounded-lg p-6 border border-gray-800 mb-6">
              <h2 className="text-lg font-semibold mb-4">Loan Details</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Loan Amount</div>
                  <div className="text-2xl font-mono font-semibold">${borrower.loan_amount.toLocaleString()}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400 mb-1">Monthly EMI</div>
                  <div className="text-2xl font-mono font-semibold">${borrower.emi.toLocaleString()}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400 mb-1">Interest Rate</div>
                  <div className="text-xl font-semibold">{borrower.rate_of_interest}%</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400 mb-1">Tenure</div>
                  <div className="text-xl font-semibold">{borrower.tenure} months</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400 mb-1">Customer Tier</div>
                  <div className="text-xl font-semibold">{borrower.tier}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400 mb-1">Created On</div>
                  <div className="text-xl font-semibold">
                    {new Date(borrower.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1A1A1A] rounded-lg p-6 border border-gray-800">
              <h2 className="text-lg font-semibold mb-4">Credit History</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-[#0C0C0C] rounded-lg p-4 border border-gray-800">
                  <div className="text-sm text-gray-400 mb-1">Total Loans</div>
                  <div className="text-3xl font-semibold">{borrower.num_loans}</div>
                </div>
                
                <div className="bg-[#0C0C0C] rounded-lg p-4 border border-gray-800">
                  <div className="text-sm text-gray-400 mb-1">Secured Loans</div>
                  <div className="text-3xl font-semibold">{borrower.secured_loans}</div>
                </div>
                
                <div className="bg-[#0C0C0C] rounded-lg p-4 border border-gray-800">
                  <div className="text-sm text-gray-400 mb-1">Unsecured Loans</div>
                  <div className="text-3xl font-semibold">{borrower.unsecured_loans}</div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-400">New Loans (Last 3 Months)</div>
                  <div className="font-medium">{borrower.new_loans_last_3_months}</div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      borrower.new_loans_last_3_months <= 1 ? 'bg-green-500' : 
                      borrower.new_loans_last_3_months <= 3 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(borrower.new_loans_last_3_months * 10, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}