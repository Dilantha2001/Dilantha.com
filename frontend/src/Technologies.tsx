import React from 'react';
import * as SiIcons from 'react-icons/si';
import { TECH_STACK } from './portfolioData';

export default function Technologies() {
  return (
    <section className="w-full bg-[#181818] py-24 px-6 md:px-20 flex flex-col lg:flex-row justify-between items-center text-white z-10 relative">
      {/* Left Text Area */}
      <div className="w-full lg:w-5/12 mb-16 lg:mb-0 lg:pr-10 flex flex-col justify-center">
        <h2 className="text-[2.5rem] md:text-[3rem] mb-6 font-normal tracking-tight leading-tight">
          Technologies I work with
        </h2>
        <p className="text-[#888888] text-sm md:text-base leading-relaxed max-w-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
        </p>
      </div>

      {/* Right Tech Grid */}
      <div className="w-full lg:w-7/12 grid grid-cols-2 gap-x-6 md:gap-x-12 gap-y-0 text-[#1dd35e]">
        {TECH_STACK.map((t, i) => {
          // @ts-ignore
          const IconComponent = t.iconName ? SiIcons[t.iconName] : null;
          return (
            <div key={i} className="flex items-center justify-center gap-3 py-6 border-b-[3px] border-[#1dd35e]">
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
