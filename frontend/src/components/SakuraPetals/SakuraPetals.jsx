import React, { useEffect, useRef } from 'react';
import './SakuraPetals.css';

export default function SakuraPetals() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Number of petals based on screen size
    const petalCount = Math.floor(Math.min(width, 1400) / 35);
    const petals = [];

    // Sakura petal colors
    const colors = [
      { fill: 'rgba(255, 182, 217, 0.75)', shadow: 'rgba(255, 182, 217, 0.4)' },
      { fill: 'rgba(255, 153, 198, 0.70)', shadow: 'rgba(255, 153, 198, 0.35)' },
      { fill: 'rgba(255, 128, 181, 0.65)', shadow: 'rgba(255, 128, 181, 0.3)' },
      { fill: 'rgba(255, 217, 233, 0.80)', shadow: 'rgba(255, 217, 233, 0.4)' },
    ];

    class Petal {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : -20;
        this.size = 10 + Math.random() * 14;
        this.speedY = 0.8 + Math.random() * 1.2;
        this.speedX = -0.3 + Math.random() * 0.6;
        this.swaySpeed = 0.01 + Math.random() * 0.02;
        this.swayAmplitude = 1 + Math.random() * 2;
        this.swayAngle = Math.random() * Math.PI * 2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.03;
        this.flipSpeed = Math.random() * 0.03;
        this.flipAngle = Math.random() * Math.PI * 2;
        this.opacity = 0.5 + Math.random() * 0.4;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y += this.speedY;
        this.swayAngle += this.swaySpeed;
        this.x += Math.sin(this.swayAngle) * this.swayAmplitude + this.speedX;
        this.rotation += this.rotationSpeed;
        this.flipAngle += this.flipSpeed;

        // Reset if off screen
        if (this.y > height + 20 || this.x < -40 || this.x > width + 40) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // 3D flipping simulation using scaleY
        const scaleY = Math.abs(Math.sin(this.flipAngle));
        ctx.scale(1, scaleY < 0.15 ? 0.15 : scaleY);

        ctx.fillStyle = this.color.fill;
        ctx.shadowColor = this.color.shadow;
        ctx.shadowBlur = 6;

        // Draw curved Sakura petal path
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(
          -this.size / 2, -this.size / 2,
          -this.size / 2, -this.size * 1.2,
          0, -this.size * 1.5
        );
        ctx.bezierCurveTo(
          this.size / 2, -this.size * 1.2,
          this.size / 2, -this.size / 2,
          0, 0
        );
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }
    }

    // Initialize petals
    for (let i = 0; i < petalCount; i++) {
      petals.push(new Petal());
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        petals[i].update();
        petals[i].draw();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="sakura-canvas" />;
}
