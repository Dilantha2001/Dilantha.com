import React from 'react';
import ScrambleText from './ScrambleText';

export default function StatsSection() {
  return (
    <section className="w-full bg-[#141414] py-24 px-4 md:px-8">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center">
        
        {/* Top 3 Stats */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full mb-12 gap-12 md:gap-4 px-4">
          
          <div className="flex flex-col items-center text-center">
            <h2 className="text-[#f1f1f1] text-[4rem] md:text-[5rem] font-bold mb-0 leading-none flex items-start" style={{ fontFamily: "'Anton', sans-serif" }}>
              <ScrambleText text="100M+" />
              <span className="text-xl md:text-2xl ml-1 mt-2 text-[#a1a1a1]">
                <ScrambleText text="+100" />
              </span>
            </h2>
            <p className="text-[#a1a1a1] text-sm font-semibold tracking-widest uppercase mt-4 flex items-center gap-1">
              AI TOKENS <span className="opacity-50">✦</span> USED
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <h2 className="text-[#f1f1f1] text-[4rem] md:text-[5rem] font-bold mb-0 leading-none" style={{ fontFamily: "'Anton', sans-serif" }}>
              <ScrambleText text="3.1K+" />
            </h2>
            <p className="text-[#a1a1a1] text-sm font-semibold tracking-widest uppercase mt-4">
              COFFEES DRANK
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <h2 className="text-[#f1f1f1] text-[4rem] md:text-[5rem] font-bold mb-0 leading-none" style={{ fontFamily: "'Anton', sans-serif" }}>
              <ScrambleText text="6.7K+" />
            </h2>
            <p className="text-[#a1a1a1] text-sm font-semibold tracking-widest uppercase mt-4">
              CODE COMMITS
            </p>
          </div>

        </div>

        {/* Github Snake Graph with Dates & Legend */}
        <div className="flex flex-col items-center mt-12 w-full max-w-5xl mx-auto pb-4">
          <h3 className="text-[#f1f1f1] text-base font-bold tracking-widest mb-1 uppercase font-sans">
            PERSONAL GITHUB ACTIVITY
          </h3>
          <p className="text-[#a1a1a1] text-xs mb-8 italic">
            (Work commits are hiding in another dimension)
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 items-start w-full">
            
            {/* Graph Container */}
            <div className="flex flex-col overflow-x-auto pb-2 w-full max-w-full custom-scrollbar">
              
              {/* Months */}
              <div className="flex text-[#8a8a8a] text-[10px] mb-2 w-full justify-between pr-4 pl-8" style={{ minWidth: '850px' }}>
                {['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((m, i) => (
                  <span key={i} className="flex-1">{m}</span>
                ))}
              </div>
              
              {/* Snake SVG */}
              <div className="flex flex-col gap-6 items-center w-full min-w-[850px] overflow-hidden">
                <img 
                  src="https://raw.githubusercontent.com/Dilantha2001/Dilantha2001/output/github-contribution-grid-snake-dark.svg" 
                  alt="Github Contribution Snake Animation" 
                  className="w-full object-cover"
                  style={{ 
                    // Move the hue from github green to our theme's red/crimson
                    filter: 'hue-rotate(-110deg) saturate(1.5) brightness(1.1)',
                    marginTop: '-10px' // Adjust for any built-in SVG padding
                  }}
                />
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center md:justify-end gap-2 mt-4 text-[10px] text-[#8a8a8a] pr-4">
                <span>Less</span>
                <div className="flex gap-[3px]">
                  <div className="w-[12px] h-[12px] rounded-[2px] bg-[#1a1a1a]"></div>
                  <div className="w-[12px] h-[12px] rounded-[2px] bg-[#5a1b2b]"></div>
                  <div className="w-[12px] h-[12px] rounded-[2px] bg-[#9a1b33]"></div>
                  <div className="w-[12px] h-[12px] rounded-[2px] bg-[#df1b3f]"></div>
                  <div className="w-[12px] h-[12px] rounded-[2px] bg-[#ff4d6d]"></div>
                </div>
                <span>More</span>
              </div>

            </div>

            {/* Year Selector */}
            <div className="flex flex-row md:flex-col gap-2 mt-4 md:mt-6 text-xs w-full md:w-24 shrink-0">
              {['2026', '2025', '2024', '2023'].map(year => (
                <button 
                  key={year} 
                  className={`px-3 py-1.5 rounded text-left transition-colors ${
                    year === '2026' 
                      ? 'bg-[#1a1a1a] text-white border border-[#df1b3f]/50 shadow-[0_0_10px_rgba(223,27,63,0.2)]' 
                      : 'text-[#8a8a8a] hover:text-white transparent border border-transparent'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
