
import React, { useEffect, useRef } from 'react';

interface CelebrationPageProps {
  onManualPlay: () => void;
}

const CelebrationPage: React.FC<CelebrationPageProps> = ({ onManualPlay }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const hearts: Heart[] = [];
    const heartCount = 60;

    class Heart {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      angle: number;
      spin: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * (canvas.height + 200) - 200;
        this.size = Math.random() * 15 + 10;
        this.speed = Math.random() * 1.8 + 1;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.03;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#f43f5e';
        ctx.beginPath();
        const d = this.size;
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-d / 2, -d / 2, -d, d / 3, 0, d);
        ctx.bezierCurveTo(d, d / 3, d / 2, -d / 2, 0, 0);
        ctx.fill();
        ctx.restore();
      }

      update() {
        this.y += this.speed;
        this.angle += this.spin;
        if (this.y > canvas.height + 20) {
          this.y = -20;
          this.x = Math.random() * canvas.width;
        }
      }
    }

    for (let i = 0; i < heartCount; i++) {
      hearts.push(new Heart());
    }

    let animationFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hearts.forEach(heart => {
        heart.update();
        heart.draw();
      });
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-rose-50 overflow-y-auto relative cursor-pointer"
      onClick={onManualPlay}
    >
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-20"
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center space-y-8 py-10">
        <h1 className="text-5xl md:text-7xl font-romantic text-rose-600 animate-pulse text-center drop-shadow-sm px-4">
          Yay! Happy Valentine's Day! ❤️
        </h1>

        <div className="w-full max-w-md md:max-w-xl rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-white transform transition-all duration-700 hover:scale-[1.03]">
          <img
            src="https://i.postimg.cc/vmHJJhrg/IMG-2776.jpg"
            alt="Jenifer"
            className="w-full h-auto object-cover block"
            loading="lazy"
          />
        </div>

        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-rose-100 max-w-2xl text-center transform hover:translate-y-[-10px] transition-transform duration-500 mx-4">
          <p className="text-2xl md:text-3xl font-romantic text-rose-500 leading-relaxed">
            "Every day with you feels like a dream come true. I'm so lucky to have you as my Valentine today and every day!"
          </p>
          <div className="mt-6 flex justify-center space-x-6 animate-bounce">
            <span className="text-4xl">🌹</span>
            <span className="text-4xl">💖</span>
            <span className="text-4xl">✨</span>
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-rose-400 text-sm font-medium animate-pulse">
            🎵 The music is playing just for you! 🎵
          </p>
          <p className="text-rose-300 text-[10px] italic">
            (If you don't hear music, tap anywhere on the screen)
          </p>
        </div>
      </div>
    </div>
  );
};

export default CelebrationPage;
