
import React, { useState, useRef, useEffect } from 'react';
import ValentinePage from './components/ValentinePage';
import CelebrationPage from './components/CelebrationPage';

const App: React.FC = () => {
  const [isAccepted, setIsAccepted] = useState(false);
  const playerRef = useRef<any>(null);
  const videoId = 'VsxbtfGqswo';

  useEffect(() => {
    // Load YouTube API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: videoId,
          mute: 0,
          enablejsapi: 1,
          origin: window.location.origin
        },
        events: {
          onReady: (event: any) => {
            // Player is ready
          }
        }
      });
    };
  }, []);

  const handleAccept = () => {
    setIsAccepted(true);
    if (playerRef.current && playerRef.current.playVideo) {
      playerRef.current.playVideo();
      // Unmute just in case
      playerRef.current.unMute();
    }
  };

  const handleManualPlay = () => {
    if (playerRef.current && playerRef.current.playVideo) {
      playerRef.current.playVideo();
      playerRef.current.unMute();
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
        className="fixed opacity-0 pointer-events-none -z-50 w-1 h-1 overflow-hidden"
        aria-hidden="true"
      >
        <div id="youtube-player"></div>
      </div>

      {!isAccepted ? (
        <ValentinePage onAccept={handleAccept} />
      ) : (
        <CelebrationPage onManualPlay={handleManualPlay} />
      )}
    </div>
  );
};

export default App;
