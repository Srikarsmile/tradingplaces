import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeCanvas = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        let width = mountRef.current.clientWidth;
        let height = mountRef.current.clientHeight;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#08090e'); // Midnight navy

        // Camera setup - slightly offset so orb is on the right
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(0, 0, 8);

        const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Cap pixel ratio for perf
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;
        mountRef.current.appendChild(renderer.domElement);

        // ==========================================
        // LIGHTING: Studio lighting for a classy look
        // ==========================================
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.0);
        dirLight1.position.set(5, 5, 5);
        scene.add(dirLight1);

        const dirLight2 = new THREE.DirectionalLight(0xf59e0b, 1.5); // Warm Amber
        dirLight2.position.set(-5, 5, -5);
        scene.add(dirLight2);

        const dirLight3 = new THREE.DirectionalLight(0x8b5cf6, 1.0); // Electric Violet
        dirLight3.position.set(0, -5, 5);
        scene.add(dirLight3);

        // ==========================================
        // ORB: Liquid Pearlescent Material
        // ==========================================
        // High-poly sphere for smooth displacement
        const geometry = new THREE.IcosahedronGeometry(2.5, 24); // Reduced from 64 for performance

        // Smooth, reflective physical material
        const material = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0.1,
            roughness: 0.1,
            transmission: 0.9,     // Glass-like transmission
            ior: 1.5,
            thickness: 1.0,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            side: THREE.BackSide, // Render backside for a thick bubble look
        });

        // Custom shader injection to create the "Liquid Breathing" effect
        material.onBeforeCompile = (shader) => {
            shader.uniforms.time = { value: 0 };

            shader.vertexShader = `
        uniform float time;
        // Simplex noise function
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }
        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i  = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = mod289(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0);
          p = mod289(p + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
        }
      ` + shader.vertexShader;

            shader.vertexShader = shader.vertexShader.replace(
                '#include <begin_vertex>',
                `
        vec3 transformed = vec3(position);
        float noiseFreq = 0.8;
        float noiseAmp = 0.3;
        vec3 noisePos = vec3(position.x * noiseFreq + time * 0.2, position.y * noiseFreq + time * 0.3, position.z * noiseFreq);
        transformed += normal * snoise(noisePos) * noiseAmp;
        `
            );

            material.userData.shader = shader;
        };

        const orb = new THREE.Mesh(geometry, material);

        // Position orb to the right to balance the hero text on the left
        if (window.innerWidth >= 1024) { // lg breakpoint
            orb.position.x = 3.5;
        }

        scene.add(orb);

        // Group for adding rotation independent of the shader displacement
        const group = new THREE.Group();
        group.add(orb);
        scene.add(group);

        // ==========================================
        // INTERACTION & ANIMATION
        // ==========================================
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        const onDocumentMouseMove = (event) => {
            mouseX = (event.clientX - windowHalfX) * 0.001;
            mouseY = (event.clientY - windowHalfY) * 0.001;
        };

        document.addEventListener('mousemove', onDocumentMouseMove, false);

        const onWindowResize = () => {
            width = mountRef.current.clientWidth;
            height = mountRef.current.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);

            if (window.innerWidth >= 1024) {
                orb.position.x = 3.5;
            } else {
                orb.position.x = 0; // Centered on mobile
            }
        };

        window.addEventListener('resize', onWindowResize, false);

        const clock = new THREE.Clock();

        let animationFrameId;
        const animate = () => {
            const time = clock.getElapsedTime();

            // Update shader uniform
            if (material.userData.shader) {
                material.userData.shader.uniforms.time.value = time;
            }

            // Smooth mouse follow
            targetX = mouseX * 2;
            targetY = mouseY * 2;

            group.rotation.y += 0.05 * (targetX - group.rotation.y);
            group.rotation.x += 0.05 * (targetY - group.rotation.x);

            // Slow constant rotation
            orb.rotation.y += 0.002;
            orb.rotation.z += 0.001;

            // Slight pulsing scale based on sine wave
            const scale = 1.0 + Math.sin(time * 1.5) * 0.02;
            orb.scale.set(scale, scale, scale);

            // Floating Y position effect (Hatom style)
            orb.position.y = Math.sin(time * 2.0) * 0.15;

            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', onWindowResize);
            document.removeEventListener('mousemove', onDocumentMouseMove);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
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
                zIndex: 0, // Behind UI
                pointerEvents: 'none' // Allow clicks to pass through to DOM
            }}
        />
    );
};

export default ThreeCanvas;
