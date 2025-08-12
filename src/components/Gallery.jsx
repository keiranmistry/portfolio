"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
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
  const [isImageLoading, setIsImageLoading] = useState(false);

  // Preload images for smoother transitions
  const preloadImages = useCallback((photos) => {
    if (!photos) return;
    photos.forEach(photo => {
      const img = new Image();
      img.src = `/${photo.filename}`;
    });
  }, []);

  // Preload images when trip is selected
  useEffect(() => {
    if (selectedTrip) {
      const tripPhotos = getTripPhotos(selectedTrip.countryCode, selectedTrip.city, selectedTrip.visit.year);
      if (tripPhotos && tripPhotos.photos) {
        preloadImages(tripPhotos.photos);
      }
    }
  }, [selectedTrip, preloadImages]);

  // Optimized intersection observer with throttling
  useEffect(() => {
    if (hasAnimated) return; // Prevent re-observation

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
        rootMargin: '0px 0px -100px 0px' // Reduced margin for better performance
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

  // Memoized event handlers to prevent unnecessary re-renders
  const handleTripClick = useCallback((trip) => {
    setSelectedTrip(trip);
    setCurrentPhotoIndex(0);
    setIsImageLoading(false);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedTrip(null);
    setCurrentPhotoIndex(0);
  }, []);

  const handlePreviousPhoto = useCallback(() => {
    if (!selectedTrip) return;
    const tripPhotos = getTripPhotos(selectedTrip.countryCode, selectedTrip.city, selectedTrip.visit.year);
    if (!tripPhotos || !tripPhotos.photos) return;
    setIsImageLoading(true);
    setCurrentPhotoIndex((prev) => (prev === 0 ? tripPhotos.photos.length - 1 : prev - 1));
  }, [selectedTrip]);

  const handleNextPhoto = useCallback(() => {
    if (!selectedTrip) return;
    const tripPhotos = getTripPhotos(selectedTrip.countryCode, selectedTrip.city, selectedTrip.visit.year);
    if (!tripPhotos || !tripPhotos.photos) return;
    setIsImageLoading(true);
    setCurrentPhotoIndex((prev) => (prev === tripPhotos.photos.length - 1 ? 0 : prev + 1));
  }, [selectedTrip]);

  const handlePhotoIndexChange = useCallback((index) => {
    setIsImageLoading(true);
    setCurrentPhotoIndex(index);
  }, []);

  // Optimized keyboard navigation
  useEffect(() => {
    if (!isModalOpen) return;
    
    const handleKeyDown = (e) => {
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
  }, [isModalOpen, handlePreviousPhoto, handleNextPhoto, handleCloseModal]);

  // Memoized helper functions
  const getCityEmoji = useCallback((cityName) => {
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
      'Rotorua': '♨️',
      'London': '⚽️'
    };
    return cityEmojis[cityName] || '📸';
  }, []);

  const getGradientForCity = useCallback((cityName) => {
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
  }, []);

  // Memoized gallery items generation
  const generateGalleryItems = useCallback(() => {
    const items = [];
    let itemIndex = 0;

    Object.entries(travelData).forEach(([countryCode, country]) => {
      if (Object.keys(country.cities).length > 0) {
        Object.entries(country.cities).forEach(([cityName, visits]) => {
          visits.forEach((visit, visitIndex) => {
            // Check if this trip has photos in photoData
            const tripPhotos = getTripPhotos(countryCode, cityName, visit.year);
            if (tripPhotos && tripPhotos.photos && tripPhotos.photos.length > 0) {
              items.push({
                id: `${countryCode}-${cityName}-${visitIndex}`,
                country: country.name,
                countryCode: countryCode,
                city: cityName,
                visit: visit,
                emoji: getCityEmoji(cityName),
                gradient: getGradientForCity(cityName),
                delay: 0.2 + (itemIndex * 0.05) // Reduced delay for better performance
              });
              itemIndex++;
            }
          });
        });
      }
    });

    // Sort items by date (newest first)
    items.sort((a, b) => {
      const aYear = parseInt(a.visit.year);
      const bYear = parseInt(b.visit.year);
      
      return bYear - aYear; // Newest year first
    });

    return items;
  }, [getCityEmoji, getGradientForCity]);

  // Memoized gallery items
  const galleryItems = useMemo(() => generateGalleryItems(), [generateGalleryItems]);

  // Simplified animation variants for better performance
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.05,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <>
      <section ref={sectionRef} id="gallery" className="py-20" style={{ background: 'linear-gradient(to bottom right, #0266B1, #033E7A, #E22716)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-6xl sm:text-8xl font-bold italic mb-4" 
              style={{ color: '#b7e4f7' }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={controls}
              variants={{
                visible: { 
                  scale: 1, 
                  opacity: 1,
                  transition: { duration: 0.5, ease: "easeOut" }
                }
              }}
            >
              <em>gallery</em>
            </motion.h2>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {galleryItems.map((item) => (
              <motion.div
                key={item.id}
                className="backdrop-blur-sm bg-white/5 border border-white/20 shadow-xl rounded-2xl overflow-hidden cursor-pointer hover:bg-white/10 transition-all duration-200"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.01,
                  transition: { duration: 0.1, ease: "easeOut" }
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
                      {item.visit.year}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Trip Gallery Modal - Only render when open */}
        <AnimatePresence>
          {isModalOpen && selectedTrip && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-lg z-50 flex items-center justify-center p-4"
              onClick={handleCloseModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-hidden"
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
                        {selectedTrip.country} • {selectedTrip.visit.year}
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
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="aspect-[4/3] w-full max-w-4xl relative overflow-hidden"
                    >
                      {(() => {
                        const tripPhotos = getTripPhotos(selectedTrip.countryCode, selectedTrip.city, selectedTrip.visit.year);
                        if (tripPhotos && tripPhotos.photos) {
                          const currentPhoto = tripPhotos.photos[currentPhotoIndex];
                          return (
                            <div className="w-full h-full flex items-center justify-center -mt-8">
                              {isImageLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-10">
                                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                                </div>
                              )}
                              <img 
                                src={`/${currentPhoto.filename}`}
                                alt={currentPhoto.description}
                                className="max-w-full max-h-[80%] object-contain rounded-lg transition-opacity duration-300"
                                onLoad={() => setIsImageLoading(false)}
                                onError={() => setIsImageLoading(false)}
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
                    const tripPhotos = getTripPhotos(selectedTrip.countryCode, selectedTrip.city, selectedTrip.visit.year);
                    if (tripPhotos && tripPhotos.photos) {
                      return tripPhotos.photos.map((photo, index) => (
                        <button
                          key={index}
                          onClick={() => handlePhotoIndexChange(index)}
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
      </section>
      
      {/* Footer */}
      <Footer />
    </>
  );
} 