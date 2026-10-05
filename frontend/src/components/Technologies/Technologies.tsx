import * as SiIcons from 'react-icons/si';
import { TECH_STACK } from '../../data/portfolioData';

export default function Technologies() {
  return (
    <section id="technologies" className="w-full bg-white py-24 px-6 md:px-20 flex flex-col lg:flex-row justify-between items-center text-black z-10 relative">
      {/* Left Text Area */}
      <div className="w-full lg:w-5/12 mb-16 lg:mb-0 lg:pr-10 flex flex-col justify-center">
        <h2 className="text-[2.5rem] md:text-[3rem] mb-6 font-normal tracking-tight leading-tight">
          Technologies I work with
        </h2>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-sm">
          A modern and scalable technology stack spanning performant UI engineering, robust APIs, distributed caching, and machine learning pipelines.
        </p>
      </div>

      {/* Right Tech Grid */}
      <div className="w-full lg:w-7/12 grid grid-cols-2 gap-x-6 md:gap-x-12 gap-y-0 text-black">
        {TECH_STACK.map((t, i) => {
          // @ts-ignore
          const IconComponent = t.iconName ? SiIcons[t.iconName] : null;
          return (
            <div key={i} className="flex items-center justify-center gap-3 py-6 border-b-[2px] border-gray-300">
              {IconComponent && (
                <span className="flex-shrink-0">
                  <IconComponent size={t.iconName === 'SiNodedotjs' ? 32 : 24} />
                </span>
              )}
              <span className={`${t.font}`}>{t.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
