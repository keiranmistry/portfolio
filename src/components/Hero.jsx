"use client";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-[#191A1A] overflow-hidden"
    >
      {/* Animated BMW M stripes */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none">
        {/* M Blue Stripe */}
        <div className="m-stripe m-stripe-blue animate-m-stripe-slide" />
        {/* M Dark Blue Stripe */}
        <div className="m-stripe m-stripe-dark animate-m-stripe-slide delay-150" />
        {/* M Red Stripe */}
        <div className="m-stripe m-stripe-red animate-m-stripe-slide delay-300" />
      </div>
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 py-24">
        <h1
          className="text-6xl sm:text-8xl font-extrabold tracking-tight text-center"
          style={{
            letterSpacing: '-0.01em',
            fontFamily: 'Oxygen, sans-serif',
            color: 'transparent',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            textShadow: `
              -0.09em 0.09em 0 #009ADA,
              0em 0.14em 0 #003264,
              0.09em 0.19em 0 #EA0029,
              0 0.25em 0.5em #0008
            `
          }}
        >
          keiran mistry
        </h1>
        <p className="mt-6 text-lg sm:text-2xl text-white/90 text-center font-medium max-w-2xl">
          The Most Powerful Letter in the World.<br />Driven by code. Inspired by performance.
        </p>
        <a
          href="#projects"
          className="mt-10 inline-block bg-white text-[#191A1A] font-bold px-8 py-3 rounded-full shadow-lg hover:bg-[#009ADA] hover:text-white transition-colors text-lg tracking-wide border-2 border-[#009ADA]"
        >
          View My Work
        </a>
      </div>
      {/* BMW M stripes CSS */}
      <style>{`
        .m-stripe {
          position: absolute;
          top: 0;
          left: 0;
          width: 180vw;
          height: 32vw;
          min-width: 1200px;
          min-height: 200px;
          max-width: none;
          max-height: none;
          opacity: 0.85;
          transform: rotate(-24deg) translateY(-30%);
          transition: filter 0.3s;
          filter: blur(0.5px) brightness(0.95);
        }
        .m-stripe-blue {
          background: linear-gradient(90deg, #009ADA 80%, #003264 100%);
          left: -10vw;
          z-index: 1;
        }
        .m-stripe-dark {
          background: linear-gradient(90deg, #003264 80%, #EA0029 100%);
          left: 5vw;
          z-index: 2;
        }
        .m-stripe-red {
          background: linear-gradient(90deg, #EA0029 80%, #191A1A 100%);
          left: 20vw;
          z-index: 3;
        }
        .animate-m-stripe-slide {
          animation: m-stripe-slide-in 1.2s cubic-bezier(0.77,0,0.175,1) both;
        }
        .animate-m-stripe-slide:hover {
          filter: brightness(1.15) drop-shadow(0 0 16px #fff8);
        }
        .delay-150 { animation-delay: 0.15s; }
        .delay-300 { animation-delay: 0.3s; }
        @keyframes m-stripe-slide-in {
          0% { transform: rotate(-24deg) translateY(-80%) scaleX(0.7); opacity: 0; }
          60% { opacity: 1; }
          100% { transform: rotate(-24deg) translateY(-30%) scaleX(1); opacity: 0.85; }
        }
      `}</style>
    </section>
  );
}
