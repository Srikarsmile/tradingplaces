import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

/* ═══════════════════════════════════════════════════════════════
   IMMERSIVE HERO — 3D VR-Grade Background
   Volumetric particle nebula · floating crystals · bloom · parallax
   ═══════════════════════════════════════════════════════════════ */

// ── Color palette (matches design tokens) ──
const COLORS = {
    amber: new THREE.Color(0xf59e0b),
    violet: new THREE.Color(0x8b5cf6),
    cyan: new THREE.Color(0x06b6d4),
    deepViolet: new THREE.Color(0x7c3aed),
    white: new THREE.Color(0xeef0f6),
    bg: new THREE.Color(0x08090e),
};

const PALETTE = [COLORS.amber, COLORS.violet, COLORS.cyan, COLORS.deepViolet, COLORS.white];

// ── Noise helper for organic movement ──
function fbm(x, y, z, t) {
    let val = 0;
    val += Math.sin(x * 1.2 + t * 0.4) * Math.cos(y * 0.9 + t * 0.3) * 0.5;
    val += Math.sin(z * 1.5 + t * 0.2) * Math.cos(x * 0.7 - t * 0.5) * 0.3;
    val += Math.sin((x + y) * 0.8 + t * 0.6) * 0.2;
    return val;
}

const ImmersiveHero = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        let width = mountRef.current.clientWidth;
        let height = mountRef.current.clientHeight;

        // ══════════════════════════
        // SCENE SETUP
        // ══════════════════════════
        const scene = new THREE.Scene();
        scene.background = COLORS.bg.clone();
        scene.fog = new THREE.FogExp2(0x08090e, 0.035);

        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 200);
        camera.position.set(0, 0, 30);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        mountRef.current.appendChild(renderer.domElement);

        // ══════════════════════════
        // POST-PROCESSING (BLOOM)
        // ══════════════════════════
        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(width, height),
            1.5,  // strength
            0.6,  // radius
            0.2   // threshold — low so everything glows
        );
        composer.addPass(bloomPass);

        // ══════════════════════════
        // LIGHTING
        // ══════════════════════════
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
        scene.add(ambientLight);

        // Colored directional lights for dramatic atmosphere
        const light1 = new THREE.PointLight(0xf59e0b, 2, 60);
        light1.position.set(15, 10, 20);
        scene.add(light1);

        const light2 = new THREE.PointLight(0x8b5cf6, 2, 60);
        light2.position.set(-15, -5, 15);
        scene.add(light2);

        const light3 = new THREE.PointLight(0x06b6d4, 1.5, 50);
        light3.position.set(0, 15, -10);
        scene.add(light3);

        // ══════════════════════════
        // PARTICLE NEBULA (Instanced)
        // ══════════════════════════
        const particleCount = window.innerWidth < 768 ? 600 : 1200;
        const particleGeo = new THREE.SphereGeometry(0.06, 6, 6);
        const particleMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 });
        const particleMesh = new THREE.InstancedMesh(particleGeo, particleMat, particleCount);

        // Store initial positions and velocities
        const particleData = [];
        const dummy = new THREE.Object3D();
        const colorAttr = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            // Distribute in a large spherical cloud
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 5 + Math.random() * 25; // radius 5-30

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi) - 5; // offset forward

            // Vary the size
            const scale = 0.3 + Math.random() * 1.5;

            dummy.position.set(x, y, z);
            dummy.scale.set(scale, scale, scale);
            dummy.updateMatrix();
            particleMesh.setMatrixAt(i, dummy.matrix);

            // Random color from palette
            const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
            colorAttr[i * 3] = color.r;
            colorAttr[i * 3 + 1] = color.g;
            colorAttr[i * 3 + 2] = color.b;

            particleData.push({
                baseX: x, baseY: y, baseZ: z,
                scale,
                speed: 0.2 + Math.random() * 0.8,
                phase: Math.random() * Math.PI * 2,
                orbitRadius: 0.3 + Math.random() * 0.8,
            });
        }

        // Apply per-instance colors
        particleMesh.instanceColor = new THREE.InstancedBufferAttribute(colorAttr, 3);
        scene.add(particleMesh);

        // ══════════════════════════
        // FLOATING CRYSTALS (Wireframe Geometries)
        // ══════════════════════════
        const crystals = [];
        const crystalConfigs = [
            { geo: new THREE.IcosahedronGeometry(1.8, 0), color: COLORS.amber, pos: [8, 4, 5], rotSpeed: [0.002, 0.003, 0.001] },
            { geo: new THREE.OctahedronGeometry(1.5, 0), color: COLORS.violet, pos: [-10, -3, 0], rotSpeed: [0.003, 0.001, 0.002] },
            { geo: new THREE.TetrahedronGeometry(1.2, 0), color: COLORS.cyan, pos: [5, -6, -5], rotSpeed: [0.001, 0.004, 0.002] },
            { geo: new THREE.IcosahedronGeometry(2.2, 1), color: COLORS.deepViolet, pos: [-6, 7, -8], rotSpeed: [0.002, 0.002, 0.003] },
            { geo: new THREE.DodecahedronGeometry(1.0, 0), color: COLORS.amber, pos: [12, -2, -3], rotSpeed: [0.003, 0.002, 0.001] },
            { geo: new THREE.OctahedronGeometry(0.8, 0), color: COLORS.cyan, pos: [-4, 5, 10], rotSpeed: [0.002, 0.003, 0.004] },
        ];

        crystalConfigs.forEach((cfg) => {
            // Wireframe edges
            const edgesGeo = new THREE.EdgesGeometry(cfg.geo);
            const edgesMat = new THREE.LineBasicMaterial({
                color: cfg.color,
                transparent: true,
                opacity: 0.7,
                linewidth: 1,
            });
            const wireframe = new THREE.LineSegments(edgesGeo, edgesMat);

            // Inner solid with very low opacity for glow volume
            const solidMat = new THREE.MeshBasicMaterial({
                color: cfg.color,
                transparent: true,
                opacity: 0.06,
                side: THREE.DoubleSide,
            });
            const solid = new THREE.Mesh(cfg.geo, solidMat);

            const group = new THREE.Group();
            group.add(wireframe);
            group.add(solid);
            group.position.set(...cfg.pos);
            scene.add(group);

            crystals.push({
                group,
                rotSpeed: cfg.rotSpeed,
                basePos: [...cfg.pos],
                floatPhase: Math.random() * Math.PI * 2,
                floatSpeed: 0.3 + Math.random() * 0.5,
                floatAmplitude: 0.5 + Math.random() * 1.0,
            });
        });

        // ══════════════════════════
        // CONNECTION LINES (dynamic)
        // ══════════════════════════
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.08,
        });

        // We'll create a fixed number of lines and update them
        const maxLines = 80;
        const linePositions = new Float32Array(maxLines * 6); // 2 vertices × 3 coords per line
        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        const lineSegments = new THREE.LineSegments(lineGeo, lineMaterial);
        scene.add(lineSegments);

        // ══════════════════════════
        // CENTRAL ENERGY CORE (subtle pulsing sphere)
        // ══════════════════════════
        const coreGeo = new THREE.SphereGeometry(1.5, 32, 32);
        const coreMat = new THREE.MeshBasicMaterial({
            color: COLORS.amber,
            transparent: true,
            opacity: 0.04,
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        scene.add(core);

        // Outer ring
        const ringGeo = new THREE.TorusGeometry(3, 0.02, 8, 100);
        const ringMat = new THREE.MeshBasicMaterial({
            color: COLORS.violet,
            transparent: true,
            opacity: 0.3,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        scene.add(ring);

        const ring2Geo = new THREE.TorusGeometry(4.5, 0.015, 8, 120);
        const ring2 = new THREE.Mesh(ring2Geo, ringMat.clone());
        ring2.material.opacity = 0.15;
        ring2.rotation.x = Math.PI * 0.4;
        ring2.rotation.z = Math.PI * 0.3;
        scene.add(ring2);

        // ══════════════════════════
        // MOUSE & INTERACTION
        // ══════════════════════════
        let mouseX = 0;
        let mouseY = 0;
        let smoothMouseX = 0;
        let smoothMouseY = 0;

        const onMouseMove = (e) => {
            mouseX = (e.clientX / width - 0.5) * 2;  // -1 to 1
            mouseY = (e.clientY / height - 0.5) * 2;
        };
        document.addEventListener('mousemove', onMouseMove);

        // ══════════════════════════
        // RESIZE
        // ══════════════════════════
        const onResize = () => {
            if (!mountRef.current) return;
            width = mountRef.current.clientWidth;
            height = mountRef.current.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
            composer.setSize(width, height);
        };
        window.addEventListener('resize', onResize);

        // ══════════════════════════
        // ANIMATION LOOP
        // ══════════════════════════
        const clock = new THREE.Clock();
        let frameId;

        const animate = () => {
            const t = clock.getElapsedTime();

            // ── Smooth mouse follow ──
            smoothMouseX += (mouseX - smoothMouseX) * 0.02;
            smoothMouseY += (mouseY - smoothMouseY) * 0.02;

            // ── Camera parallax ──
            camera.position.x = smoothMouseX * 3;
            camera.position.y = -smoothMouseY * 2;
            camera.lookAt(0, 0, 0);

            // ── Animate particles ──
            for (let i = 0; i < particleCount; i++) {
                const d = particleData[i];
                const noise = fbm(d.baseX * 0.1, d.baseY * 0.1, d.baseZ * 0.1, t * d.speed);

                dummy.position.set(
                    d.baseX + Math.sin(t * d.speed + d.phase) * d.orbitRadius + noise * 0.5,
                    d.baseY + Math.cos(t * d.speed * 0.7 + d.phase) * d.orbitRadius + noise * 0.3,
                    d.baseZ + Math.sin(t * d.speed * 0.5 + d.phase * 2) * d.orbitRadius * 0.5
                );

                // Pulsing scale
                const pulse = 1 + Math.sin(t * 2 + d.phase) * 0.3;
                const s = d.scale * pulse;
                dummy.scale.set(s, s, s);
                dummy.updateMatrix();
                particleMesh.setMatrixAt(i, dummy.matrix);
            }
            particleMesh.instanceMatrix.needsUpdate = true;

            // ── Animate crystals ──
            crystals.forEach((c) => {
                c.group.rotation.x += c.rotSpeed[0];
                c.group.rotation.y += c.rotSpeed[1];
                c.group.rotation.z += c.rotSpeed[2];

                // Floating bob
                c.group.position.y = c.basePos[1] + Math.sin(t * c.floatSpeed + c.floatPhase) * c.floatAmplitude;
                c.group.position.x = c.basePos[0] + Math.cos(t * c.floatSpeed * 0.5 + c.floatPhase) * c.floatAmplitude * 0.3;
            });

            // ── Animate connection lines ──
            // Connect some nearby crystals & random particles
            let lineIdx = 0;
            for (let i = 0; i < crystals.length && lineIdx < maxLines; i++) {
                for (let j = i + 1; j < crystals.length && lineIdx < maxLines; j++) {
                    const p1 = crystals[i].group.position;
                    const p2 = crystals[j].group.position;
                    const dist = p1.distanceTo(p2);
                    if (dist < 20) {
                        linePositions[lineIdx * 6] = p1.x;
                        linePositions[lineIdx * 6 + 1] = p1.y;
                        linePositions[lineIdx * 6 + 2] = p1.z;
                        linePositions[lineIdx * 6 + 3] = p2.x;
                        linePositions[lineIdx * 6 + 4] = p2.y;
                        linePositions[lineIdx * 6 + 5] = p2.z;
                        lineIdx++;
                    }
                }
            }
            // Fill remaining with zero to hide
            for (let i = lineIdx; i < maxLines; i++) {
                linePositions[i * 6] = 0;
                linePositions[i * 6 + 1] = 0;
                linePositions[i * 6 + 2] = 0;
                linePositions[i * 6 + 3] = 0;
                linePositions[i * 6 + 4] = 0;
                linePositions[i * 6 + 5] = 0;
            }
            lineGeo.attributes.position.needsUpdate = true;

            // ── Animate core & rings ──
            const coreScale = 1 + Math.sin(t * 1.5) * 0.15;
            core.scale.set(coreScale, coreScale, coreScale);
            coreMat.opacity = 0.03 + Math.sin(t * 2) * 0.02;

            ring.rotation.z = t * 0.15;
            ring2.rotation.y = t * 0.1;
            ring2.rotation.x = Math.PI * 0.4 + Math.sin(t * 0.3) * 0.1;

            // ── Animate point lights for shifting atmosphere ──
            light1.position.x = 15 + Math.sin(t * 0.3) * 5;
            light1.position.y = 10 + Math.cos(t * 0.4) * 3;
            light2.position.x = -15 + Math.cos(t * 0.25) * 4;
            light2.position.z = 15 + Math.sin(t * 0.2) * 5;
            light3.position.y = 15 + Math.sin(t * 0.35) * 4;

            // ── Render with bloom ──
            composer.render();

            frameId = requestAnimationFrame(animate);
        };

        animate();

        // ══════════════════════════
        // CLEANUP
        // ══════════════════════════
        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', onResize);
            document.removeEventListener('mousemove', onMouseMove);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            // Dispose geometries & materials
            particleGeo.dispose();
            particleMat.dispose();
            particleMesh.dispose();
            crystalConfigs.forEach((c) => c.geo.dispose());
            coreGeo.dispose();
            coreMat.dispose();
            ringGeo.dispose();
            ringMat.dispose();
            ring2Geo.dispose();
            lineGeo.dispose();
            lineMaterial.dispose();
            renderer.dispose();
            composer.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
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
    );
};

export default ImmersiveHero;
