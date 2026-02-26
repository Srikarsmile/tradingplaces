import React, { useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════
   AURORA BACKGROUND — Cinematic atmospheric hero effect
   Flowing gradient blobs + floating particles + mouse reactivity
   Hatom-inspired glow without the WebGL cost
   ═══════════════════════════════════════════════════════ */

const AuroraBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let width, height;
        let animationFrameId;
        let mouseX = 0.5; // normalized 0–1
        let mouseY = 0.5;
        let smoothMouseX = 0.5;
        let smoothMouseY = 0.5;

        // ── Detect reduced motion preference ──
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const speedFactor = prefersReducedMotion ? 0.15 : 1;

        // ── Resize handler ──
        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            ctx.scale(dpr, dpr);
        };
        resize();
        window.addEventListener('resize', resize);

        // ── Mouse tracking ──
        const onMouseMove = (e) => {
            mouseX = e.clientX / width;
            mouseY = e.clientY / height;
        };
        window.addEventListener('mousemove', onMouseMove);

        // ── Aurora blob config ──
        // Each blob is a large radial gradient that drifts and morphs
        const blobs = [
            {
                // Warm Amber glow (top-left)
                color: [245, 158, 11],
                baseX: 0.25, baseY: 0.2,
                radiusX: 0.45, radiusY: 0.4,
                speed: 0.3, phase: 0,
                opacity: 0.12,
                mouseInfluence: 0.08,
            },
            {
                // Electric Violet glow (center-right)
                color: [139, 92, 246],
                baseX: 0.7, baseY: 0.45,
                radiusX: 0.5, radiusY: 0.45,
                speed: 0.25, phase: 2,
                opacity: 0.10,
                mouseInfluence: 0.06,
            },
            {
                // Cyan glow (bottom-center)
                color: [6, 182, 212],
                baseX: 0.5, baseY: 0.75,
                radiusX: 0.4, radiusY: 0.35,
                speed: 0.35, phase: 4,
                opacity: 0.08,
                mouseInfluence: 0.1,
            },
            {
                // Deep violet secondary (upper-right)
                color: [124, 58, 237],
                baseX: 0.8, baseY: 0.15,
                radiusX: 0.3, radiusY: 0.3,
                speed: 0.2, phase: 1.5,
                opacity: 0.06,
                mouseInfluence: 0.04,
            },
            {
                // Amber secondary (lower-left)
                color: [217, 119, 6],
                baseX: 0.15, baseY: 0.65,
                radiusX: 0.35, radiusY: 0.3,
                speed: 0.28, phase: 3.2,
                opacity: 0.07,
                mouseInfluence: 0.07,
            },
        ];

        // ── Particles ──
        const isMobile = width < 768;
        const particleCount = isMobile ? 30 : 70;
        const particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3 - 0.15, // slight upward drift
                opacity: Math.random() * 0.5 + 0.1,
                pulseSpeed: Math.random() * 2 + 1,
                pulsePhase: Math.random() * Math.PI * 2,
                // Color: randomly pick from accent palette
                color: [
                    [245, 158, 11],
                    [139, 92, 246],
                    [6, 182, 212],
                    [238, 240, 246],
                ][Math.floor(Math.random() * 4)],
            });
        }

        // ── Render loop ──
        let time = 0;
        const render = () => {
            time += 0.008 * speedFactor;

            // Smooth mouse position (lerp)
            smoothMouseX += (mouseX - smoothMouseX) * 0.03;
            smoothMouseY += (mouseY - smoothMouseY) * 0.03;

            // Clear with background color
            ctx.fillStyle = '#08090e';
            ctx.fillRect(0, 0, width, height);

            // ── Draw aurora blobs ──
            ctx.globalCompositeOperation = 'lighter'; // additive blending for glow
            for (const blob of blobs) {
                const driftX = Math.sin(time * blob.speed + blob.phase) * 0.08;
                const driftY = Math.cos(time * blob.speed * 0.7 + blob.phase) * 0.06;
                const mouseOffsetX = (smoothMouseX - 0.5) * blob.mouseInfluence;
                const mouseOffsetY = (smoothMouseY - 0.5) * blob.mouseInfluence;

                const cx = (blob.baseX + driftX + mouseOffsetX) * width;
                const cy = (blob.baseY + driftY + mouseOffsetY) * height;
                const rx = blob.radiusX * width;
                const ry = blob.radiusY * height;

                // Pulsing opacity
                const pulse = 1 + Math.sin(time * 1.5 + blob.phase) * 0.2;
                const alpha = blob.opacity * pulse;

                // Draw as an elliptical radial gradient
                ctx.save();
                ctx.translate(cx, cy);
                // Slight rotation for organic feel
                ctx.rotate(Math.sin(time * 0.2 + blob.phase) * 0.15);
                ctx.scale(1, ry / rx);

                const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
                const [r, g, b] = blob.color;
                gradient.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
                gradient.addColorStop(0.4, `rgba(${r},${g},${b},${alpha * 0.5})`);
                gradient.addColorStop(0.7, `rgba(${r},${g},${b},${alpha * 0.15})`);
                gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(0, 0, rx, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            // ── Draw particles ──
            ctx.globalCompositeOperation = 'lighter';
            for (const p of particles) {
                p.x += p.speedX * speedFactor;
                p.y += p.speedY * speedFactor;

                // Wrap around edges
                if (p.x < -10) p.x = width + 10;
                if (p.x > width + 10) p.x = -10;
                if (p.y < -10) p.y = height + 10;
                if (p.y > height + 10) p.y = -10;

                // Pulsing opacity
                const pulse = 0.5 + Math.sin(time * p.pulseSpeed + p.pulsePhase) * 0.5;
                const alpha = p.opacity * pulse;
                const [r, g, b] = p.color;

                // Draw particle with soft glow
                ctx.save();
                ctx.globalAlpha = alpha;
                ctx.fillStyle = `rgb(${r},${g},${b})`;
                ctx.shadowColor = `rgba(${r},${g},${b},0.8)`;
                ctx.shadowBlur = p.size * 4;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            // Reset composite operation
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 1;

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <>
            {/* Main aurora canvas */}
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
            />
            {/* Extra CSS glow layer for bloom depth */}
            <div className="aurora-bloom-layer" />
        </>
    );
};

export default AuroraBackground;
