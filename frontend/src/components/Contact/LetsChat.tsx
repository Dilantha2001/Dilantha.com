import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FiMail, FiPhone, FiCopy, FiCheck, FiArrowUpRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

export default function LetsChat() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLHRElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const email = "pramudithadilantha89@gmail.com";
  const phone = "+94 75 681 3888";

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out', force3D: true }
      );
    }

    if (dividerRef.current) {
      tl.fromTo(
        dividerRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.5'
      );
    }

    if (cardsContainerRef.current) {
      tl.fromTo(
        cardsContainerRef.current.children,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
          force3D: true
        },
        '-=0.4'
      );
    }
  }, { scope: sectionRef });

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(phone.replace(/\s+/g, ''));
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section id="contact" ref={sectionRef} className="w-full bg-white pt-2 md:pt-4 pb-16 md:pb-24 px-6 md:px-12 flex justify-center items-center">
      <div className="w-full max-w-[1600px] flex flex-col items-center">
        {/* Title */}
        <h1 
          ref={titleRef}
          className="text-black text-[clamp(3.8rem,14vw,13.5rem)] uppercase leading-none text-center m-0 select-none" 
          style={{ fontFamily: "'Anton', sans-serif", letterSpacing: '-0.02em', transform: 'scaleY(1.08)' }}
        >
          Let's have a <span className="text-[#0052ff]">chat</span>
        </h1>

        {/* Divider */}
        <hr ref={dividerRef} className="w-full border-t border-black/10 mt-8 md:mt-10 mb-8 origin-center" />

        {/* Modern Contact Cards */}
        <div ref={cardsContainerRef} className="w-full flex flex-col items-center justify-center gap-6">
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-4xl">
            
            {/* Email Modern Card */}
            <a 
              href={`mailto:${email}`}
              className="group relative flex-1 w-full sm:w-auto min-w-[280px] sm:min-w-[340px] flex items-center justify-between gap-4 sm:gap-6 px-5 py-4 rounded-2xl bg-neutral-50/90 hover:bg-white border border-black/10 hover:border-[#0052ff]/40 shadow-xs hover:shadow-xl hover:shadow-[#0052ff]/10 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-11 h-11 rounded-xl bg-white group-hover:bg-[#0052ff] border border-black/5 flex items-center justify-center text-[#0052ff] group-hover:text-white transition-all duration-300 shadow-xs">
                  <FiMail className="w-5 h-5 transition-transform group-hover:scale-110" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-black/40 group-hover:text-[#0052ff] uppercase transition-colors">
                    Email Address
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-neutral-900 tracking-tight">
                    {email}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 pl-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                  className="p-2 rounded-lg text-black/40 hover:text-black hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
                >
                  {copiedEmail ? (
                    <span className="flex items-center text-xs font-semibold text-emerald-600 gap-1">
                      <FiCheck className="w-4 h-4" />
                      <span className="hidden sm:inline">Copied</span>
                    </span>
                  ) : (
                    <FiCopy className="w-4 h-4" />
                  )}
                </button>
                <div className="w-7 h-7 rounded-full bg-black/5 group-hover:bg-[#0052ff] flex items-center justify-center text-black/50 group-hover:text-white transition-all duration-300">
                  <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </a>

            {/* Phone Modern Card */}
            <a 
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="group relative flex-1 w-full sm:w-auto min-w-[280px] sm:min-w-[340px] flex items-center justify-between gap-4 sm:gap-6 px-5 py-4 rounded-2xl bg-neutral-50/90 hover:bg-white border border-black/10 hover:border-[#0052ff]/40 shadow-xs hover:shadow-xl hover:shadow-[#0052ff]/10 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-11 h-11 rounded-xl bg-white group-hover:bg-[#0052ff] border border-black/5 flex items-center justify-center text-[#0052ff] group-hover:text-white transition-all duration-300 shadow-xs">
                  <FiPhone className="w-5 h-5 transition-transform group-hover:scale-110" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-black/40 group-hover:text-[#0052ff] uppercase transition-colors">
                    Phone / WhatsApp
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-neutral-900 tracking-tight">
                    {phone}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 pl-2">
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  title="Copy phone number"
                  className="p-2 rounded-lg text-black/40 hover:text-black hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
                >
                  {copiedPhone ? (
                    <span className="flex items-center text-xs font-semibold text-emerald-600 gap-1">
                      <FiCheck className="w-4 h-4" />
                      <span className="hidden sm:inline">Copied</span>
                    </span>
                  ) : (
                    <FiCopy className="w-4 h-4" />
                  )}
                </button>
                <div className="w-7 h-7 rounded-full bg-black/5 group-hover:bg-[#0052ff] flex items-center justify-center text-black/50 group-hover:text-white transition-all duration-300">
                  <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </a>

          </div>

          {/* Quick response note */}
          <div className="text-xs sm:text-sm text-black/50 font-medium flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0052ff] animate-pulse"></span>
            Typical response time: <span className="text-black font-semibold">within 2 hours</span>
          </div>

        </div>
      </div>
    </section>
  );
}
