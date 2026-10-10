import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface RealisticSphereProps {
  className?: string;
  rotationRef?: React.MutableRefObject<{ x: number; y: number; z: number }>;
}

export default function RealisticSphere({ className = '', rotationRef }: RealisticSphereProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sphereGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 200;
    const height = container.clientHeight || 200;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 3. Create Sphere Group
    const group = new THREE.Group();
    scene.add(group);
    sphereGroupRef.current = group;

    // 4. Procedural High-Res Texture (Exact Site Background Black #08080a + #0052ff + White)
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // Base exact site dark background color (#08080a & #111216)
    const grad = ctx.createLinearGradient(0, 0, 0, 1024);
    grad.addColorStop(0, '#111216');
    grad.addColorStop(0.35, '#08080a');
    grad.addColorStop(0.7, '#08080a');
    grad.addColorStop(1, '#040405');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 2048, 1024);

    // Subtle brushed carbon / metallic micro-noise texture
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    for (let i = 0; i < 4000; i++) {
      ctx.fillRect(Math.random() * 2048, Math.random() * 1024, 2, 2);
    }

    // Bold Electric Blue Equator Band (#0052ff)
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#0052ff';
    [0.5].forEach(ratio => {
      ctx.beginPath();
      ctx.moveTo(0, 1024 * ratio);
      ctx.lineTo(2048, 1024 * ratio);
      ctx.stroke();
    });

    // Secondary Electric Blue Latitude & Longitude Tracks
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgba(0, 82, 255, 0.7)';
    [0.25, 0.75].forEach(ratio => {
      ctx.beginPath();
      ctx.moveTo(0, 1024 * ratio);
      ctx.lineTo(2048, 1024 * ratio);
      ctx.stroke();
    });
    [0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875].forEach(ratio => {
      ctx.beginPath();
      ctx.moveTo(2048 * ratio, 0);
      ctx.lineTo(2048 * ratio, 1024);
      ctx.stroke();
    });

    // Crisp Pure White Precision Lines
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#ffffff';
    [0.25, 0.5, 0.75].forEach(ratio => {
      ctx.beginPath();
      ctx.moveTo(0, 1024 * ratio);
      ctx.lineTo(2048, 1024 * ratio);
      ctx.stroke();
    });

    // Technical Target / Core Nodes (Electric Blue Ring + Pure White Center)
    [0.25, 0.5, 0.75].forEach(xRatio => {
      [0.5].forEach(yRatio => {
        const cx = 2048 * xRatio;
        const cy = 1024 * yRatio;
        
        // Outer Blue Ring
        ctx.beginPath();
        ctx.arc(cx, cy, 38, 0, Math.PI * 2);
        ctx.strokeStyle = '#0052ff';
        ctx.lineWidth = 8;
        ctx.stroke();

        // Middle White Ring
        ctx.beginPath();
        ctx.arc(cx, cy, 24, 0, Math.PI * 2);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Inner Solid Pure White Core
        ctx.beginPath();
        ctx.arc(cx, cy, 11, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      });
    });

    const sphereTexture = new THREE.CanvasTexture(canvas);
    sphereTexture.wrapS = THREE.RepeatWrapping;
    sphereTexture.wrapT = THREE.ClampToEdgeWrapping;

    // Normal / Bump Texture for physical groove depth
    const bumpCanvas = document.createElement('canvas');
    bumpCanvas.width = 2048;
    bumpCanvas.height = 1024;
    const bCtx = bumpCanvas.getContext('2d')!;
    bCtx.fillStyle = '#808080';
    bCtx.fillRect(0, 0, 2048, 1024);

    bCtx.lineWidth = 10;
    bCtx.strokeStyle = '#ffffff';
    [0.25, 0.5, 0.75].forEach(ratio => {
      bCtx.beginPath();
      bCtx.moveTo(0, 1024 * ratio);
      bCtx.lineTo(2048, 1024 * ratio);
      bCtx.stroke();
    });
    [0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875].forEach(ratio => {
      bCtx.beginPath();
      bCtx.moveTo(2048 * ratio, 0);
      bCtx.lineTo(2048 * ratio, 1024);
      bCtx.stroke();
    });
    const bumpTexture = new THREE.CanvasTexture(bumpCanvas);

    // 5. High-Poly 3D Sphere Geometry & Material
    const geometry = new THREE.SphereGeometry(1.35, 64, 64);
    const material = new THREE.MeshPhysicalMaterial({
      map: sphereTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.05,
      roughness: 0.12,
      metalness: 0.65,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.95,
      sheen: 0.4,
      sheenColor: new THREE.Color('#0052ff'),
    });

    const sphere = new THREE.Mesh(geometry, material);
    group.add(sphere);

    // Outer subtle atmospheric glow halo
    const glowGeo = new THREE.SphereGeometry(1.365, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x0052ff,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    group.add(glowMesh);

    // 6. Professional Studio 3-Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Main Key Light (Upper Left - Crisp Pure White)
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.8);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    // Fill Light (Electric Blue from bottom right)
    const fillLight = new THREE.DirectionalLight(0x0052ff, 2.2);
    fillLight.position.set(-4, -2, 3);
    scene.add(fillLight);

    // Intense Rim Light from Top-Back (Pure White edge highlight)
    const rimLight = new THREE.DirectionalLight(0xffffff, 4.2);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    // 7. Initial Static Orientation & Render Loop
    group.rotation.x = 0.15;
    group.rotation.y = -0.35;

    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (rotationRef && rotationRef.current) {
        group.rotation.x = 0.15 + rotationRef.current.x;
        group.rotation.y = -0.35 + rotationRef.current.y;
        group.rotation.z = rotationRef.current.z;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      sphereTexture.dispose();
      bumpTexture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [rotationRef]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
}
