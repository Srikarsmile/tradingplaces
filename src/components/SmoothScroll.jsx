import React from 'react';

// Lenis smooth scroll disabled for performance — the Three.js canvas + Framer Motion
// animations are already GPU-heavy. Re-enable when optimising the overall bundle.
export default function SmoothScroll({ children }) {
    return <>{children}</>;
}
