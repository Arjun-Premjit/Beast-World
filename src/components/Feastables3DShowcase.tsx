import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowUpRight, Flame, ShieldCheck, Heart, Award, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Feastables3DShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const storyPanel1Ref = useRef<HTMLDivElement>(null);
  const storyPanel2Ref = useRef<HTMLDivElement>(null);
  const storyPanel3Ref = useRef<HTMLDivElement>(null);

  const [activeFlavor, setActiveFlavor] = useState<'MILK' | 'PEANUT_BUTTER' | 'CRUNCH' | 'DARK'>('MILK');

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090d, 0.05);

    const camera = new THREE.PerspectiveCamera(
      38,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0x202b3d, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.8);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    const rimBlue = new THREE.DirectionalLight(0x1769e0, 5.0);
    rimBlue.position.set(-6, -3, -4);
    scene.add(rimBlue);

    const goldSpec = new THREE.PointLight(0xffd000, 2.5, 10);
    goldSpec.position.set(2, 4, 3);
    scene.add(goldSpec);

    // --- 3D FEASTABLES BAR OBJECT MODEL ---
    const barRootGroup = new THREE.Group();
    scene.add(barRootGroup);

    // 1. Rich Chocolate Slab (Internal Core)
    const chocMat = new THREE.MeshStandardMaterial({
      color: 0x2b1509, // Dark rich cocoa
      roughness: 0.35,
      metalness: 0.08,
    });
    const barCoreGeo = new THREE.BoxGeometry(2.4, 4.6, 0.42);
    const chocCoreMesh = new THREE.Mesh(barCoreGeo, chocMat);
    barRootGroup.add(chocCoreMesh);

    // 2. Segmented breakable chocolate squares on the reverse / exposed top
    const blockMat = new THREE.MeshStandardMaterial({
      color: 0x241107,
      roughness: 0.28,
      metalness: 0.05,
    });
    const blockGeo = new THREE.BoxGeometry(0.62, 0.8, 0.1);
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 3; col++) {
        const block = new THREE.Mesh(blockGeo, blockMat);
        block.position.set(
          (col - 1) * 0.7,
          (row - 1.5) * 0.95,
          -0.22 // Back face chocolate segments
        );
        barRootGroup.add(block);
      }
    }

    // 3. Feastables Wrapper Sleeve (Beast Blue Foil Packaging)
    // Canvas texture for realistic Feastables branding on the front foil
    const textureCanvas = document.createElement('canvas');
    textureCanvas.width = 512;
    textureCanvas.height = 1024;
    const ctx = textureCanvas.getContext('2d');
    if (ctx) {
      // Foil gradient background
      const grad = ctx.createLinearGradient(0, 0, 512, 1024);
      grad.addColorStop(0, '#0f4ab8');
      grad.addColorStop(0.3, '#1769e0');
      grad.addColorStop(0.7, '#28b8e8');
      grad.addColorStop(1, '#0c2e68');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 1024);

      // Gold foil edge stripes
      ctx.fillStyle = '#ffd000';
      ctx.fillRect(0, 30, 512, 14);
      ctx.fillRect(0, 980, 512, 14);

      // Typography
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 54px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('FEASTABLES', 256, 220);

      ctx.fillStyle = '#ffd000';
      ctx.font = 'bold 36px sans-serif';
      ctx.fillText('MRBEAST', 256, 290);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 42px sans-serif';
      ctx.fillText('MILK CHOCOLATE', 256, 420);

      // Simple ingredients badge
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.beginPath();
      ctx.roundRect(56, 520, 400, 180, 24);
      ctx.fill();

      ctx.fillStyle = '#28b8e8';
      ctx.font = 'bold 26px monospace';
      ctx.fillText('GRASS-FED MILK', 256, 580);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 26px monospace';
      ctx.fillText('100% ORGANIC COCOA', 256, 625);
      ctx.fillStyle = '#ffd000';
      ctx.font = 'bold 24px monospace';
      ctx.fillText('ONLY 5 INGREDIENTS', 256, 670);

      // Bottom seal
      ctx.fillStyle = '#ffffff';
      ctx.font = '18px monospace';
      ctx.fillText('NET WT 2.1 OZ (60g)', 256, 880);
    }

    const wrapperTexture = new THREE.CanvasTexture(textureCanvas);
    const wrapperMat = new THREE.MeshStandardMaterial({
      map: wrapperTexture,
      roughness: 0.18,
      metalness: 0.65,
    });

    const wrapperGeo = new THREE.BoxGeometry(2.46, 4.3, 0.46);
    const wrapperMesh = new THREE.Mesh(wrapperGeo, wrapperMat);
    wrapperMesh.position.y = -0.15; // Leaves chocolate tip peeking out top
    barRootGroup.add(wrapperMesh);

    // 4. Floating ambient cocoa bean / chocolate chips
    const chipGeo = new THREE.DodecahedronGeometry(0.18);
    const chipMat = new THREE.MeshStandardMaterial({
      color: 0x3d1d0c,
      roughness: 0.4,
    });
    const chips: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const chip = new THREE.Mesh(chipGeo, chipMat);
      const angle = (i / 8) * Math.PI * 2;
      const radius = 2.4 + (i % 2) * 0.6;
      chip.position.set(
        Math.cos(angle) * radius,
        (i - 4) * 0.8,
        Math.sin(angle) * 1.5
      );
      barRootGroup.add(chip);
      chips.push(chip);
    }

    // Shadow below bar
    const shadowGeo = new THREE.PlaneGeometry(5, 5);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.5,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -3.2;
    scene.add(shadowMesh);

    // Initial position
    barRootGroup.position.set(0, 0, 0);
    barRootGroup.rotation.set(0.2, -0.4, 0.05);

    // --- MOUSE PARALLAX ---
    const mouseTarget = { x: 0, y: 0 };
    const mouseCurrent = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseTarget.x = x * 0.4;
      mouseTarget.y = y * 0.25;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- CONTINUOUS SCROLL TRANSITION (SOFI BOTTLE-FOLLOWING STYLE) ---
    const animState = {
      progress: 0,
      posX: 0,
      posY: 0,
      posZ: 0,
      rotX: 0.2,
      rotY: -0.4,
      rotZ: 0.05,
      scale: 1,
    };

    let scrollTriggerInstance: ScrollTrigger | null = null;

    if (!prefersReduced) {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=260%',
        pin: true,
        scrub: 1.1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          animState.progress = p;

          // Phase 1 (0 -> 0.33): Moves toward the right as story intro enters left
          if (p < 0.33) {
            const t = p / 0.33;
            animState.posX = gsap.utils.interpolate(0, 2.0, t);
            animState.posY = gsap.utils.interpolate(0, 0.1, t);
            animState.rotX = gsap.utils.interpolate(0.2, 0.35, t);
            animState.rotY = gsap.utils.interpolate(-0.4, -0.75, t);
            animState.rotZ = gsap.utils.interpolate(0.05, -0.15, t);
            animState.scale = gsap.utils.interpolate(1, 1.05, t);
          }
          // Phase 2 (0.33 -> 0.66): Moves toward the left as ingredients enter right
          else if (p < 0.66) {
            const t = (p - 0.33) / 0.33;
            animState.posX = gsap.utils.interpolate(2.0, -2.0, t);
            animState.posY = gsap.utils.interpolate(0.1, -0.1, t);
            // Rotates to show the back side chocolate segments!
            animState.rotX = gsap.utils.interpolate(0.35, -0.2, t);
            animState.rotY = gsap.utils.interpolate(-0.75, Math.PI + 0.3, t);
            animState.rotZ = gsap.utils.interpolate(-0.15, 0.2, t);
            animState.scale = gsap.utils.interpolate(1.05, 0.95, t);
          }
          // Phase 3 (0.66 -> 1.0): Settles in hero center position for grand finale
          else {
            const t = (p - 0.66) / 0.34;
            animState.posX = gsap.utils.interpolate(-2.0, 0, t);
            animState.posY = gsap.utils.interpolate(-0.1, 0, t);
            animState.rotX = gsap.utils.interpolate(-0.2, 0.15, t);
            animState.rotY = gsap.utils.interpolate(Math.PI + 0.3, Math.PI * 2 - 0.2, t);
            animState.rotZ = gsap.utils.interpolate(0.2, 0, t);
            animState.scale = gsap.utils.interpolate(0.95, 1.25, t);
          }
        },
      });

      // Synchronized text reveals
      if (storyPanel1Ref.current && storyPanel2Ref.current && storyPanel3Ref.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=260%',
            scrub: true,
          },
        })
          .to(storyPanel1Ref.current, { opacity: 1, x: 0, duration: 0.2 })
          .to(storyPanel1Ref.current, { opacity: 0, x: -50, duration: 0.1 }, 0.32)
          .to(storyPanel2Ref.current, { opacity: 1, x: 0, duration: 0.2 }, 0.35)
          .to(storyPanel2Ref.current, { opacity: 0, x: 50, duration: 0.1 }, 0.65)
          .to(storyPanel3Ref.current, { opacity: 1, y: 0, duration: 0.25 }, 0.68)
          .to(storyPanel3Ref.current, { opacity: 0.85, y: 0, duration: 0.1 }, 0.95);
      }
    }

    // --- RENDER LOOP ---
    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.05;
      mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.05;

      const idleFloat = Math.sin(elapsedTime * 1.8) * 0.1;

      barRootGroup.position.x = animState.posX + mouseCurrent.x;
      barRootGroup.position.y = animState.posY + idleFloat + mouseCurrent.y;
      barRootGroup.position.z = animState.posZ;

      barRootGroup.rotation.x = animState.rotX;
      barRootGroup.rotation.y = animState.rotY;
      barRootGroup.rotation.z = animState.rotZ;

      barRootGroup.scale.setScalar(animState.scale);

      // Rotate ambient chocolate chips
      for (let i = 0; i < chips.length; i++) {
        chips[i].rotation.x += 0.01;
        chips[i].rotation.y += 0.015;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!canvas || !container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
      renderer.dispose();
      barCoreGeo.dispose();
      chocMat.dispose();
      blockGeo.dispose();
      blockMat.dispose();
      wrapperGeo.dispose();
      wrapperMat.dispose();
      chipGeo.dispose();
      chipMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-[#08090D] overflow-hidden flex items-center justify-center select-none border-b border-white/[0.08]"
    >
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing z-10"
      />

      {/* Lighting Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#1769E0]/15 rounded-full blur-[170px] pointer-events-none" />

      {/* Top HUD bar */}
      <div className="absolute top-8 left-6 right-6 sm:left-12 sm:right-12 flex items-center justify-between text-xs font-mono text-neutral-400 z-20 pointer-events-none">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#FFD000]" />
          <span className="text-white font-semibold">SOFI-STYLE PRODUCT SCROLL // FEASTABLES 3D</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-neutral-500">EXPERIENCE:</span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-[#FFD000] font-bold">
            CONTINUOUS 3D TRANSITION
          </span>
        </div>
      </div>

      {/* Spatial Story Panels */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 px-6 sm:px-12">
        {/* Panel 1: Left Aligned Intro */}
        <div
          ref={storyPanel1Ref}
          className="absolute left-6 sm:left-16 lg:left-24 max-w-lg space-y-5 opacity-0 transform -translate-x-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/15 text-xs font-mono text-[#28B8E8]">
            <Flame className="w-3.5 h-3.5 text-[#1769E0]" />
            <span>MRBEAST CREATOR PRODUCT // STAGE 01</span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white uppercase font-display leading-[0.95]">
            ENGINEERED <br />
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-[#FFD000]">
              FOR OBSESSION.
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed">
            Jimmy didn't just build video sets; he set out to reinvent consumer chocolate from scratch. Eliminating toxic hydrogenated oils and artificial flavors to create confectionery worthy of the Beast standard.
          </p>
          <div className="flex items-center gap-6 pt-2 font-mono text-xs text-neutral-400">
            <div>
              <span className="text-2xl font-bold text-white block">5</span>
              <span>SIMPLE INGREDIENTS</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <span className="text-2xl font-bold text-[#FFD000] block">0%</span>
              <span>ARTIFICIAL FLAVORS</span>
            </div>
          </div>
        </div>

        {/* Panel 2: Right Aligned Sourcing Story */}
        <div
          ref={storyPanel2Ref}
          className="absolute right-6 sm:right-16 lg:right-24 max-w-lg text-right space-y-5 opacity-0 transform translate-x-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/15 text-xs font-mono text-[#FFD000]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>INGREDIENT HONESTY // STAGE 02</span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white uppercase font-display leading-[0.95]">
            BETTER TASTE. <br />
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-[#28B8E8]">
              REAL SOURCING.
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed ml-auto">
            100% Organic cocoa harvested sustainably, creamy grass-fed milk, and pure cane sugar. Blind taste tests against America's legacy brands saw 70%+ of consumers choosing Feastables every time.
          </p>
          <div className="flex items-center justify-end gap-6 pt-2 font-mono text-xs text-neutral-400">
            <div>
              <span className="text-2xl font-bold text-[#28B8E8] block">100%</span>
              <span>ORGANIC COCOA</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <span className="text-2xl font-bold text-white block">GRASS-FED</span>
              <span>PASTURE MILK</span>
            </div>
          </div>
        </div>

        {/* Panel 3: Center Finale Showcase */}
        <div
          ref={storyPanel3Ref}
          className="text-center max-w-2xl space-y-6 opacity-0 transform translate-y-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/20 text-xs font-mono text-[#28B8E8]">
            <Award className="w-3.5 h-3.5 text-[#FFD000]" />
            <span>GLOBAL PHENOMENON // OVER 100M BARS SOLD</span>
          </div>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-white uppercase font-display leading-[0.92]">
            FEASTABLES <br />
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-[#1769E0]">
              CHOCOLATE.
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-normal max-w-md mx-auto">
            Experience the chocolate revolution that shook supermarket aisles nationwide. Pick up a bar at Walmart, Target, or your local grocer today.
          </p>
          <div className="pt-2 flex items-center justify-center gap-4 pointer-events-auto">
            <a
              href="https://feastables.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-black bg-[#FFD000] hover:bg-white transition-all shadow-[0_0_30px_rgba(255,208,0,0.4)]"
            >
              <span>SHOP OFFICIAL FEASTABLES</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar Callout */}
      <div className="absolute bottom-8 left-6 right-6 sm:left-12 sm:right-12 flex items-center justify-between text-xs font-mono text-neutral-500 z-20 pointer-events-none border-t border-white/10 pt-4">
        <div className="flex items-center gap-2 text-neutral-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD000]" />
          <span>PERSISTENT SPATIAL CONTINUITY · SCROLL-CONTROLLED 3D PRODUCT OBJECT</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-neutral-400">
          <span>PACKAGING SHADER // GLSL</span>
          <span>·</span>
          <span>PHYSICALLY BASED RENDERING</span>
        </div>
      </div>
    </div>
  );
};
