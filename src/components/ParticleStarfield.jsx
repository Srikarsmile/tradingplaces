import React, { useEffect, useRef } from 'react';

/**
 * Lightweight 2D canvas starfield — drifting particles for atmospheric depth.
 * Uses a flat 2D canvas (no Three.js, no WebGL) for minimal GPU cost.
 */
export default function ParticleStarfield() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let w = window.innerWidth;
        let h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;

        // Generate particles
        const count = Math.min(120, Math.floor(w * 0.08)); // responsive count
        const particles = [];

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: 0.5 + Math.random() * 1.5,
                dx: (Math.random() - 0.5) * 0.15,
                dy: -0.1 - Math.random() * 0.2, // slowly drift upward
                opacity: 0.2 + Math.random() * 0.5,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: 0.005 + Math.random() * 0.015,
            });
        }

        let frameId;
        const animate = () => {
            ctx.clearRect(0, 0, w, h);

            particles.forEach((p) => {
                // Move
                p.x += p.dx;
                p.y += p.dy;
                p.pulse += p.pulseSpeed;

                // Wrap around
                if (p.y < -5) p.y = h + 5;
                if (p.x < -5) p.x = w + 5;
                if (p.x > w + 5) p.x = -5;

                // Draw with pulsing opacity
                const alpha = p.opacity * (0.6 + Math.sin(p.pulse) * 0.4);
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.fill();
            });

            frameId = requestAnimationFrame(animate);
        };

        animate();

        const onResize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w;
            canvas.height = h;
        };
        window.addEventListener('resize', onResize);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 1,
                pointerEvents: 'none',
                opacity: 0.6,
            }}
        />
    );
}
