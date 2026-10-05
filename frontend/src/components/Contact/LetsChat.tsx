
export default function LetsChat() {
  return (
    <section id="contact" className="w-full bg-white py-24 px-6 md:px-12 flex justify-center items-center">
      <div className="w-full max-w-[1600px] flex flex-col items-center">
        
        {/* Title */}
        <h1 
          className="text-black text-[clamp(4rem,15vw,14rem)] uppercase leading-none text-center m-0" 
          style={{ fontFamily: "'Anton', sans-serif", letterSpacing: '-0.02em', transform: 'scaleY(1.1)' }}
        >
          Let's have a chat
        </h1>

        {/* Divider */}
        <hr className="w-full border-t border-black/20 mt-12 mb-8" />

        {/* Buttons */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <a 
              href="mailto:pramudithadilantha89@gmail.com" 
              className="bg-gray-100 hover:bg-gray-200 text-black text-sm md:text-base font-medium py-4 px-8 rounded-full border border-black/10 transition-all hover:-translate-y-1 inline-flex items-center justify-center whitespace-nowrap"
            >
              pramudithadilantha89@gmail.com
            </a>
            <a 
              href="tel:+94756813888" 
              className="bg-gray-100 hover:bg-gray-200 text-black text-sm md:text-base font-medium py-4 px-8 rounded-full border border-black/10 transition-all hover:-translate-y-1 inline-flex items-center justify-center whitespace-nowrap"
            >
              +94 75 681 3888
            </a>
          </div>

          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="bg-transparent hover:bg-black/5 text-black text-sm md:text-base font-medium py-4 px-10 rounded-full border border-black/20 transition-all hover:-translate-y-1 flex items-center justify-center group gap-6 w-full md:w-auto cursor-pointer"
          >
            <div className="flex items-center opacity-40 group-hover:opacity-100 transition-opacity duration-300">
               <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-[-4px]">
                 <path d="M5.5 1L1 6L5.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                 <path d="M1 6H24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
               </svg>
            </div>
            Back to Top
          </button>

        </div>
      </div>
    </section>
  );
}
