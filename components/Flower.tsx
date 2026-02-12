
import React from 'react';

const Flower: React.FC = () => {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center animate-bounce-slow">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Stem */}
        <path
          d="M100 200 Q90 150 100 100"
          stroke="#4ade80"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          className="animate-[draw_2s_ease-out_forwards]"
          style={{ strokeDasharray: 200, strokeDashoffset: 200 }}
        />
        
        {/* Leaves */}
        <path
          d="M100 160 Q130 150 120 130 Q100 140 100 160"
          fill="#22c55e"
          className="opacity-0 animate-[fade-in_1s_ease-out_1s_forwards]"
        />
        <path
          d="M100 170 Q70 160 80 140 Q100 150 100 170"
          fill="#22c55e"
          className="opacity-0 animate-[fade-in_1s_ease-out_1.2s_forwards]"
        />

        {/* Petals */}
        <g className="animate-[bloom_3s_ease-out_forwards] origin-center scale-0">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <path
              key={angle}
              transform={`rotate(${angle} 100 100)`}
              d="M100 100 Q130 60 100 30 Q70 60 100 100"
              fill="#fb7185"
              className="opacity-90"
            />
          ))}
          {/* Flower Center */}
          {/* Fixed typo: changed 'sy' to 'cy' */}
          <circle cx="100" cy="100" r="15" fill="#facc15" />
        </g>
      </svg>
      
      <style>{`
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes bloom {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        @keyframes fade-in {
          to { opacity: 1; }
        }
        .animate-bounce-slow {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default Flower;
