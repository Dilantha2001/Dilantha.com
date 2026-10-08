import logo1 from '../../assets/logos/1.png';
import logo2 from '../../assets/logos/2.png';
import logo3 from '../../assets/logos/3.png';
import logo4 from '../../assets/logos/4.png';
import logo5 from '../../assets/logos/5.png';
import logo6 from '../../assets/logos/6.png';
import logo7 from '../../assets/logos/7.png';
import logo8 from '../../assets/logos/8.png';
import logo9 from '../../assets/logos/9.png';

export default function LogoMarquee() {
  const logos = [
    {
      id: 'logo1',
      component: (
        <img src={logo1} alt="Client Logo 1" className="h-[90px] w-auto object-contain mix-blend-multiply opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300" />
      ),
    },
    {
      id: 'logo2',
      component: (
        <img src={logo2} alt="Client Logo 2" className="h-[90px] w-auto object-contain mix-blend-multiply opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300" />
      ),
    },
    {
      id: 'logo3',
      component: (
        <img src={logo3} alt="Client Logo 3" className="h-[90px] w-auto object-contain mix-blend-multiply opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300" />
      ),
    },
    {
      id: 'logo4',
      component: (
        <img src={logo4} alt="Client Logo 4" className="h-[90px] w-auto object-contain mix-blend-multiply opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300" />
      ),
    },
    {
      id: 'logo5',
      component: (
        <img src={logo5} alt="Client Logo 5" className="h-[90px] w-auto object-contain mix-blend-multiply opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300" />
      ),
    },
    {
      id: 'logo6',
      component: (
        <img src={logo6} alt="Client Logo 6" className="h-[90px] w-auto object-contain mix-blend-multiply opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300" />
      ),
    },
    {
      id: 'logo7',
      component: (
        <img src={logo7} alt="Client Logo 7" className="h-[90px] w-auto object-contain mix-blend-multiply opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300" />
      ),
    },
    {
      id: 'logo8',
      component: (
        <img src={logo8} alt="Client Logo 8" className="h-[90px] w-auto object-contain mix-blend-multiply opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300" />
      ),
    },
    {
      id: 'logo9',
      component: (
        <img src={logo9} alt="Client Logo 9" className="h-[90px] w-auto object-contain mix-blend-multiply opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300" />
      ),
    },
  ];

  return (
    <section className="w-full bg-white py-10 md:py-12 border-b border-black/[0.08] relative overflow-hidden select-none z-20">
      {/* Infinite Horizontal Company Logo Marquee */}
      <div className="relative w-full flex overflow-x-hidden group">
        
        {/* Soft edge gradient fades */}
        <div className="absolute top-0 left-0 w-20 sm:w-36 md:w-56 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-20 sm:w-36 md:w-56 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

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
