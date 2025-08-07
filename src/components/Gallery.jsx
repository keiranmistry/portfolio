"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Exo_2 } from 'next/font/google';
import { travelData } from '../lib/travelData';
import { getTripPhotos } from '../lib/photoData';
import Footer from './Footer';

const exo2 = Exo_2({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Gallery() {
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Intersection Observer for smooth animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true);
          controls.start('visible');
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -200px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls, hasAnimated]);

  // Handle trip selection
  const handleTripClick = (trip) => {
    setSelectedTrip(trip);
    setCurrentPhotoIndex(0);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTrip(null);
    setCurrentPhotoIndex(0);
  };

  // Handle photo navigation
  const handlePreviousPhoto = () => {
    if (!selectedTrip) return;
    const tripPhotos = getTripPhotos(selectedTrip.countryCode, selectedTrip.city, selectedTrip.visit.month, selectedTrip.visit.year);
    if (!tripPhotos || !tripPhotos.photos) return;
    setCurrentPhotoIndex((prev) => (prev === 0 ? tripPhotos.photos.length - 1 : prev - 1));
  };

  const handleNextPhoto = () => {
    if (!selectedTrip) return;
    const tripPhotos = getTripPhotos(selectedTrip.countryCode, selectedTrip.city, selectedTrip.visit.month, selectedTrip.visit.year);
    if (!tripPhotos || !tripPhotos.photos) return;
    setCurrentPhotoIndex((prev) => (prev === tripPhotos.photos.length - 1 ? 0 : prev + 1));
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      
      if (e.key === 'ArrowLeft') {
        handlePreviousPhoto();
      } else if (e.key === 'ArrowRight') {
        handleNextPhoto();
      } else if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Generate gallery items from travel data
  const generateGalleryItems = () => {
    const items = [];
    let itemIndex = 0;

    Object.entries(travelData).forEach(([countryCode, country]) => {
      if (Object.keys(country.cities).length > 0) {
        Object.entries(country.cities).forEach(([cityName, visits]) => {
          visits.forEach((visit, visitIndex) => {
            // Check if this trip has photos in photoData
            const tripPhotos = getTripPhotos(countryCode, cityName, visit.month, visit.year);
            if (tripPhotos && tripPhotos.photos && tripPhotos.photos.length > 0) {
              items.push({
                id: `${countryCode}-${cityName}-${visitIndex}`,
                country: country.name,
                countryCode: countryCode,
                city: cityName,
                visit: visit,
                emoji: getCityEmoji(cityName),
                gradient: getGradientForCity(cityName),
                delay: 0.4 + (itemIndex * 0.1)
              });
              itemIndex++;
            }
          });
        });
      }
    });

    return items;
  };

  // Get emoji for city
  const getCityEmoji = (cityName) => {
    const cityEmojis = {
      'Toronto': '🏙️',
      'Vancouver': '🌲',
      'Calgary': '🏔️',
      'Edmonton': '🏢',
      'Montreal': '🍁',
      'Ottawa': '🏛️',
      'Quebec City': '🏰',
      'Halifax': '⚓',
      'Winnipeg': '🌾',
      'Saskatoon': '🌾',
      'Victoria': '🌺',
      "St. John's": '🌊',
      'New York': '🗽',
      'Los Angeles': '🌴',
      'San Francisco': '🌉',
      'Paris': '🗼',
      'Lyon': '🍷',
      'Marseille': '⚓',
      'Auckland': '🌋',
      'Wellington': '🌊',
      'Queenstown': '🏔️',
      'Christchurch': '⛪',
      'Rotorua': '♨️'
    };
    return cityEmojis[cityName] || '📸';
  };

  // Get gradient for city
  const getGradientForCity = (cityName) => {
    const gradients = [
      'from-blue-400/20 to-purple-500/20',
      'from-green-400/20 to-blue-500/20',
      'from-orange-400/20 to-red-500/20',
      'from-purple-400/20 to-pink-500/20',
      'from-teal-400/20 to-cyan-500/20',
      'from-yellow-400/20 to-orange-500/20',
      'from-indigo-400/20 to-purple-500/20',
      'from-pink-400/20 to-red-500/20',
      'from-cyan-400/20 to-blue-500/20',
      'from-emerald-400/20 to-green-500/20'
    ];
    
    // Use city name to get consistent gradient
    const index = cityName.length % gradients.length;
    return gradients[index];
  };

  const galleryItems = generateGalleryItems();

  return (
    <section ref={sectionRef} id="gallery" className="py-20" style={{ background: 'linear-gradient(to bottom right, #0266B1, #033E7A, #E22716)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-6xl sm:text-8xl font-bold italic mb-4" 
            style={{ color: '#C2DDDD' }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={controls}
            variants={{
              visible: { 
                scale: [0.8, 1.1, 1], 
                opacity: 1 
              }
            }}
            transition={{ 
              duration: 0.6, 
              ease: "easeOut",
              delay: 0.1
            }}
          >
            <em>gallery</em>
          </motion.h2>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut",
            delay: 0.3
          }}
        >
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              className="backdrop-blur-xl bg-white/5 border border-white/20 shadow-2xl rounded-2xl overflow-hidden cursor-pointer hover:bg-white/10 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ 
                duration: 0.6, 
                delay: item.delay,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              onClick={() => handleTripClick(item)}
            >
              <div className={`aspect-square bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                <div className="text-center p-6">
                  <div className="text-4xl mb-4">{item.emoji}</div>
                  <h4 className={`text-xl font-semibold text-white mb-2 ${exo2.className}`}>
                    {item.city}
                  </h4>
                  <p className={`text-white/70 text-sm mb-2 ${exo2.className}`}>
                    {item.country}
                  </p>
                  <p className={`text-white/60 text-xs ${exo2.className}`}>
                    {item.visit.month} {item.visit.year}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Trip Gallery Modal */}
      <AnimatePresence>
        {isModalOpen && selectedTrip && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{selectedTrip.emoji}</div>
                  <div>
                    <h3 className={`text-3xl font-bold text-white ${exo2.className}`}>
                      {selectedTrip.city}
                    </h3>
                    <p className={`text-white/70 text-lg ${exo2.className}`}>
                      {selectedTrip.country} • {selectedTrip.visit.month} {selectedTrip.visit.year}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-white/60 hover:text-white transition-colors p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Main Photo Gallery */}
              <div className="relative flex items-center justify-center mb-6">
                {/* Left Navigation Button */}
                <button
                  onClick={handlePreviousPhoto}
                  className="absolute left-4 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm cursor-pointer"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Main Photo */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPhotoIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="aspect-[4/3] w-full max-w-4xl relative overflow-hidden"
                  >
                  {(() => {
                    const tripPhotos = getTripPhotos(selectedTrip.countryCode, selectedTrip.city, selectedTrip.visit.month, selectedTrip.visit.year);
                    if (tripPhotos && tripPhotos.photos) {
                      const currentPhoto = tripPhotos.photos[currentPhotoIndex];
                      return (
                        <div className="w-full h-full flex items-center justify-center -mt-8">
                          <img 
                            src={`/${currentPhoto.filename}`}
                            alt={currentPhoto.description}
                            className="max-w-full max-h-[80%] object-contain rounded-lg"
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-400/20 to-gray-600/20 rounded-lg border border-white/20">
                          <div className="text-center">
                            <div className="text-6xl mb-4">📸</div>
                            <p className={`text-white/60 text-lg ${exo2.className}`}>
                              No photos available
                            </p>
                          </div>
                        </div>
                      );
                    }
                  })()}
                  </motion.div>
                </AnimatePresence>

                {/* Right Navigation Button */}
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm cursor-pointer"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Photo Thumbnails */}
              <div className="flex justify-center gap-2 mb-6">
                {(() => {
                  const tripPhotos = getTripPhotos(selectedTrip.countryCode, selectedTrip.city, selectedTrip.visit.month, selectedTrip.visit.year);
                  if (tripPhotos && tripPhotos.photos) {
                    return tripPhotos.photos.map((photo, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPhotoIndex(index)}
                        className={`w-16 h-12 rounded-lg border-2 transition-all duration-200 ${
                          index === currentPhotoIndex
                            ? 'border-white bg-white/20'
                            : 'border-white/30 bg-white/10 hover:border-white/50'
                        }`}
                      >
                        <div className="w-full h-full flex items-center justify-center text-xs text-white/60">
                          {index + 1}
                        </div>
                      </button>
                    ));
                  } else {
                    return <div className="text-white/40 text-sm">No photos available</div>;
                  }
                })()}
              </div>

              {/* Trip Details */}
              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className={`text-lg font-semibold text-white mb-3 ${exo2.className}`}>
                  Trip Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/70">
                  <div>
                    <p><strong>Duration:</strong> 3-5 days</p>
                    <p><strong>Accommodation:</strong> Hotel/Airbnb</p>
                    <p><strong>Transportation:</strong> Public transit, walking</p>
                  </div>
                  <div>
                    <p><strong>Highlights:</strong> Local cuisine, landmarks</p>
                    <p><strong>Weather:</strong> Seasonal conditions</p>
                    <p><strong>Budget:</strong> Moderate</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Spacing between gallery and footer */}
      <div className="h-20"></div>
      
      {/* Footer */}
      <Footer />
    </section>
  );
} 