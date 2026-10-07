export default function LogoMarquee() {
  const logos = [
    // 1. Craftgram
    {
      id: 'craftgram',
      component: (
        <div className="flex items-center gap-2.5 opacity-100 hover:scale-105 transition-all duration-300">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#fb7185" className="shrink-0 drop-shadow-[0_0_8px_rgba(251,113,133,0.3)]">
            <path d="M9.5 3.5C9.5 2.67 10.17 2 11 2H13C13.83 2 14.5 2.67 14.5 3.5V9H9.5V3.5Z" />
            <path d="M9.5 15H14.5V20.5C14.5 21.33 13.83 22 13 22H11C10.17 22 9.5 21.33 9.5 20.5V15Z" />
            <path d="M3.5 9.5H9V14.5H3.5C2.67 14.5 2 13.83 2 13V11C2 10.17 2.67 9.5 3.5 9.5Z" />
            <path d="M15 9.5H20.5C21.33 9.5 22 10.17 22 11V13C22 13.83 21.33 14.5 20.5 14.5H15V9.5Z" />
          </svg>
          <span className="font-sans font-bold text-[20px] text-white tracking-tight">Craftgram</span>
        </div>
      ),
    },
    // 2. techtide
    {
      id: 'techtide',
      component: (
        <div className="flex items-center gap-2.5 opacity-100 hover:scale-105 transition-all duration-300">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 drop-shadow-[0_0_8px_rgba(165,180,252,0.35)]">
            <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
          </svg>
          <span className="font-sans font-black italic text-[20px] text-white tracking-tight">techtide</span>
        </div>
      ),
    },
    // 3. innovio
    {
      id: 'innovio',
      component: (
        <div className="flex items-center gap-2.5 opacity-100 hover:scale-105 transition-all duration-300">
          <svg width="26" height="20" viewBox="0 0 28 20" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" className="shrink-0 drop-shadow-[0_0_8px_rgba(74,222,128,0.35)]">
            <path d="M14 19V3M9 19L5 5M19 19L23 5M5 19L1 9M23 19L27 9M11.5 19L8.5 4M16.5 19L19.5 4" />
          </svg>
          <span className="font-sans font-bold text-[20px] text-white tracking-tight">innovio</span>
        </div>
      ),
    },
    // 4. swift >
    {
      id: 'swift',
      component: (
        <div className="flex items-center gap-1.5 opacity-100 hover:scale-105 transition-all duration-300">
          <span className="font-sans font-black italic text-[20px] text-white tracking-tight">swift</span>
          <svg width="11" height="15" viewBox="0 0 11 15" fill="none" className="shrink-0 drop-shadow-[0_0_8px_rgba(74,222,128,0.4)]">
            <path d="M2 2L8 7.5L2 13" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      ),
    },
    // 5. Lum Labs
    {
      id: 'lumlabs',
      component: (
        <div className="flex items-center gap-1.5 opacity-100 hover:scale-105 transition-all duration-300">
          <span className="font-sans font-bold text-[20px] text-white">Lum</span>
          <div className="w-[18px] h-[18px] bg-white rounded-[4px] flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(255,255,255,0.3)]">
            <div className="w-[6px] h-[6px] rounded-full bg-[#08080a]"></div>
          </div>
          <span className="font-sans font-bold text-[20px] text-white">Labs</span>
        </div>
      ),
    },
    // 6. sparkle™
    {
      id: 'sparkle',
      component: (
        <div className="flex items-start opacity-100 hover:scale-105 transition-all duration-300">
          <span className="font-sans font-black text-[20px] text-white tracking-tight">sparkle</span>
          <span className="text-[10px] font-bold text-white ml-0.5 mt-0.5">™</span>
        </div>
      ),
    },
    // 7. vertex
    {
      id: 'vertex',
      component: (
        <div className="flex items-center gap-2 opacity-100 hover:scale-105 transition-all duration-300">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fcd34d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 drop-shadow-[0_0_8px_rgba(252,211,77,0.35)]">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" />
            <path d="M2 17L12 22L22 17" />
            <path d="M2 12L12 17L22 12" />
          </svg>
          <span className="font-sans font-bold text-[20px] text-white tracking-tight">vertex</span>
        </div>
      ),
    },
    // 8. hyperflow
    {
      id: 'hyperflow',
      component: (
        <div className="flex items-center gap-2 opacity-100 hover:scale-105 transition-all duration-300">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#60a5fa" className="shrink-0 drop-shadow-[0_0_8px_rgba(96,165,250,0.4)]">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
          </svg>
          <span className="font-sans font-black text-[20px] text-white tracking-tight">hyperflow</span>
        </div>
      ),
    },
  ];

  return (
    <section className="w-full bg-[#08080a] py-10 md:py-12 border-y border-white/[0.08] relative overflow-hidden select-none z-20">
      {/* Infinite Horizontal Company Logo Marquee */}
      <div className="relative w-full flex overflow-x-hidden group">
        
        {/* Soft edge gradient fades */}
        <div className="absolute top-0 left-0 w-20 sm:w-36 md:w-56 h-full bg-gradient-to-r from-[#08080a] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-20 sm:w-36 md:w-56 h-full bg-gradient-to-l from-[#08080a] to-transparent z-10 pointer-events-none"></div>

        {/* Marquee Track */}
        <div className="flex animate-company-marquee group-hover:[animation-play-state:paused] whitespace-nowrap items-center">
          {/* First loop */}
          {logos.map((logo, idx) => (
            <div
              key={`logo-1-${idx}`}
              className="mx-8 sm:mx-12 md:mx-16 shrink-0 cursor-default"
            >
              {logo.component}
            </div>
          ))}

          {/* Second loop for seamless infinite slide */}
          {logos.map((logo, idx) => (
            <div
              key={`logo-2-${idx}`}
              className="mx-8 sm:mx-12 md:mx-16 shrink-0 cursor-default"
            >
              {logo.component}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes companyMarqueeAnimation {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-company-marquee {
          animation: companyMarqueeAnimation 28s linear infinite;
          width: max-content;
        }
      `}</style>
    </section>
  );
}
