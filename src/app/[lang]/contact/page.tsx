"use client";

import { Navigation } from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Briefcase, Users, Handshake } from 'lucide-react';
import React from 'react';

export default function ContactUsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation />
      <main className="flex-1 px-4 flex flex-col items-center justify-start w-ful mb-30 mt-16 md:mb-48 md:mt-40">
        <h2 className="text-3xl md:text-4xl font-[500] text-[#000D2D] mb-10 md:mb-16 w-full text-left">
          Reason for contacting
        </h2>
        <div className="flex flex-col lg:flex-row gap-6 w-full justify-center">
          {/* Products & Services */}
          <div className="flex-1 bg-white rounded-lg p-8 flex flex-col shadow-sm min-w-[280px] border border-[#E5E7EB] transition-all duration-200 hover:bg-[#F5F6F8] hover:border-transparent cursor-pointer">
            <div className="mb-4">
              <Briefcase className="w-7 h-7 text-[#000D2D]" />
            </div>
            <div className="text-xl font-[500] text-[#000D2D] mb-4">Interested in products & services.</div>
            <div className="text-[#000D2Db3] text-base mb-8">The founding of our company represents more than just a beginning – it is a vision built on innovation.</div>
            <a href="#" className="mt-auto text-[#000D2D] font-medium flex items-center gap-2 hover:no-underline transition">
              Contact Us <span className="ml-1">→</span>
            </a>
          </div>
          {/* Join the Team */}
          <div className="flex-1 bg-white rounded-lg p-8 flex flex-col shadow-sm min-w-[280px] border border-[#E5E7EB] transition-all duration-200 hover:bg-[#F5F6F8] hover:border-transparent cursor-pointer">
            <div className="mb-4">
              <Users className="w-7 h-7 text-[#000D2D]" />
            </div>
            <div className="text-xl font-[500] text-[#000D2D] mb-4">I want to join the team.</div>
            <div className="text-[#000D2Db3] text-base mb-8">The founding of our company represents more than just a beginning – it is a vision built on innovation.</div>
            <a href="#" className="mt-auto text-[#000D2D] font-medium flex items-center gap-2 hover:no-underline transition">
              See Opened Roles <span className="ml-1">→</span>
            </a>
          </div>
          {/* Partnership */}
          <div className="flex-1 bg-white rounded-lg p-8 flex flex-col shadow-sm min-w-[280px] border border-[#E5E7EB] transition-all duration-200 hover:bg-[#F5F6F8] hover:border-transparent cursor-pointer">
            <div className="mb-4">
              <Handshake className="w-7 h-7 text-[#000D2D]" />
            </div>
            <div className="text-xl font-[500] text-[#000D2D] mb-4">Interested in partnership</div>
            <div className="text-[#000D2Db3] text-base mb-8">The founding of our company represents more than just a beginning – it is a vision built on innovation.</div>
            <a href="#" className="mt-auto text-[#000D2D] font-medium flex items-center gap-2 hover:no-underline transition">
              Contact Us <span className="ml-1">→</span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 