
import React, { useState, useRef, useEffect } from 'react';
import ValentinePage from './components/ValentinePage';
import CelebrationPage from './components/CelebrationPage';

const App: React.FC = () => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [shouldPlayMusic, setShouldPlayMusic] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // YouTube Video ID: VsxbtfGqswo
  const videoId = 'VsxbtfGqswo';

  const handleAccept = () => {
    setShouldPlayMusic(true);
    setIsAccepted(true);
    
    // We try to "poke" the iframe immediately during the user gesture.
    // Setting the src directly here is the most reliable way to trigger autoplay with sound.
    if (iframeRef.current) {
      iframeRef.current.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0&mute=0&enablejsapi=1&origin=${window.location.origin}`;
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-pink-100 via-white to-pink-200">
      {/* 
        Hidden YouTube Player 
        We keep it in the DOM but invisible to ensure the browser 
        permits autoplay when the user clicks the "Yes" button.
      */}
      <div 
        className="fixed opacity-0 pointer-events-none -z-50 w-0 h-0 overflow-hidden"
        aria-hidden="true"
      >
        <iframe
          ref={iframeRef}
          width="100%"
          height="100%"
          src="" // Initialized as empty
          title="Background Music"
          frameBorder="0"
          allow="autoplay; encrypted-media"
        ></iframe>
      </div>

      {!isAccepted ? (
        <ValentinePage onAccept={handleAccept} />
      ) : (
        <CelebrationPage />
      )}
    </div>
  );
};

export default App;
