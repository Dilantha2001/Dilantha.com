import logoAura from '../../assets/logos/logo_aura.jpg';
import logoNexus from '../../assets/logos/logo_nexus.jpg';
import logoVertex from '../../assets/logos/logo_vertex.jpg';
import logoLumina from '../../assets/logos/logo_lumina.jpg';
import logoNova from '../../assets/logos/logo_nova.jpg';
import logoSynergy from '../../assets/logos/logo_synergy.jpg';
import logoQuantum from '../../assets/logos/logo_quantum.jpg';
import logoKimberly from '../../assets/logos/logo_kimberly.jpg';
import logoCream from '../../assets/logos/logo_cream.jpg';
import logoMonogram from '../../assets/logos/logo_monogram.jpg';

export default function LogoMarquee() {
  const logos = [
    {
      id: 'kimberly',
      component: (
        <img src={logoKimberly} alt="Kimberly Logo" className="h-[90px] w-auto object-contain mix-blend-multiply opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300" />
      ),
    },
    {
      id: 'cream',
      component: (
        <img src={logoCream} alt="Cream Logo" className="h-[90px] w-auto object-contain mix-blend-multiply opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300" />
      ),
    },
    {
      id: 'monogram',
      component: (
        <img src={logoMonogram} alt="Monogram Logo" className="h-[90px] w-auto object-contain mix-blend-multiply opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300" />
      ),
    },
    {
      id: 'aura',
      component: (
        <img src={logoAura} alt="Aura Logo" className="h-[90px] w-auto object-contain mix-blend-multiply opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300" />
      ),
    },
    {
      id: 'nexus',
      component: (
        <img src={logoNexus} alt="Nexus Logo" className="h-[90px] w-auto object-contain mix-blend-multiply opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300" />
      ),
    },
    {
      id: 'vertex',
      component: (
        <img src={logoVertex} alt="Vertex Logo" className="h-[90px] w-auto object-contain mix-blend-multiply opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300" />
      ),
    },
    {
      id: 'lumina',
      component: (
        <img src={logoLumina} alt="Lumina Logo" className="h-[90px] w-auto object-contain mix-blend-multiply opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300" />
      ),
    },
    {
      id: 'nova',
      component: (
        <img src={logoNova} alt="Nova Logo" className="h-[90px] w-auto object-contain mix-blend-multiply opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300" />
      ),
    },
    {
      id: 'synergy',
      component: (
        <img src={logoSynergy} alt="Synergy Logo" className="h-[90px] w-auto object-contain mix-blend-multiply opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300" />
      ),
    },
    {
      id: 'quantum',
      component: (
        <img src={logoQuantum} alt="Quantum Logo" className="h-[90px] w-auto object-contain mix-blend-multiply opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300" />
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
