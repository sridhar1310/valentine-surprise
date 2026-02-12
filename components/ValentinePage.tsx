
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Flower from './Flower';

interface ValentinePageProps {
  onAccept: () => void;
}

const ValentinePage: React.FC<ValentinePageProps> = ({ onAccept }) => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isMoved, setIsMoved] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const moveButton = useCallback(() => {
    const padding = 20; // Safe distance from screen edges
    const btnWidth = noButtonRef.current?.offsetWidth || 100;
    const btnHeight = noButtonRef.current?.offsetHeight || 50;
    
    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;
    
    // Generate random position within viewport bounds
    const newX = Math.max(padding, Math.random() * maxX);
    const newY = Math.max(padding, Math.random() * maxY);
    
    setNoButtonPos({ x: newX, y: newY });
    setIsMoved(true);
  }, []);

  useEffect(() => {
    const handleInteraction = (e: MouseEvent | TouchEvent) => {
      if (!noButtonRef.current) return;
      
      const rect = noButtonRef.current.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;
      
      let clientX: number, clientY: number;
      if (e instanceof MouseEvent) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else if (window.TouchEvent && e instanceof TouchEvent && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        return;
      }

      const distance = Math.sqrt(
        Math.pow(clientX - buttonCenterX, 2) + 
        Math.pow(clientY - buttonCenterY, 2)
      );

      // Trigger teleport if cursor/finger is within 100px of center
      if (distance < 100) {
        moveButton();
      }
    };

    window.addEventListener('mousemove', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: false });
    window.addEventListener('touchmove', handleInteraction, { passive: false });

    return () => {
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('touchmove', handleInteraction);
    };
  }, [moveButton]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full px-4 text-center overflow-hidden">
      <div className="max-w-xl w-full flex flex-col items-center">
        <Flower />
        
        <h1 className="text-5xl md:text-7xl font-romantic text-rose-600 mt-8 mb-12 drop-shadow-sm select-none">
          Will you be my valentine Jenifer?
        </h1>

        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full relative min-h-[120px]">
          <button
            onClick={onAccept}
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-12 rounded-full text-2xl shadow-lg transform transition hover:scale-110 active:scale-95 z-50 cursor-pointer"
          >
            Yes! ❤️
          </button>

          <button
            ref={noButtonRef}
            tabIndex={-1}
            onMouseEnter={moveButton}
            onTouchStart={(e) => {
              // This ensures that even a direct touch teleports the button instantly
              // and prevents the "click" event from ever firing.
              e.preventDefault();
              moveButton();
            }}
            style={isMoved ? {
              position: 'fixed',
              left: `${noButtonPos.x}px`,
              top: `${noButtonPos.y}px`,
              zIndex: 40,
              transition: 'none' // Instant teleport
            } : {
              zIndex: 40
            }}
            className="bg-gray-100 text-gray-400 font-semibold py-3 px-10 rounded-full text-xl border-2 border-gray-200 pointer-events-auto select-none"
          >
            No
          </button>
        </div>

        <p className="mt-16 text-rose-400 font-light italic animate-pulse select-none">
          (There is only one right answer... 😉)
        </p>
      </div>
    </div>
  );
};

export default ValentinePage;
