import { useState, useEffect } from 'react';
import ScrambleText from '../Common/ScrambleText';

export default function StatsSection() {
  const [svgContent, setSvgContent] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('2026');

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/Dilantha2001/Dilantha2001/output/github-contribution-grid-snake.svg')
      .then((res) => res.text())
      .then((raw) => {
        // Replace SVG CSS variables with electric blue theme palette and hide progress bar
        const blueThemedSvg = raw
          .replace(
            /:root\{[^}]*\}/,
            ':root{--cb:rgba(0,82,255,0.08);--cs:#0052ff;--ce:#ebedf0;--c0:#ebedf0;--c1:#bfdbfe;--c2:#60a5fa;--c3:#0052ff;--c4:#1e40af;}'
          )
          .replace(
            /<\/style>/,
            '.u{display:none!important;opacity:0!important;visibility:hidden!important;}</style>'
          )
          .replace(/<rect[^>]*class="[^"]*\bu\b[^"]*"[^>]*\/?>/gi, '');
        setSvgContent(blueThemedSvg);
      })
      .catch((err) => {
        console.error('Failed to load GitHub activity SVG', err);
      });
  }, []);

  return (
    <section id="stats" className="w-full bg-white py-24 px-4 md:px-8">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center">
        
        {/* Top 3 Stats */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full mb-12 gap-12 md:gap-4 px-4">
          
          <div className="flex flex-col items-center text-center">
            <h2 className="text-black text-[4rem] md:text-[5rem] font-bold mb-0 leading-none flex items-start font-['Anton',sans-serif]">
              <ScrambleText text="100M+" />
              <span className="text-xl md:text-2xl ml-1 mt-2 text-[#0052ff]">
                <ScrambleText text="+100" />
              </span>
            </h2>
            <p className="text-black/50 text-sm font-semibold tracking-widest uppercase mt-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0052ff]"></span>
              AI TOKENS <span className="opacity-40">✦</span> USED
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <h2 className="text-black text-[4rem] md:text-[5rem] font-bold mb-0 leading-none font-['Anton',sans-serif]">
              <ScrambleText text="3.1K+" />
            </h2>
            <p className="text-black/50 text-sm font-semibold tracking-widest uppercase mt-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0052ff]"></span>
              COFFEES DRANK
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <h2 className="text-black text-[4rem] md:text-[5rem] font-bold mb-0 leading-none font-['Anton',sans-serif]">
              <ScrambleText text="6.7K+" />
            </h2>
            <p className="text-black/50 text-sm font-semibold tracking-widest uppercase mt-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0052ff]"></span>
              CODE COMMITS
            </p>
          </div>

        </div>

        {/* Github Snake Graph with Dates & Legend */}
        <div className="flex flex-col items-center mt-12 w-full max-w-5xl mx-auto pb-4">
          
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#0052ff] animate-pulse"></span>
            <h3 className="text-black text-base font-bold tracking-widest uppercase font-sans">
              PERSONAL GITHUB ACTIVITY
            </h3>
          </div>
          
          <p className="text-black/50 text-xs mb-8 italic">
            (Work commits are stored securely in internal repositories)
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 items-start w-full">
            
            {/* Graph Container */}
            <div className="flex flex-col overflow-x-auto pb-2 w-full max-w-full custom-scrollbar">
              
              {/* Months */}
              <div className="flex text-black/50 text-[10px] mb-2 w-full justify-between pr-4 pl-8" style={{ minWidth: '850px' }}>
                {['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((m, i) => (
                  <span key={i} className="flex-1 font-medium">{m}</span>
                ))}
              </div>
              
              {/* Snake SVG with Pure Blue Palette */}
              <div className="flex flex-col gap-6 items-center w-full min-w-[850px] overflow-hidden">
                {svgContent ? (
                  <div 
                    className="w-full flex justify-center [&>svg]:w-full [&>svg]:h-auto [&_.u]:hidden -mt-2"
                    dangerouslySetInnerHTML={{ __html: svgContent }} 
                  />
                ) : (
                  <div className="w-full h-32 flex items-center justify-center text-black/40 text-xs gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0052ff] animate-ping"></span>
                    Loading GitHub Activity...
                  </div>
                )}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center md:justify-end gap-2 mt-4 text-[10px] text-black/60 pr-4 font-medium">
                <span>Less</span>
                <div className="flex gap-[3px]">
                  <div className="w-[12px] h-[12px] rounded-[2px] bg-[#ebedf0] border border-black/5"></div>
                  <div className="w-[12px] h-[12px] rounded-[2px] bg-[#bfdbfe]"></div>
                  <div className="w-[12px] h-[12px] rounded-[2px] bg-[#60a5fa]"></div>
                  <div className="w-[12px] h-[12px] rounded-[2px] bg-[#0052ff]"></div>
                  <div className="w-[12px] h-[12px] rounded-[2px] bg-[#1e40af]"></div>
                </div>
                <span>More</span>
              </div>

            </div>

            {/* Year Selector */}
            <div className="flex flex-row md:flex-col gap-2 mt-4 md:mt-6 text-xs w-full md:w-24 shrink-0">
              {['2026', '2025', '2024', '2023'].map((year) => {
                const isActive = selectedYear === year;
                return (
                  <button 
                    key={year} 
                    onClick={() => setSelectedYear(year)}
                    className={`px-3 py-1.5 rounded text-left transition-all duration-200 cursor-pointer ${
                      isActive 
                        ? 'bg-[#0052ff]/10 text-[#0052ff] border border-[#0052ff]/30 font-bold shadow-sm' 
                        : 'text-black/50 hover:text-[#0052ff] hover:bg-gray-50 border border-transparent font-medium'
                    }`}
                  >
                    {year}
                  </button>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
