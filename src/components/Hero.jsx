"use client";

import { Barlow } from 'next/font/google';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '700'], // or just '700' if you only want bold
});

import { Exo_2 } from 'next/font/google';

const exo2 = Exo_2({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'], // choose the weights you want
  display: 'swap',
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
          className={`text-7xl sm:text-9xl font-extrabold tracking-tight text-center flex flex-wrap justify-center gap-x-4 ${barlow.className}`}
          style={{
            letterSpacing: '-0.01em',
          }}
        >
          <span
            className="split-left"
            style={{
              color: '#fff',
              backgroundClip: undefined,
              WebkitBackgroundClip: undefined,
              textShadow: undefined,
              display: 'inline-block',
            }}
          >
            <em>Keiran</em>
          </span>
          <span
            className="split-right"
            style={{
              color: '#fff',
              backgroundClip: undefined,
              WebkitBackgroundClip: undefined,
              textShadow: undefined,
              display: 'inline-block',
            }}
          >
            <em>Mistry</em>
          </span>
        </h1>
        <p className="mt-6 text-lg sm:text-2xl text-white/90 text-center font-medium max-w-2xl slide-up-in">
          <strong className={`${exo2.className}`} style={{ color: '#A2D6F9' }}>
            Data Science at the <a href="https://uwaterloo.ca/" target="_blank" rel="noopener noreferrer" className="hover:text-[#fbb13c] transition-colors">University of Waterloo</a>
          </strong>
        </p>
        {/* Glassmorphism Social Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
          <a
            href="https://www.linkedin.com/in/keiranmistry/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg backdrop-blur-md bg-white/10 border border-white/30 shadow-lg text-[#A2D6F9] font-bold text-lg transition-all transition-transform duration-400 active:scale-95 hover:scale-105 hover:bg-white/20 hover:text-white hover:border-white/15 hover:shadow focus:outline-none focus:none focus:ring-[#A2D6F9] hover:backdrop-blur-sm animate-pop-up btn-delay-1"
          >
            {/* LinkedIn SVG Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="inline-block align-middle">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.028-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.939v5.667H9.353V9h3.413v1.561h.049c.476-.9 1.637-1.852 3.367-1.852 3.599 0 4.263 2.368 4.263 5.455v6.288zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
            </svg>
            LinkedIn
          </a>
          <a
            href="https://github.com/keiranmistry"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg backdrop-blur-md bg-white/10 border border-white/30 shadow-lg text-[#A2D6F9] font-bold text-lg transition-all transition-transform duration-400 active:scale-95 hover:scale-105 hover:bg-white/20 hover:text-white hover:border-white/15 hover:shadow focus:outline-none focus:none focus:ring-[#A2D6F9] hover:backdrop-blur-sm animate-pop-up btn-delay-2"
          >
            {/* GitHub SVG Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="inline-block align-middle">
              <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.399 3.003-.404 1.018.005 2.046.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.218.694.825.576C20.565 21.796 24 17.299 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <a
            href="mailto:k3mistry@uwaterloo.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg backdrop-blur-md bg-white/10 border border-white/30 shadow-lg text-[#A2D6F9] font-bold text-lg transition-all transition-transform duration-400 active:scale-95 hover:scale-105 hover:bg-white/20 hover:text-white hover:border-white/15 hover:shadow focus:outline-none focus:none focus:ring-[#A2D6F9] hover:backdrop-blur-sm animate-pop-up btn-delay-3"
          >
            {/* GitHub SVG Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="inline-block align-middle">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8l8 5 8-5v10H4z"/>
            </svg>
            Email
          </a>
        </div>
        {/* Downward Chevron Arrow to Projects */}
        <a
          href="#projects"
          onClick={e => {
            e.preventDefault();
            const el = document.getElementById('projects');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="mt-12 flex flex-col items-center group cursor-pointer chevron-appear-bounce"
          aria-label="Scroll to Projects"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="none"
            viewBox="0 0 24 24"
            className="text-[#A2D6F9] group-hover:text-[#FFFFFF] transition-colors duration-300 drop-shadow-lg"
          >
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 9l6 6 6-6"
            />
          </svg>
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
        @keyframes popUp {
          0% { opacity: 0; transform: translateY(40%) scale(0.92); }
          60% { opacity: 1; }
          80% { opacity: 1; transform: translateY(0) scale(1.08); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-pop-up {
          animation: popUp 0.8s cubic-bezier(0.77,0,0.175,1) both;
        }
        .btn-delay-1 { animation-delay: 2.2s; }
        .btn-delay-2 { animation-delay: 2.35s; }
        .btn-delay-3 { animation-delay: 2.5s; }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(18px); }
        }
        .animate-bounce-slow {
          animation: bounceSlow 1.8s infinite;
        }
        .chevron-delay { animation-delay: 5s !important; }
        .chevron-fade-in {
          opacity: 0;
          animation: chevronFadeIn 0.6s ease forwards;
          animation-delay: 4s;
        }
        @keyframes chevronFadeIn {
          to { opacity: 1; }
        }
        .chevron-appear-bounce {
          opacity: 0;
          animation:
            chevronFadeIn 0.6s ease forwards 4s,
            bounceSlow 1.8s infinite 5s;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  );
}
