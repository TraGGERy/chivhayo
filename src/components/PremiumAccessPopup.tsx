import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface PremiumAccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PremiumAccessPopup = ({ isOpen, onClose }: PremiumAccessPopupProps) => {
  const [animateGold, setAnimateGold] = useState(false);
  
  // Add subtle gold animation effect
  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setAnimateGold(true);
        setTimeout(() => setAnimateGold(false), 2000);
      }, 5000);
      
      // Initial animation
      setAnimateGold(true);
      setTimeout(() => setAnimateGold(false), 2000);
      
      return () => clearInterval(interval);
    }
  }, [isOpen]);
  
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="bg-gradient-to-b from-[#0a0a12] to-[#0f0f1a] border border-[#d4af37]/30 w-full max-w-md overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.15)] rounded-md"
            onClick={e => e.stopPropagation()}
          >
            {/* Premium Header */}
            <div className="border-b border-[#d4af37]/20 p-4 flex items-center justify-between bg-[#080810] bg-opacity-80 backdrop-filter backdrop-blur-sm">
              <div className="flex items-center">
                <div className="relative w-12 h-12 mr-3">
                  <Image
                    src="/wc-premium-crest.png" 
                    alt="Premium Access"
                    fill
                    className={`object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.3)] ${
                      animateGold ? 'filter brightness-150' : ''
                    }`}
                  />
                </div>
                <div>
                  <h3 className="text-[#d4af37] tracking-wider text-sm font-light">EXCLUSIVE ACCESS</h3>
                  <div className="flex items-center mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mr-2 animate-pulse"></div>
                    <span className="text-xs text-gray-400">MEMBERS ONLY</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="text-[#d4af37]/70 hover:text-[#d4af37] transition-colors duration-300 w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#d4af37]/10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 bg-[url('/luxury-pattern.png')] bg-opacity-5" style={{ backgroundBlendMode: 'overlay' }}>
              <div className="text-center">
                <motion.div 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-4 relative mx-auto w-24 h-24"
                >
                  <Image
                    src="/vip-access-icon.png" 
                    alt="VIP Access"
                    fill
                    className={`object-contain ${animateGold ? 'filter brightness-125' : ''}`}
                  />
                  <div className={`absolute inset-0 bg-[#d4af37]/10 rounded-full blur-xl transform scale-75 transition-opacity duration-1000 ${animateGold ? 'opacity-100' : 'opacity-0'}`}></div>
                </motion.div>
                
                <motion.h2 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-light text-[#d4af37] mb-3"
                >
                  Premium Access Coming Soon
                </motion.h2>
                
                <motion.p 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-300 mb-6 font-light"
                >
                  Sir Wicknell's exclusive network and premium services will be available to select members by invitation only.
                </motion.p>
                
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col space-y-4"
                >
                  <div className="bg-[#0a0a12]/80 border border-[#d4af37]/20 p-4 rounded-md">
                    <div className="flex items-center mb-2">
                      <div className="w-5 h-5 mr-2 text-[#d4af37]">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                      </div>
                      <h4 className="text-[#d4af37] text-sm">Exclusive Benefits</h4>
                    </div>
                    <p className="text-xs text-gray-400 pl-7">Direct access to Sir Wicknell's business network, investment opportunities, and luxury lifestyle events.</p>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <button 
                      className="bg-gradient-to-r from-[#d4af37]/20 to-[#d4af37]/30 border border-[#d4af37]/40 text-[#d4af37] px-6 py-2 rounded-md hover:from-[#d4af37]/30 hover:to-[#d4af37]/40 transition-all duration-300 flex items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        // Play subtle sound effect for premium feel
                        const audio = new Audio('/premium-notification.mp3');
                        audio.volume = 0.2;
                        audio.play().catch(e => console.log('Audio play prevented by browser policy'));
                      }}
                    >
                      <span className="mr-2">Request Invitation</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="border-t border-[#d4af37]/20 p-3 bg-[#080810] bg-opacity-90 backdrop-filter backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 relative mr-2">
                    <Image
                      src="/wc-premium-crest.png"
                      alt="Premium"
                      fill
                      className="object-contain opacity-70"
                    />
                  </div>
                  <span className="text-xs text-[#d4af37]/60 tracking-wider">BY INVITATION ONLY</span>
                </div>
                <div className="text-xs text-[#d4af37]/60 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>2024</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PremiumAccessPopup;