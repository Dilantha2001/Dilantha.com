import img1 from '../../assets/images (50).jfif';
import img2 from '../../assets/images (51).jfif';
import img3 from '../../assets/images (52).jfif';
import img4 from '../../assets/images (53).jfif';
import img5 from '../../assets/images (54).jfif';
import img6 from '../../assets/images (55).jfif';
import img7 from '../../assets/images (56).jfif';
import img8 from '../../assets/images (57).jfif';

import avatar1 from '../../assets/feedbacks/ffedbacks (1).jpg';
import avatar2 from '../../assets/feedbacks/ffedbacks (2).jfif';
import avatar3 from '../../assets/feedbacks/ffedbacks (3).jfif';
import avatar4 from '../../assets/feedbacks/ffedbacks (4).jfif';
import avatar5 from '../../assets/feedbacks/ffedbacks (1).jfif';
import avatar6 from '../../assets/feedbacks/images (62).jfif';
import avatar7 from '../../assets/feedbacks/images (63).jfif';
import avatar8 from '../../assets/feedbacks/images (64).jfif';

const feedbacks = [
  {
    label: "Results-oriented",
    title: "70% growth in retention rate",
    quote: "After the deployment the platform allowed us to get more than one thousand users in a month with a retention rate of more than 70%. The subscription distribution and set of rather unique features together with clear UX make our users stay with us for longer.",
    name: "Alex Perkins",
    role: "Managing Director, Real Estate Agency Registry",
    image: img1,
    avatar: avatar1
  },
  {
    label: "Fast to deliver",
    title: "Finished in 3 months what should've taken 9",
    quote: "I love working with Dilantha and his process. He is fun, nice, reliable, and able to work quickly—he finished in three months what should've taken nine. He views issues and difficult tasks as challenges, remaining constantly available and working all night to solve certain issues.",
    name: "Jordan Lee",
    role: "Founder, Digital Agency",
    image: img2,
    avatar: avatar2
  },
  {
    label: "Data-driven",
    title: "Based on numbers, without vague theories",
    quote: "We received a stable web platform allowing us to bring our business to new heights, provide high-quality services to our clients and make them confident in their retirement. Dilantha made his assumptions for improvement always based on the numbers and reports, without vague theories, which impressed our team.",
    name: "Taylor Öberg",
    role: "Business Development Officer, SaaS Company",
    image: img3,
    avatar: avatar3
  },
  {
    label: "Creative Vision",
    title: "A design that truly stands out",
    quote: "He completely transformed our online presence. His attention to detail and creative vision brought our brand to life in ways we didn't think were possible. The animations, color schemes, and layout are absolutely world-class and perfectly aligned with our goals.",
    name: "Casey Jenkins",
    role: "Marketing Director, TechStart",
    image: img4,
    avatar: avatar4
  },
  {
    label: "Highly Professional",
    title: "Communication was flawless",
    quote: "From the very first meeting to the final hand-off, the communication was clear and highly professional. We always knew exactly where the project stood, and every single deadline was met ahead of schedule. A true pleasure to work with.",
    name: "Riley Chen",
    role: "CEO, Innovate Solutions",
    image: img5,
    avatar: avatar5
  },
  {
    label: "Problem Solver",
    title: "Fixed complex issues effortlessly",
    quote: "We had a really complicated backend integration that two previous developers couldn't figure out. Dilantha came in and not only solved it within a week, but also optimized the entire flow to make it run 3x faster.",
    name: "Morgan Rodriguez",
    role: "Product Manager, E-Commerce Pro",
    image: img6,
    avatar: avatar6
  },
  {
    label: "User-Centric",
    title: "Engagement skyrocketed by 150%",
    quote: "The new UI/UX design is so intuitive that our user engagement metrics shot up immediately after launch. Customers keep telling us how much easier it is to navigate the new platform compared to our old legacy system.",
    name: "Jamie Thompson",
    role: "Co-Founder, SaaS Cloud",
    image: img7,
    avatar: avatar7
  },
  {
    label: "Exceptional Quality",
    title: "Zero bugs on launch day",
    quote: "I've never experienced a launch as smooth as this one. The code quality is exceptional, fully responsive across all devices, and we literally had zero bug reports in the first month of going live. Highly recommended!",
    name: "Avery Wu",
    role: "Operations Head, FinTech Plus",
    image: img8,
    avatar: avatar8
  }
];

export default function Feedback2() {
  return (
    <section id="feedback" className="w-full bg-[#08080a] text-white py-28 overflow-hidden relative border-t border-b border-white/[0.06]">
      
      {/* Section Header */}
      <div className="text-center mb-16 px-4 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0052ff] shadow-[0_0_8px_#0052ff]"></span>
          <span className="text-[10px] font-bold tracking-[0.16em] text-[#0052ff] uppercase">CLIENT TESTIMONIALS</span>
        </div>
        <h2 className="text-white text-[3rem] md:text-[4.5rem] font-bold mb-3 leading-none uppercase" style={{ fontFamily: "'Anton', sans-serif", letterSpacing: '1px' }}>
          Hear from our <span className="text-[#0052ff]">clients</span>
        </h2>
        <p className="text-gray-400 text-sm md:text-base font-normal max-w-xl mx-auto">
          See for yourself what founders and product teams have to say about working together.
        </p>
      </div>

      {/* Infinite Horizontal Marquee Container */}
      <div className="relative w-full flex overflow-x-hidden group">
        
        {/* Fading Edges for smooth entry/exit */}
        <div className="absolute top-0 left-0 w-24 md:w-56 h-full bg-gradient-to-r from-[#08080a] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-24 md:w-56 h-full bg-gradient-to-l from-[#08080a] to-transparent z-10 pointer-events-none"></div>

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
        @keyframes feedbackMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: feedbackMarquee 50s linear infinite;
          width: max-content;
        }
      `}} />
    </section>
  );
}

function FeedbackCard({ item, index }: { item: typeof feedbacks[0], index: number }) {
  const isQuote = index % 3 === 1;

  return (
    <div className="w-[320px] md:w-[420px] flex-shrink-0 mx-3 md:mx-5 flex flex-col whitespace-normal bg-[#111216] border border-white/[0.12] rounded-2xl p-6 md:p-8 shadow-[0_20px_45px_rgba(0,0,0,0.8)] transition-all duration-300 hover:-translate-y-2 hover:border-[#0052ff]/50 hover:shadow-[0_25px_50px_rgba(0,82,255,0.15)]">
      
      {/* Header: Avatar + Author Info + Category Tag */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <img 
            src={item.avatar || `https://i.pravatar.cc/150?img=${(index * 3) + 11}`} 
            alt={item.name} 
            loading="lazy"
            decoding="async"
            className="w-11 h-11 md:w-12 md:h-12 rounded-full border-2 border-[#0052ff] object-cover p-[2px] shadow-[0_0_12px_rgba(0,82,255,0.25)] shrink-0 bg-[#08080a]" 
          />
          <div className="flex flex-col">
            <h4 className="text-white font-bold text-sm md:text-base leading-tight mb-0.5">{item.name}</h4>
            <p className="text-gray-400 text-xs leading-tight line-clamp-1">{item.role}</p>
          </div>
        </div>

        <span className="text-[#0052ff] font-bold text-[10px] md:text-[11px] uppercase tracking-wider bg-[#0052ff]/10 border border-[#0052ff]/20 px-2.5 py-1 rounded-full shrink-0">
          {item.label}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-white text-xl md:text-2xl font-bold mb-3 leading-tight" style={{ fontFamily: "'Anton', sans-serif", letterSpacing: '0.5px' }}>
        {item.title}
      </h3>

      {/* Quote */}
      <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-5 font-normal">
        &ldquo;{item.quote}&rdquo;
      </p>

      {/* Embedded Project Image */}
      {item.image && (
        <div className="w-full h-44 mt-auto rounded-xl overflow-hidden border border-white/[0.1] shadow-inner bg-black/40">
          <img src={item.image} alt="Project reference" loading="lazy" decoding="async" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 opacity-90 hover:opacity-100" />
        </div>
      )}
      
    </div>
  );
}
