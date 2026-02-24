import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ─────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene & Camera ────────────────────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 18);

    // ── Particle Geometry ─────────────────────────────────────────────────────
    const COUNT = 280;
    const RANGE = 24;

    const positions  = new Float32Array(COUNT * 3);
    const colors     = new Float32Array(COUNT * 3);
    const sizes      = new Float32Array(COUNT);
    const phases     = new Float32Array(COUNT);
    const velocities = [];

    // Brand palette — indigo heavy, pink accent, violet, rare white
    const palette = [
      new THREE.Color('#818cf8'), // indigo  ×3
      new THREE.Color('#818cf8'),
      new THREE.Color('#818cf8'),
      new THREE.Color('#fb7185'), // pink    ×2
      new THREE.Color('#fb7185'),
      new THREE.Color('#a78bfa'), // violet  ×1
      new THREE.Color('#c4b5fd'), // light violet
      new THREE.Color('#ffffff'), // white   ×1
    ];

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * RANGE;
      positions[i * 3 + 1] = (Math.random() - 0.5) * RANGE;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 9;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i]  = 0.5 + Math.random() * 3.0;
      phases[i] = Math.random() * Math.PI * 2;

      velocities.push({
        x: (Math.random() - 0.5) * 0.005,
        y: (Math.random() - 0.5) * 0.004,
        z: (Math.random() - 0.5) * 0.002,
      });
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aColor',   new THREE.BufferAttribute(colors.slice(), 3)); // clone for lines
    geo.setAttribute('aSize',    new THREE.BufferAttribute(sizes,    1));
    geo.setAttribute('aPhase',   new THREE.BufferAttribute(phases,   1));

    // ── Particle Shaders ──────────────────────────────────────────────────────
    const particleVert = /* glsl */`
      attribute float aSize;
      attribute vec3  aColor;
      attribute float aPhase;
      uniform   float uTime;
      varying   vec3  vColor;

      void main() {
        vColor = aColor;

        vec3 pos = position;
        pos.y += sin(uTime * 0.28 + aPhase)         * 0.22;
        pos.x += cos(uTime * 0.19 + aPhase * 1.63)  * 0.18;

        vec4 mv      = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = aSize * (260.0 / -mv.z);
        gl_PointSize = clamp(gl_PointSize, 0.5, 30.0);
        gl_Position  = projectionMatrix * mv;
      }
    `;

    const particleFrag = /* glsl */`
      varying vec3 vColor;

      void main() {
        vec2  uv    = gl_PointCoord - 0.5;
        float r     = length(uv) * 2.0;
        if (r > 1.0) discard;

        float alpha = pow(1.0 - smoothstep(0.0, 1.0, r), 1.6);
        float core  = 1.0 - smoothstep(0.0, 0.28, r);
        vec3  col   = mix(vColor, vec3(1.0), core * 0.6);

        gl_FragColor = vec4(col, alpha * 0.92);
      }
    `;

    const particleMat = new THREE.ShaderMaterial({
      uniforms:       { uTime: { value: 0 } },
      vertexShader:   particleVert,
      fragmentShader: particleFrag,
      transparent:    true,
      blending:       THREE.AdditiveBlending,
      depthWrite:     false,
    });

    const points = new THREE.Points(geo, particleMat);
    scene.add(points);

    // ── Connection Lines ──────────────────────────────────────────────────────
    const MAX_SEGS  = COUNT * 3;
    const lPos      = new Float32Array(MAX_SEGS * 2 * 3);
    const lCol      = new Float32Array(MAX_SEGS * 2 * 3);
    const lineGeo   = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(lPos, 3));
    lineGeo.setAttribute('color',    new THREE.BufferAttribute(lCol, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent:  true,
      opacity:      0.45,
      blending:     THREE.AdditiveBlending,
      depthWrite:   false,
    });

    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // ── Pulse Rings ───────────────────────────────────────────────────────────
    // Occasional pulse rings that expand from random particles
    const ringGeo = new THREE.RingGeometry(0.1, 0.15, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color:       0x818cf8,
      transparent: true,
      opacity:     0,
      side:        THREE.DoubleSide,
      blending:    THREE.AdditiveBlending,
      depthWrite:  false,
    });
    const rings = [];
    for (let i = 0; i < 4; i++) {
      const r = new THREE.Mesh(ringGeo, ringMat.clone());
      r.userData = { life: Math.random(), particleIdx: Math.floor(Math.random() * COUNT) };
      scene.add(r);
      rings.push(r);
    }

    // ── Mouse & Scroll ────────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let scrollY = 0;

    const onMouseMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth)  * 2 - 1;
      mouse.ty = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onScroll    = () => { scrollY = window.scrollY; };
    const onResize    = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll',    onScroll, { passive: true });
    window.addEventListener('resize',    onResize);

    // ── Animation ─────────────────────────────────────────────────────────────
    const CONNECT_DIST = 4.5;
    let animId;

    function animate(ts) {
      animId = requestAnimationFrame(animate);
      const t = ts * 0.001;

      particleMat.uniforms.uTime.value = t;

      // Smooth mouse
      mouse.x += (mouse.tx - mouse.x) * 0.055;
      mouse.y += (mouse.ty - mouse.y) * 0.055;

      // Camera: parallax + scroll drift
      const maxScroll   = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const scrollFrac  = scrollY / maxScroll;
      camera.position.x += (mouse.x * 2.0 - camera.position.x) * 0.028;
      camera.position.y += (mouse.y * 1.0 - camera.position.y) * 0.028;
      camera.position.z  = 18 - scrollFrac * 5;
      camera.lookAt(0, -scrollFrac * 2.5, 0);

      // Move particles
      const posArr = geo.attributes.position.array;
      for (let i = 0; i < COUNT; i++) {
        posArr[i * 3]     += velocities[i].x;
        posArr[i * 3 + 1] += velocities[i].y;
        posArr[i * 3 + 2] += velocities[i].z;

        // Soft bounce at boundary
        if (Math.abs(posArr[i * 3])     > RANGE / 2 + 1) velocities[i].x *= -0.97;
        if (Math.abs(posArr[i * 3 + 1]) > RANGE / 2 + 1) velocities[i].y *= -0.97;
        if (Math.abs(posArr[i * 3 + 2]) > 4.5)           velocities[i].z *= -0.97;

        // Mouse repulsion
        const mx = mouse.x * 12;
        const my = mouse.y * 6;
        const dx = posArr[i * 3]     - mx;
        const dy = posArr[i * 3 + 1] - my;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 4.0 && d > 0.01) {
          const f = ((4.0 - d) / 4.0) * 0.12;
          posArr[i * 3]     += (dx / d) * f;
          posArr[i * 3 + 1] += (dy / d) * f;
        }
      }
      geo.attributes.position.needsUpdate = true;

      // Rebuild connection segments
      let seg = 0;
      for (let i = 0; i < COUNT && seg < MAX_SEGS; i++) {
        let conn = 0;
        for (let j = i + 1; j < COUNT && conn < 3 && seg < MAX_SEGS; j++) {
          const dx = posArr[i * 3]     - posArr[j * 3];
          const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
          const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
          const d  = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (d < CONNECT_DIST) {
            const a   = (1 - d / CONNECT_DIST) * 0.7;
            const b6  = seg * 6;
            const ci  = i * 3;
            const cj  = j * 3;

            lPos[b6]     = posArr[ci];     lPos[b6 + 1] = posArr[ci + 1]; lPos[b6 + 2] = posArr[ci + 2];
            lPos[b6 + 3] = posArr[cj];     lPos[b6 + 4] = posArr[cj + 1]; lPos[b6 + 5] = posArr[cj + 2];

            lCol[b6]     = colors[ci]     * a; lCol[b6 + 1] = colors[ci + 1] * a; lCol[b6 + 2] = colors[ci + 2] * a;
            lCol[b6 + 3] = colors[cj]     * a; lCol[b6 + 4] = colors[cj + 1] * a; lCol[b6 + 5] = colors[cj + 2] * a;

            seg++;
            conn++;
          }
        }
      }

      // Zero unused line verts
      for (let i = seg; i < MAX_SEGS; i++) {
        const b6 = i * 6;
        lPos[b6] = lPos[b6+1] = lPos[b6+2] = lPos[b6+3] = lPos[b6+4] = lPos[b6+5] = 0;
      }
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate    = true;
      lineGeo.setDrawRange(0, seg * 2);

      // Animate pulse rings
      for (const ring of rings) {
        ring.userData.life += 0.004;
        if (ring.userData.life > 1) {
          ring.userData.life        = 0;
          ring.userData.particleIdx = Math.floor(Math.random() * COUNT);
        }
        const life = ring.userData.life;
        const pi   = ring.userData.particleIdx;
        ring.position.set(posArr[pi * 3], posArr[pi * 3 + 1], posArr[pi * 3 + 2]);
        const scale = 1 + life * 8;
        ring.scale.setScalar(scale);
        ring.material.opacity = (1 - life) * 0.25;
        // face camera
        ring.lookAt(camera.position);
      }

      renderer.render(scene, camera);
    }

    animate(0);

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll',    onScroll);
      window.removeEventListener('resize',    onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
      geo.dispose();
      lineGeo.dispose();
      ringGeo.dispose();
      particleMat.dispose();
      lineMat.dispose();
      rings.forEach(r => r.material.dispose());
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
