"use client";

import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'], // or just '700' if you only want bold
});

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
          className={`text-7xl sm:text-9xl font-extrabold tracking-tight text-center flex flex-wrap justify-center gap-x-4 ${montserrat.className}`}
          style={{
            letterSpacing: '-0.01em',
          }}
        >
          <span
            className="split-left"
            style={{
              color: 'transparent',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              textShadow: `
                -0.06em 0.06em 0 #009ADA,
                0em 0.1em 0 #003264,
                0.06em 0.12em 0 #EA0029,
                0 0.18em 0.4em #0008
              `,
              display: 'inline-block',
            }}
          >
            keiran
          </span>
          <span
            className="split-right"
            style={{
              color: 'transparent',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              textShadow: `
                -0.06em 0.06em 0 #009ADA,
                0em 0.09em 0 #003264,
                0.06em 0.12em 0 #EA0029,
                0 0.18em 0.4em #0008
              `,
              display: 'inline-block',
            }}
          >
            mistry
          </span>
        </h1>
        <p className="mt-6 text-lg sm:text-2xl text-white/90 text-center font-medium max-w-2xl slide-up-in">
          <strong>Data Science at the <a href="https://uwaterloo.ca/" target="_blank" rel="noopener noreferrer" className="hover:text-[#fbb13c] transition-colors">University of Waterloo</a></strong>
        </p>
        <a
          href="#projects"
          className="mt-10 inline-block bg-white text-[#191A1A] font-bold px-8 py-3 rounded-full shadow-lg hover:bg-[#009ADA] hover:text-white transition-colors text-lg tracking-wide border-2 border-[#009ADA]"
        >
          View My Work
        </a>
      </div>
      {/* BMW M stripes CSS and split text animation */}
      <style>{`
        .m-stripe {
          position: absolute;
          top: 0;
          left: 0;
          width: 140vw;
          height: 120vh;
          min-width: 10vw;
          min-height: 100vh;
          max-width: none;
          max-height: none;
          opacity: 0.85;
          transform: rotate(-24deg) scale(1.2);
          transition: filter 0.3s;
          filter: blur(0.5px) brightness(0.95);
        }
        .m-stripe-blue {
          background: linear-gradient(90deg, #009ADA 38%, #003264 100%);
          left: -49vw;
          z-index: 1;
        }
        .m-stripe-dark {
          background: linear-gradient(90deg, #003264 38%, #EA0029 100%);
          left: 31vw;
          z-index: 2;
        }
        .m-stripe-red {
          background: linear-gradient(90deg, #EA0029 38%, #191A1A 100%);
          left: 76vw;
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
          0% { transform: rotate(-24deg) scale(1.2) translateY(-80%) scaleX(0.7); opacity: 0; }
          60% { opacity: 1; }
          100% { transform: rotate(-24deg) scale(1.2); opacity: 0.85; }
        }
        .split-left {
          animation: splitLeftIn 1s cubic-bezier(0.77,0,0.175,1) 0.2s both;
        }
        .split-right {
          animation: splitRightIn 1s cubic-bezier(0.77,0,0.175,1) 0.2s both;
        }
        @keyframes splitLeftIn {
          0% { opacity: 0; transform: translateX(-80%) scale(0.8); }
          60% { opacity: 1; }
          80% { opacity: 1; transform: translateX(0) scale(1.04); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes splitRightIn {
          0% { opacity: 0; transform: translateX(80%) scale(0.8); }
          60% { opacity: 1; }
          80% { opacity: 1; transform: translateX(0) scale(1.04); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        .slide-up-in {
          animation: slideUpIn 1s cubic-bezier(0.77,0,0.175,1) 1.3s both;
        }
        @keyframes slideUpIn {
          0% { opacity: 0; transform: translateY(60%) scale(0.92); }
          60% { opacity: 1; }
          80% { opacity: 1; transform: translateY(0) scale(1.04); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </section>
  );
}
