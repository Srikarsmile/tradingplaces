import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
        };

        let lastFrame = 0;
        const animate = (now) => {
            if (now - lastFrame >= 33) {
                ringX += (mouseX - ringX) * 0.15;
                ringY += (mouseY - ringY) * 0.15;
                ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
                lastFrame = now;
            }
            requestAnimationFrame(animate);
        };

        document.addEventListener('mousemove', onMouseMove);
        const frameId = requestAnimationFrame(animate);

        const onEnter = () => ring.classList.add('cursor-active');
        const onLeave = () => ring.classList.remove('cursor-active');

        const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
        interactives.forEach((el) => {
            el.addEventListener('mouseenter', onEnter);
            el.addEventListener('mouseleave', onLeave);
        });

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(frameId);
            interactives.forEach((el) => {
                el.removeEventListener('mouseenter', onEnter);
                el.removeEventListener('mouseleave', onLeave);
            });
        };
    }, []);

    return (
        <>
            {/* Small center dot */}
            <div
                ref={dotRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    pointerEvents: 'none',
                    zIndex: 99999,
                    mixBlendMode: 'difference',
                }}
            />
            {/* Trailing ring */}
            <div
                ref={ringRef}
                className="custom-cursor-ring"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: '1.5px solid rgba(255,255,255,0.5)',
                    pointerEvents: 'none',
                    zIndex: 99998,
                    mixBlendMode: 'difference',
                    transition: 'width 0.3s ease, height 0.3s ease, margin 0.3s ease',
                }}
            />
        </>
    );
}
