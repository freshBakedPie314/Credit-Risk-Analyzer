"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Search, Filter, UserCircle, AlertCircle, CheckCircle, Shield } from 'lucide-react';

// Updated data model for borrowers
type RiskLevel = 'high' | 'medium' | 'low';

interface Borrower {
  id: string;
  name: string;
  email: string;
  loanAmount: number;
  loanTerm: number;
  creditScore: number; // Now on a scale of 1-100
  riskLevel: RiskLevel;
  lastAnalyzed: string;
}

// Sample data with updated fields
const sampleBorrowers: Borrower[] = [
  {
    id: 'b001',
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    loanAmount: 25000,
    loanTerm: 36,
    creditScore: 82,
    riskLevel: 'low',
    lastAnalyzed: '2025-03-25'
  },
  {
    id: 'b002',
    name: 'Maya Rodriguez',
    email: 'maya.r@example.com',
    loanAmount: 15000,
    loanTerm: 24,
    creditScore: 68,
    riskLevel: 'medium',
    lastAnalyzed: '2025-03-28'
  },
  {
    id: 'b003',
    name: 'David Chen',
    email: 'david.c@example.com',
    loanAmount: 50000,
    loanTerm: 60,
    creditScore: 39,
    riskLevel: 'high',
    lastAnalyzed: '2025-03-20'
  },
  {
    id: 'b004',
    name: 'Sarah Williams',
    email: 'sarah.w@example.com',
    loanAmount: 10000,
    loanTerm: 12,
    creditScore: 94,
    riskLevel: 'low',
    lastAnalyzed: '2025-03-24'
  },
  {
    id: 'b005',
    name: 'James Taylor',
    email: 'james.t@example.com',
    loanAmount: 30000,
    loanTerm: 48,
    creditScore: 52,
    riskLevel: 'medium',
    lastAnalyzed: '2025-03-22'
  }
];

export default function BorrowerList() {
  const [borrowers, setBorrowers] = useState<Borrower[]>(sampleBorrowers);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Borrower | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [riskFilter, setRiskFilter] = useState<RiskLevel | 'all'>('all');

  // Filter borrowers based on search term and risk level
  const filteredBorrowers = borrowers.filter(borrower => 
    (borrower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     borrower.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (riskFilter === 'all' || borrower.riskLevel === riskFilter)
  );

  // Sort borrowers
  const sortedBorrowers = [...filteredBorrowers].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    return 0;
  });

  // Handle sort
  const handleSort = (field: keyof Borrower) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
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
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Get risk level badge styles
  const getRiskBadge = (risk: RiskLevel) => {
    const baseClasses = "px-2 py-1 rounded text-xs font-medium";
    
    switch (risk) {
      case 'low':
        return <span className={`${baseClasses} bg-green-900 text-green-300`}>Low Risk</span>;
      case 'medium':
        return <span className={`${baseClasses} bg-amber-900 text-amber-300`}>Medium Risk</span>;
      case 'high':
        return <span className={`${baseClasses} bg-red-900 text-red-300`}>High Risk</span>;
    }
  };

  const getRiskIcon = (risk: RiskLevel) => {
    switch (risk) {
      case 'low':
        return <Shield className="w-5 h-5 text-green-500" />;
      case 'medium':
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case 'high':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-2xl font-bold mb-8">Borrower Management</h1>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full bg-[#1A1A1A] text-white border border-gray-700 rounded-lg pl-10 p-2.5 focus:ring-[#F25F30] focus:border-[#F25F30] outline-none"
              placeholder="Search borrowers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <div className="relative">
              <select
                className="appearance-none bg-[#1A1A1A] text-white border border-gray-700 rounded-lg pl-3 pr-10 py-2.5 focus:ring-[#F25F30] focus:border-[#F25F30] outline-none"
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value as RiskLevel | 'all')}
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <Filter className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            
            <button className="px-4 py-2.5 bg-[#F25F30] text-white rounded-lg font-medium hover:bg-[#D95429] transition-colors">
              Add Borrower
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="relative overflow-x-auto rounded-lg shadow-md border border-gray-800">
          <table className="w-full text-left">
            <thead className="bg-[#1A1A1A] text-gray-300 text-xs uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <button 
                    className="flex items-center gap-1 hover:text-[#F25F30]"
                    onClick={() => handleSort('name')}
                  >
                    Borrower
                    {sortField === 'name' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3">
                  <button 
                    className="flex items-center gap-1 hover:text-[#F25F30]"
                    onClick={() => handleSort('loanAmount')}
                  >
                    Loan Amount
                    {sortField === 'loanAmount' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3">
                  <button 
                    className="flex items-center gap-1 hover:text-[#F25F30]"
                    onClick={() => handleSort('creditScore')}
                  >
                    Credit Score
                    {sortField === 'creditScore' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3">
                  <button 
                    className="flex items-center gap-1 hover:text-[#F25F30]"
                    onClick={() => handleSort('riskLevel')}
                  >
                    Risk Level
                    {sortField === 'riskLevel' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3">
                  <button 
                    className="flex items-center gap-1 hover:text-[#F25F30]"
                    onClick={() => handleSort('lastAnalyzed')}
                  >
                    Last Analyzed
                    {sortField === 'lastAnalyzed' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <motion.tbody
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {sortedBorrowers.length > 0 ? (
                sortedBorrowers.map((borrower) => (
                  <motion.tr 
                    key={borrower.id}
                    variants={itemVariants}
                    className="border-b border-gray-800 bg-[#0C0C0C] hover:bg-[#1A1A1A]"
                  >
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                          <UserCircle className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <div className="font-medium">{borrower.name}</div>
                          <div className="text-xs text-gray-400">{borrower.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-mono">${borrower.loanAmount.toLocaleString()}</div>
                      <div className="text-xs text-gray-400">{borrower.loanTerm} months</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`font-medium ${
                        borrower.creditScore >= 70 ? 'text-green-400' : 
                        borrower.creditScore >= 50 ? 'text-amber-400' : 'text-red-400'
                      }`}>
                        {borrower.creditScore}/100
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                        <div
                          className={`h-1.5 rounded-full ${
                            borrower.creditScore >= 70 ? 'bg-green-500' : 
                            borrower.creditScore >= 50 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${borrower.creditScore}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getRiskIcon(borrower.riskLevel)}
                        {getRiskBadge(borrower.riskLevel)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {new Date(borrower.lastAnalyzed).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/prediction-record/${borrower.id}`}
                        className="text-[#F25F30] hover:underline"
                      >
                        View Details
                      </Link>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr className="border-b border-gray-800 bg-[#0C0C0C]">
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                    No borrowers found matching your criteria
                  </td>
                </tr>
              )}
            </motion.tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 text-sm">
          <div className="text-gray-400">
            Showing <span className="font-medium text-white">{sortedBorrowers.length}</span> of <span className="font-medium text-white">{borrowers.length}</span> borrowers
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-gray-700 rounded-md hover:border-[#F25F30] disabled:opacity-50 disabled:hover:border-gray-700">
              Previous
            </button>
            <button className="px-3 py-1.5 bg-[#F25F30] text-white rounded-md hover:bg-[#D95429]">
              Next
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}