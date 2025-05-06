import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#000D2D] text-[16px] font-sans pt-12 pb-6">
      <div className="mx-auto px-4 flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-0">
        {/* Logo & Socials */}
        <div className="min-w-[220px] md:mb-8">
          <div className="mb-8">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto mb-4 ml-[-4px]" />
          </div>
          <div className="flex flex-col gap-5">
            <a href="#" className="flex items-center text-white/50 no-underline">
              <span className="bg-white rounded-full flex items-center justify-center mr-3">
                <img src="/instagram.svg" alt="Instagram" className="h-6 w-6" />
              </span>
              Instagram
            </a>
            <a href="#" className="flex items-center text-white/50 no-underline">
              <span className="bg-white rounded-full flex items-center justify-center mr-3">
                <img src="/twitter.svg" alt="Twitter" className="h-6 w-6" />
              </span>
              Twitter
            </a>
            <a href="#" className="flex items-center text-white/50 no-underline">
              <span className="bg-white rounded-full flex items-center justify-center mr-3">
                <img src="/linkedin.svg" alt="LinkedIn" className="h-6 w-6" />
              </span>
              LinkedIn
            </a>
            <a href="#" className="flex items-center text-white/50 no-underline">
              <span className="bg-white rounded-full flex items-center justify-center mr-3">
                <img src="/youtube.svg" alt="Youtube" className="h-6 w-6" />
              </span>
              Youtube
            </a>
          </div>
        </div>
        {/* Product & Services */}
        <div className="min-w-[220px] md:mb-8">
          <div className="text-white font-[500] text-2xl mb-6">Product & Services</div>
          <div className="flex flex-col gap-4">
            <a href="#" className="text-white/50 no-underline">Vitez</a>
            <a href="#" className="text-white/50 no-underline">Remont</a>
            <a href="#" className="text-white/50 no-underline">Air</a>
            <a href="#" className="text-white/50 no-underline">Sea</a>
            <a href="#" className="text-white/50 no-underline">Ground</a>
            <a href="#" className="text-white/50 no-underline">Consulting</a>
            <a href="#" className="text-white/50 no-underline">Mediation</a>
          </div>
        </div>
        {/* Who we are */}
        <div className="min-w-[220px] md:mb-8">
          <div className="text-white font-[500] text-2xl mb-6">Who we are</div>
          <div className="flex flex-col gap-4">
            <a href="#" className="text-white/50 no-underline">Events</a>
            <a href="#" className="text-white/50 no-underline">Partners</a>
            <a href="#" className="text-white/50 no-underline">Careers</a>
            <a href="#" className="text-white/50 no-underline">Licenses</a>
            <a href="#" className="text-white/50 no-underline">About Us</a>
            <a href="#" className="text-white/50 no-underline">Join Team</a>
          </div>
        </div>
        {/* Our Info */}
        <div className="min-w-[320px] mb-8">
          <div className="text-white font-[500] text-2xl mb-6">Our Info</div>
          <div className="text-white/50 mb-4">emailexample@gbp.com</div>
          <div className="text-white/50">Serbia, Lapovo, Ul.Ratka 43a</div>
        </div>
      </div>
      {/* Bottom bar */}
      <div className="md:mt-12 pt-6 mx-auto px-4 flex flex-col lg:flex-row lg:justify-between lg:items-center text-[16px]">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 flex-wrap mb-4 md:mb-0">
          <a href="#" className="text-white/50 no-underline">Privacy policy</a>
          <a href="#" className="text-white/50 no-underline">Terms of use</a>
          <a href="#" className="text-white/50 no-underline">Accessibility</a>
          <a href="#" className="text-white/50 no-underline">Modern Slavery Statement</a>
          <a href="#" className="text-white/50 no-underline">Cookies Settings</a>
        </div>
        <div className="text-white/50 mt-8">© GPB 2025</div>
      </div>
    </footer>
  );
};

export default Footer; 