import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, RotateCcw, Sparkles, Layers, Box, Trophy, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface CubeletData {
  mesh: THREE.Mesh;
  baseX: number;
  baseY: number;
  baseZ: number;
  currentX: number;
  currentY: number;
  currentZ: number;
  origQuaternion: THREE.Quaternion;
}

export const RubikChallengeCube: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headline1Ref = useRef<HTMLDivElement>(null);
  const headline2Ref = useRef<HTMLDivElement>(null);
  const headline3Ref = useRef<HTMLDivElement>(null);
  const [hudPhase, setHudPhase] = useState<'IDLE' | 'SOLVING' | 'EXPLODED' | 'SOLVED'>('IDLE');
  const [interactionHint, setInteractionHint] = useState('SCROLL TO CONTROL 3D CUBE');

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Check prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    // Atmospheric dark fog matching obsidian background
    scene.fog = new THREE.FogExp2(0x08090d, 0.04);

    const camera = new THREE.PerspectiveCamera(
      42,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    // --- STUDIO LIGHTING SYSTEM ---
    const ambientLight = new THREE.AmbientLight(0x1a2336, 1.8);
    scene.add(ambientLight);

    // Key directional light (cool white)
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(6, 8, 7);
    scene.add(keyLight);

    // Rim light (MrBeast Electric Blue)
    const rimLightBlue = new THREE.DirectionalLight(0x1769e0, 4.5);
    rimLightBlue.position.set(-7, -4, -5);
    scene.add(rimLightBlue);

    // Fill light (Neon Beast Cyan)
    const fillLightCyan = new THREE.PointLight(0x28b8e8, 3.0, 15);
    fillLightCyan.position.set(4, -3, 4);
    scene.add(fillLightCyan);

    // Gold accent light
    const goldAccent = new THREE.PointLight(0xffd000, 2.0, 12);
    goldAccent.position.set(0, 5, -2);
    scene.add(goldAccent);

    // --- RUBIK'S CUBE ARCHITECTURE (27 CUBELETS) ---
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Distinct materials for 6 Rubik faces
    const createFaceMaterial = (color: number, roughness = 0.22, metalness = 0.15, emissive = 0x000000) => {
      return new THREE.MeshStandardMaterial({
        color,
        roughness,
        metalness,
        emissive,
        emissiveIntensity: 0.12,
      });
    };

    const mats = {
      right: createFaceMaterial(0x121520, 0.35, 0.5),             // +X: Dark Obsidian Carbon
      left: createFaceMaterial(0xff007a, 0.25, 0.1, 0x330018),     // -X: Beast Cyber Pink
      top: createFaceMaterial(0xffd000, 0.2, 0.3, 0x332200),       // +Y: Beast Gold / Yellow
      bottom: createFaceMaterial(0xf8fafc, 0.2, 0.1),              // -Y: Studio Pure White
      front: createFaceMaterial(0x1769e0, 0.2, 0.2, 0x071e42),     // +Z: Beast Electric Blue
      back: createFaceMaterial(0x28b8e8, 0.2, 0.2, 0x072c38),      // -Z: Neon Cyan
      inner: createFaceMaterial(0x06070a, 0.7, 0.1),               // Internal faces
    };

    const cubeSize = 0.94;
    const spacing = 1.05;
    const cubelets: CubeletData[] = [];
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

    // Create 3x3x3 = 27 cubelets
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          // Assign materials per face: only external faces get vivid colors; internal faces get dark carbon
          const faceMaterials = [
            x === 1 ? mats.right : mats.inner,   // +X
            x === -1 ? mats.left : mats.inner,   // -X
            y === 1 ? mats.top : mats.inner,     // +Y
            y === -1 ? mats.bottom : mats.inner, // -Y
            z === 1 ? mats.front : mats.inner,   // +Z
            z === -1 ? mats.back : mats.inner,   // -Z
          ];

          const mesh = new THREE.Mesh(geometry, faceMaterials);
          const posX = x * spacing;
          const posY = y * spacing;
          const posZ = z * spacing;
          mesh.position.set(posX, posY, posZ);

          rootGroup.add(mesh);

          cubelets.push({
            mesh,
            baseX: posX,
            baseY: posY,
            baseZ: posZ,
            currentX: posX,
            currentY: posY,
            currentZ: posZ,
            origQuaternion: mesh.quaternion.clone(),
          });
        }
      }
    }

    // Shadow plane beneath cube
    const shadowGeo = new THREE.PlaneGeometry(7, 7);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.45,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -3.2;
    scene.add(shadowMesh);

    // Initial angle
    rootGroup.rotation.x = 0.35;
    rootGroup.rotation.y = -0.55;

    // --- MOUSE PARALLAX TRACKING ---
    const mouseTarget = { x: 0, y: 0 };
    const mouseCurrent = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseTarget.x = x * 0.35;
      mouseTarget.y = y * 0.25;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- ANIMATION TIMELINE DRIVEN BY SCROLLTRIGGER ---
    // State values modified by GSAP scroll scrubbing
    const animState = {
      progress: 0,
      rootRotX: 0.35,
      rootRotY: -0.55,
      rootRotZ: 0,
      rootPosX: 0,
      rootPosY: 0,
      topLayerAngle: 0,
      rightLayerAngle: 0,
      explosion: 0,
      reassemblePhase: 0,
    };

    let scrollTriggerInstance: ScrollTrigger | null = null;

    if (!prefersReduced) {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=280%',
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          animState.progress = p;

          // Phase 1 (0 -> 0.25): Intro hero composition
          if (p < 0.25) {
            const t = p / 0.25;
            animState.rootPosX = gsap.utils.interpolate(0, 1.8, t);
            animState.rootPosY = gsap.utils.interpolate(0, 0.2, t);
            animState.rootRotX = gsap.utils.interpolate(0.35, 0.6, t);
            animState.rootRotY = gsap.utils.interpolate(-0.55, -0.9, t);
            animState.topLayerAngle = 0;
            animState.rightLayerAngle = 0;
            animState.explosion = 0;
            setHudPhase('IDLE');
          }
          // Phase 2 (0.25 -> 0.5): Layer Turns (Simulating Rubik's Mechanism)
          else if (p < 0.5) {
            const t = (p - 0.25) / 0.25;
            animState.rootPosX = gsap.utils.interpolate(1.8, -1.8, t);
            animState.rootPosY = 0.2;
            animState.rootRotX = gsap.utils.interpolate(0.6, 0.3, t);
            animState.rootRotY = gsap.utils.interpolate(-0.9, 0.8, t);

            // Turn top layer 90 degrees
            animState.topLayerAngle = Math.min(t * 2, 1) * (Math.PI / 2);
            // Turn right layer 90 degrees
            animState.rightLayerAngle = Math.max((t - 0.5) * 2, 0) * (Math.PI / 2);
            animState.explosion = 0;
            setHudPhase('SOLVING');
          }
          // Phase 3 (0.5 -> 0.75): Disassembly / Spatial Explosion
          else if (p < 0.75) {
            const t = (p - 0.5) / 0.25;
            animState.rootPosX = gsap.utils.interpolate(-1.8, 0, t);
            animState.rootPosY = gsap.utils.interpolate(0.2, -0.3, t);
            animState.rootRotX = gsap.utils.interpolate(0.3, 0.9, t);
            animState.rootRotY = gsap.utils.interpolate(0.8, 2.5, t);

            // Explosive dispersal outward along normal vectors
            animState.explosion = Math.sin(t * Math.PI) * 1.6;
            animState.topLayerAngle = Math.PI / 2;
            animState.rightLayerAngle = Math.PI / 2;
            setHudPhase('EXPLODED');
          }
          // Phase 4 (0.75 -> 1.0): Snap Reassembly & Victory Alignment
          else {
            const t = (p - 0.75) / 0.25;
            animState.rootPosX = gsap.utils.interpolate(0, 0, t);
            animState.rootPosY = gsap.utils.interpolate(-0.3, 0, t);
            animState.rootRotX = gsap.utils.interpolate(0.9, 0.2, t);
            animState.rootRotY = gsap.utils.interpolate(2.5, Math.PI * 2 - 0.4, t);

            animState.explosion = (1 - t) * 0.2;
            animState.topLayerAngle = (1 - t) * (Math.PI / 2);
            animState.rightLayerAngle = (1 - t) * (Math.PI / 2);
            setHudPhase('SOLVED');
          }
        },
      });

      // Synchronized headline reveals
      if (headline1Ref.current && headline2Ref.current && headline3Ref.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=280%',
            scrub: true,
          },
        })
          .to(headline1Ref.current, { opacity: 1, y: 0, duration: 0.2 })
          .to(headline1Ref.current, { opacity: 0, y: -40, duration: 0.1 }, 0.28)
          .to(headline2Ref.current, { opacity: 1, y: 0, duration: 0.2 }, 0.32)
          .to(headline2Ref.current, { opacity: 0, y: -40, duration: 0.1 }, 0.6)
          .to(headline3Ref.current, { opacity: 1, y: 0, duration: 0.2 }, 0.65)
          .to(headline3Ref.current, { opacity: 0.7, y: 0, duration: 0.2 }, 0.95);
      }
    }

    // --- ANIMATION RENDER LOOP ---
    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse parallax interpolation
      mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.06;
      mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.06;

      // Base idle levitation
      const idleFloat = Math.sin(elapsedTime * 1.5) * 0.12;
      const idleSpin = elapsedTime * 0.15;

      rootGroup.position.x = animState.rootPosX + mouseCurrent.x;
      rootGroup.position.y = animState.rootPosY + idleFloat + mouseCurrent.y;
      rootGroup.position.z = 0;

      // Combine scrubbed rotation + gentle idle rotation
      rootGroup.rotation.x = animState.rootRotX + (animState.progress === 0 ? idleSpin * 0.2 : 0);
      rootGroup.rotation.y = animState.rootRotY + (animState.progress === 0 ? idleSpin : 0);
      rootGroup.rotation.z = animState.rootRotZ;

      // Update individual cubelets
      for (let i = 0; i < cubelets.length; i++) {
        const c = cubelets[i];
        let px = c.baseX;
        let py = c.baseY;
        let pz = c.baseZ;

        // Apply Top Layer Turn (y > 0.5)
        if (c.baseY > 0.5 && animState.topLayerAngle > 0) {
          const cosA = Math.cos(animState.topLayerAngle);
          const sinA = Math.sin(animState.topLayerAngle);
          const nx = px * cosA - pz * sinA;
          const nz = px * sinA + pz * cosA;
          px = nx;
          pz = nz;
          c.mesh.rotation.y = animState.topLayerAngle;
        } else {
          c.mesh.rotation.y = 0;
        }

        // Apply Right Layer Turn (x > 0.5)
        if (c.baseX > 0.5 && animState.rightLayerAngle > 0) {
          const cosA = Math.cos(animState.rightLayerAngle);
          const sinA = Math.sin(animState.rightLayerAngle);
          const ny = py * cosA - pz * sinA;
          const nz = py * sinA + pz * cosA;
          py = ny;
          pz = nz;
          c.mesh.rotation.x = animState.rightLayerAngle;
        } else {
          c.mesh.rotation.x = 0;
        }

        // Apply Spatial Explosion (Disassembly)
        if (animState.explosion > 0.001) {
          const normDist = Math.sqrt(c.baseX * c.baseX + c.baseY * c.baseY + c.baseZ * c.baseZ) || 1;
          const dirX = c.baseX / normDist;
          const dirY = c.baseY / normDist;
          const dirZ = c.baseZ / normDist;

          px += dirX * animState.explosion * 1.8;
          py += dirY * animState.explosion * 1.8;
          pz += dirZ * animState.explosion * 1.8;

          c.mesh.rotation.x += Math.sin(elapsedTime * 2 + i) * animState.explosion * 0.3;
          c.mesh.rotation.z += Math.cos(elapsedTime * 2 + i) * animState.explosion * 0.3;
        }

        c.mesh.position.set(px, py, pz);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
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
      geometry.dispose();
      Object.values(mats).forEach((m) => m.dispose());
      shadowGeo.dispose();
      shadowMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-[#08090D] overflow-hidden flex items-center justify-center select-none"
    >
      {/* Three.js Render Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing z-10"
      />

      {/* Atmospheric Background Lighting */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#1769E0]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#28B8E8]/12 rounded-full blur-[140px] pointer-events-none" />

      {/* Top HUD Specs */}
      <div className="absolute top-8 left-6 right-6 sm:left-12 sm:right-12 flex items-center justify-between text-xs font-mono text-neutral-400 z-20 pointer-events-none">
        <div className="flex items-center gap-2">
          <Box className="w-4 h-4 text-[#28B8E8]" />
          <span className="text-white font-semibold">3D CHALLENGE PUZZLE // GEOMETRY ENGINE</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-neutral-500">STATE:</span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-[#28B8E8] font-bold">
            {hudPhase}
          </span>
          <span className="text-neutral-500">27 CUBELETS · THREE.JS</span>
        </div>
      </div>

      {/* Interactive Depth Headlines Layered Behind / Beside Cube */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 px-6">
        {/* Headline 1 (Left Aligned during Phase 1) */}
        <div
          ref={headline1Ref}
          className="absolute left-6 sm:left-16 lg:left-24 max-w-lg space-y-4 opacity-0 transform translate-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-[#28B8E8]">
            <Sparkles className="w-3.5 h-3.5 text-[#1769E0]" />
            <span>PUZZLE DYNAMICS // STAGE 01</span>
          </div>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-white uppercase font-display leading-[0.92]">
            CAN YOU <br />
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-[#1769E0]">
              SOLVE IT?
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-mono max-w-sm">
            Every layer rotation shifts the entire physical soundstage. One incorrect turn locks the prize vault forever.
          </p>
        </div>

        {/* Headline 2 (Right Aligned during Phase 2) */}
        <div
          ref={headline2Ref}
          className="absolute right-6 sm:right-16 lg:right-24 max-w-lg text-right space-y-4 opacity-0 transform translate-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-[#FF007A]">
            <Layers className="w-3.5 h-3.5" />
            <span>EXPLODED MECHANISM // STAGE 02</span>
          </div>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-white uppercase font-display leading-[0.92]">
            EVERY SECOND <br />
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-[#28B8E8]">
              COUNTS.
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-mono max-w-sm ml-auto">
            27 modular cubelets disassemble into 3D space. 456 contestants competing against the ticking stopwatch.
          </p>
        </div>

        {/* Headline 3 (Centered Finale during Phase 3 & 4) */}
        <div
          ref={headline3Ref}
          className="text-center max-w-2xl space-y-5 opacity-0 transform translate-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/15 text-xs font-mono text-[#FFD000]">
            <Trophy className="w-3.5 h-3.5" />
            <span>ALIGNED VICTORY // $456,000 BOUNTY</span>
          </div>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-white uppercase font-display leading-[0.92]">
            THINK YOU <br />
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-[#1769E0]">
              CAN WIN?
            </span>
          </h2>
          <div className="pt-2 flex items-center justify-center gap-4 pointer-events-auto">
            <Link
              to="/submit-challenge"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-black bg-white hover:bg-[#28B8E8] transition-all shadow-xl"
            >
              <span>SUBMIT CHALLENGE CONCEPT</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Floating Scroll HUD */}
      <div className="absolute bottom-8 left-6 right-6 sm:left-12 sm:right-12 flex items-center justify-between text-xs font-mono text-neutral-500 z-20 pointer-events-none border-t border-white/10 pt-4">
        <div className="flex items-center gap-2 text-neutral-400">
          <RotateCcw className="w-3.5 h-3.5 text-[#28B8E8] animate-spin" style={{ animationDuration: '6s' }} />
          <span>DRAG MOUSE FOR 3D PARALLAX · SCROLL TO ROTATE & EXPLODE</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-neutral-400">
          <span>RUBIK ALGORITHM // 0x4B3A</span>
          <span>·</span>
          <span>REVERSIBLE TIMELINE</span>
        </div>
      </div>
    </div>
  );
};
