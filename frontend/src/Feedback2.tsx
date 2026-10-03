import React from 'react';
import img1 from './assets/images (50).jfif';
import img2 from './assets/images (51).jfif';
import img3 from './assets/images (52).jfif';
import img4 from './assets/images (53).jfif';
import img5 from './assets/images (54).jfif';
import img6 from './assets/images (55).jfif';
import img7 from './assets/images (56).jfif';
import img8 from './assets/images (57).jfif';

const feedbacks = [
  {
    label: "Results-oriented",
    title: "70% growth in retention rate",
    quote: "After the deployment the platform allowed us to get more than one thousand users in a month with a retention rate of more than 70%. The subscription distribution and set of rather unique features together with clear UX make our users stay with us for longer.",
    name: "Aidan Perkins",
    role: "Managing Director, Real Estate Agency Registry",
    image: img1
  },
  {
    label: "Fast to deliver",
    title: "Finished in 3 months what should've taken 9",
    quote: "I love working with Dilantha and his process. He is fun, nice, reliable, and able to work quickly—he finished in three months what should've taken nine. He views issues and difficult tasks as challenges, remaining constantly available and working all night to solve certain issues.",
    name: "Founder",
    role: "Digital Agency",
    image: img2
  },
  {
    label: "Data-driven",
    title: "Based on numbers, without vague theories",
    quote: "We received a stable web platform allowing us to bring our business to new heights, provide high-quality services to our clients and make them confident in their retirement. Dilantha made his assumptions for improvement always based on the numbers and reports, without vague theories, which impressed our team.",
    name: "Alec Öberg",
    role: "Business Development Officer, SaaS Company",
    image: img3
  },
  {
    label: "Creative Vision",
    title: "A design that truly stands out",
    quote: "He completely transformed our online presence. His attention to detail and creative vision brought our brand to life in ways we didn't think were possible. The animations, color schemes, and layout are absolutely world-class and perfectly aligned with our goals.",
    name: "Sarah Jenkins",
    role: "Marketing Director, TechStart",
    image: img4
  },
  {
    label: "Highly Professional",
    title: "Communication was flawless",
    quote: "From the very first meeting to the final hand-off, the communication was clear and highly professional. We always knew exactly where the project stood, and every single deadline was met ahead of schedule. A true pleasure to work with.",
    name: "David Chen",
    role: "CEO, Innovate Solutions",
    image: img5
  },
  {
    label: "Problem Solver",
    title: "Fixed complex issues effortlessly",
    quote: "We had a really complicated backend integration that two previous developers couldn't figure out. Dilantha came in and not only solved it within a week, but also optimized the entire flow to make it run 3x faster.",
    name: "Emily Rodriguez",
    role: "Product Manager, E-Commerce Pro",
    image: img6
  },
  {
    label: "User-Centric",
    title: "Engagement skyrocketed by 150%",
    quote: "The new UI/UX design is so intuitive that our user engagement metrics shot up immediately after launch. Customers keep telling us how much easier it is to navigate the new platform compared to our old legacy system.",
    name: "Mark Thompson",
    role: "Co-Founder, SaaS Cloud",
    image: img7
  },
  {
    label: "Exceptional Quality",
    title: "Zero bugs on launch day",
    quote: "I've never experienced a launch as smooth as this one. The code quality is exceptional, fully responsive across all devices, and we literally had zero bug reports in the first month of going live. Highly recommended!",
    name: "Jessica Wu",
    role: "Operations Head, FinTech Plus",
    image: img8
  }
];

export default function Feedback2() {
  return (
    <section className="w-full bg-white py-28 overflow-hidden relative">
      <div className="text-center mb-20 px-4">
        <h2 className="text-black text-[3rem] md:text-[4.5rem] font-bold mb-4 leading-none" style={{ fontFamily: "'Anton', sans-serif", letterSpacing: '1px' }}>
          Hear from our clients
        </h2>
        <p className="text-[#333333] text-lg md:text-xl font-medium max-w-2xl mx-auto">
          See for yourself what others have to say about us.
        </p>
      </div>

      {/* Infinite Horizontal Marquee Container */}
      <div className="relative w-full flex overflow-x-hidden group">
        
        {/* Fading Edges for smooth entry/exit */}
        <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap py-4">
          {/* First set of cards */}
          {feedbacks.map((item, idx) => (
             <FeedbackCard key={idx} item={item} index={idx} />
          ))}
          {/* Duplicate set of cards for infinite loop */}
          {feedbacks.map((item, idx) => (
             <FeedbackCard key={`dup-${idx}`} item={item} index={idx} />
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
          width: max-content;
        }
      `}} />
    </section>
  );
}

function FeedbackCard({ item, index }: { item: typeof feedbacks[0], index: number }) {
  // Make every 2nd or 3rd item a quote avatar just like the design
  const isQuote = index % 3 === 1;

  return (
    <div className="w-[320px] md:w-[420px] flex-shrink-0 mx-4 md:mx-6 flex flex-col whitespace-normal bg-white p-8 md:p-10 transition-transform hover:-translate-y-2">
      
      {/* Avatar */}
      <div className="mb-8">
        {isQuote ? (
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-[#df1b3f] flex items-center justify-center text-[#df1b3f] text-3xl md:text-4xl font-serif leading-none pt-3">
            &rdquo;
          </div>
        ) : (
          <img 
            src={`https://i.pravatar.cc/150?img=${(index * 3) + 11}`} 
            alt={item.name} 
            className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-[#df1b3f] object-cover p-[2px]" 
          />
        )}
      </div>

      {/* Label */}
      <div className="text-[#df1b3f] font-bold text-xs md:text-sm mb-4 uppercase tracking-widest">
        {item.label}
      </div>

      {/* Title */}
      <h3 className="text-black text-2xl md:text-3xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Anton', sans-serif", letterSpacing: '0.5px' }}>
        {item.title}
      </h3>

      {/* Quote */}
      <p className="text-[#555555] text-sm md:text-base leading-relaxed mb-6">
        "{item.quote}"
      </p>

      {/* Embedded Project Image */}
      {item.image && (
        <div className="w-full h-48 mb-8 rounded-xl overflow-hidden border border-gray-200/50 shadow-sm">
          <img src={item.image} alt="Project reference" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        </div>
      )}

      {/* Author */}
      <div className="mt-auto pt-4 border-t border-gray-100">
        <h4 className="text-black font-bold text-base md:text-lg mb-1">{item.name}</h4>
        <p className="text-[#888888] text-xs md:text-sm">{item.role}</p>
      </div>
      
    </div>
  );
}
