'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const mountRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const particlesSceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const particlesAnimationIdRef = useRef<number | null>(null);
  const networkGroupRef = useRef<THREE.Group | null>(null);
  const nodesRef = useRef<THREE.Mesh[]>([]);
  const centralHubRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Particles background effect
  useEffect(() => {
    if (!particlesRef.current) return;

    const container = particlesRef.current;
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;

    // Particles scene setup
    const particlesScene = new THREE.Scene();
    particlesSceneRef.current = particlesScene;

    const particlesCamera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
    particlesCamera.position.set(0, 0, 10); // Moved camera further back to see more particles

    const particlesRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    particlesRendererRef.current = particlesRenderer;
    
    particlesRenderer.setSize(containerWidth, containerHeight);
    particlesRenderer.setClearColor(0x000000, 0);
    container.appendChild(particlesRenderer.domElement);

    // Create floating particles background
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 4000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // X position: spread across full width
      posArray[i] = (Math.random() - 0.5) * 50;
      // Y position: spread across full height with better distribution
      posArray[i + 1] = (Math.random() - 0.5) * 40; // Increased range to cover full section
      // Z position: depth variation
      posArray[i + 2] = (Math.random() - 0.5) * 25;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.003,
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.6,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    particlesScene.add(particlesMesh);

    // Particles animation
    const animateParticles = () => {
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;
      
      particlesRenderer.render(particlesScene, particlesCamera);
      particlesAnimationIdRef.current = requestAnimationFrame(animateParticles);
    };
    animateParticles();

    // Handle resize for particles
    const handleParticlesResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      particlesCamera.aspect = newWidth / newHeight;
      particlesCamera.updateProjectionMatrix();
      particlesRenderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleParticlesResize);

    return () => {
      window.removeEventListener('resize', handleParticlesResize);
      if (particlesAnimationIdRef.current) {
        cancelAnimationFrame(particlesAnimationIdRef.current);
      }
      if (container && particlesRenderer.domElement) {
        container.removeChild(particlesRenderer.domElement);
      }
      particlesRenderer.dispose();
    };
  }, []);

  // Network visualization effect
  useEffect(() => {
    if (!mountRef.current) return;

    // Get container dimensions
    const container = mountRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    rendererRef.current = renderer;
    
    renderer.setSize(containerWidth, containerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create digital marketing network visualization
    const networkGroup = new THREE.Group();
    
    // Central hub (Brand/Business Core - glowing polyhedron)
    const centralGroup = new THREE.Group();
    
    // Main core - icosahedron (20-sided polyhedron) for modern look
    const coreGeometry = new THREE.IcosahedronGeometry(0.15, 1);
    const coreMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00ff88,
      transparent: true,
      opacity: 0.9,
      wireframe: false
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    centralGroup.add(core);
    
    // Inner glow sphere
    const innerGlowGeometry = new THREE.SphereGeometry(0.12, 16, 16);
    const innerGlowMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00ffaa,
      transparent: true,
      opacity: 0.3
    });
    const innerGlow = new THREE.Mesh(innerGlowGeometry, innerGlowMaterial);
    centralGroup.add(innerGlow);
    
    // Outer aura rings
    const ring1Geometry = new THREE.TorusGeometry(0.25, 0.01, 8, 32);
    const ring2Geometry = new THREE.TorusGeometry(0.3, 0.008, 8, 32);
    const ring3Geometry = new THREE.TorusGeometry(0.35, 0.006, 8, 32);
    
    const ringMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00ffff,
      transparent: true,
      opacity: 0.6
    });
    
    const ring1 = new THREE.Mesh(ring1Geometry, ringMaterial);
    const ring2 = new THREE.Mesh(ring2Geometry, ringMaterial.clone());
    const ring3 = new THREE.Mesh(ring3Geometry, ringMaterial.clone());
    
    ring1.rotation.x = Math.PI / 2;
    ring2.rotation.z = Math.PI / 3;
    ring3.rotation.y = Math.PI / 4;
    
    ring2.material.opacity = 0.4;
    ring3.material.opacity = 0.2;
    
    centralGroup.add(ring1, ring2, ring3);
    
    // Energy particles around core
    const energyParticles: THREE.Mesh[] = [];
    for (let i = 0; i < 12; i++) {
      const particleGeometry = new THREE.SphereGeometry(0.008, 6, 6);
      const particleMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00ffff,
        transparent: true,
        opacity: 0.8
      });
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      
      // Random position around core
      const angle = (i / 12) * Math.PI * 2;
      const radius = 0.2 + Math.random() * 0.1;
      particle.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 0.3,
        Math.sin(angle) * radius
      );
      
      energyParticles.push(particle);
      centralGroup.add(particle);
    }
    
    // Store energy particles for animation
    (centralGroup as any).energyParticles = energyParticles;
    (centralGroup as any).core = core;
    (centralGroup as any).rings = [ring1, ring2, ring3];
    
    const centralHub = centralGroup;
    networkGroup.add(centralHub);
    
    // Create digital marketing channels with specific symbols and orbital positions
     const channelData = [
       { pos: [2.5, 0, 0], type: 'social_media', color: 0x1877f2, name: 'Social Media' }, // Social platforms
       { pos: [-2.5, 0, 0], type: 'seo_traffic', color: 0x4285f4, name: 'SEO & Traffic' }, // Search & website
       { pos: [0, 2.5, 0], type: 'email_marketing', color: 0x34a853, name: 'Email Marketing' }, // Email campaigns
       { pos: [0, -2.5, 0], type: 'ads_marketing', color: 0xff6b35, name: 'Paid Ads' }, // Google/FB Ads
       { pos: [1.8, 1.8, 1.2], type: 'content_marketing', color: 0x9c27b0, name: 'Content Marketing' }, // Content creation
       { pos: [-1.8, -1.8, -1.2], type: 'analytics', color: 0xff9800, name: 'Analytics' }, // Data & insights
       { pos: [1.8, -1.8, 0.8], type: 'influencer', color: 0xe91e63, name: 'Influencer' }, // Influencer marketing
       { pos: [-1.8, 1.8, -0.8], type: 'mobile_marketing', color: 0x00bcd4, name: 'Mobile Marketing' } // Mobile campaigns
     ];
    
    const channels: THREE.Group[] = [];
    channelData.forEach(({ pos, type, color, name }, index) => {
      const nodeGroup = new THREE.Group();
      let geometry, material;
      
      switch(type) {
         case 'social_media': // Social Media - Multiple platform icons
           const socialGroup = new THREE.Group();
           // Main sphere with smaller spheres around it
           const mainSphere = new THREE.SphereGeometry(0.12, 16, 16);
           const smallSphere = new THREE.SphereGeometry(0.04, 8, 8);
           
           const main = new THREE.Mesh(mainSphere, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 }));
           socialGroup.add(main);
           
           // Add 4 smaller spheres around main one
           for (let i = 0; i < 4; i++) {
             const small = new THREE.Mesh(smallSphere, new THREE.MeshBasicMaterial({ color: color + 0x111111, transparent: true, opacity: 0.8 }));
             const angle = (i / 4) * Math.PI * 2;
             small.position.set(Math.cos(angle) * 0.2, Math.sin(angle) * 0.2, 0);
             socialGroup.add(small);
           }
           nodeGroup.add(socialGroup);
           break;
           
         case 'seo_traffic': // SEO & Traffic - Globe with search magnifier
           const seoGroup = new THREE.Group();
           // Globe
           const globe = new THREE.SphereGeometry(0.1, 16, 16);
           const globeMesh = new THREE.Mesh(globe, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8, wireframe: true }));
           
           // Magnifier
           const magLens = new THREE.TorusGeometry(0.06, 0.015, 8, 16);
           const magHandle = new THREE.CylinderGeometry(0.01, 0.01, 0.08, 8);
           const magLensMesh = new THREE.Mesh(magLens, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 }));
           const magHandleMesh = new THREE.Mesh(magHandle, new THREE.MeshBasicMaterial({ color: 0x666666, transparent: true, opacity: 0.9 }));
           
           magLensMesh.position.set(0.08, 0.08, 0);
           magHandleMesh.position.set(0.12, 0.12, 0);
           magHandleMesh.rotation.z = Math.PI / 4;
           
           seoGroup.add(globeMesh, magLensMesh, magHandleMesh);
           nodeGroup.add(seoGroup);
           break;
           
         case 'email_marketing': // Email - Envelope shape
           const emailGroup = new THREE.Group();
           // Envelope body
           const envBody = new THREE.BoxGeometry(0.2, 0.14, 0.02);
           const envFlap = new THREE.BoxGeometry(0.2, 0.1, 0.02);
           
           const body = new THREE.Mesh(envBody, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 }));
           const flap = new THREE.Mesh(envFlap, new THREE.MeshBasicMaterial({ color: color - 0x222222, transparent: true, opacity: 0.9 }));
           
           flap.position.set(0, 0.05, 0.01);
           flap.rotation.x = -Math.PI / 6;
           
           // @ symbol
           const atSymbol = new THREE.TorusGeometry(0.03, 0.01, 8, 16);
           const atMesh = new THREE.Mesh(atSymbol, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 }));
           atMesh.position.set(0, 0, 0.03);
           
           emailGroup.add(body, flap, atMesh);
           nodeGroup.add(emailGroup);
           break;
           
         case 'ads_marketing': // Paid Ads - Billboard/Rectangle shape
           const adsGroup = new THREE.Group();
           // Billboard shape
           const billboard = new THREE.BoxGeometry(0.2, 0.12, 0.02);
           const adFrame = new THREE.BoxGeometry(0.22, 0.14, 0.01);
           
           const billboardMesh = new THREE.Mesh(billboard, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 }));
           const frameMesh = new THREE.Mesh(adFrame, new THREE.MeshBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.8 }));
           
           // Add "$" symbol
           const dollarGeom = new THREE.TorusGeometry(0.04, 0.01, 8, 16);
           const dollarLine = new THREE.CylinderGeometry(0.005, 0.005, 0.1, 8);
           const dollarMesh = new THREE.Mesh(dollarGeom, new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.9 }));
           const dollarLineMesh = new THREE.Mesh(dollarLine, new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.9 }));
           
           dollarMesh.position.set(0, 0, 0.03);
           dollarLineMesh.position.set(0, 0, 0.03);
           frameMesh.position.set(0, 0, -0.01);
           
           adsGroup.add(frameMesh, billboardMesh, dollarMesh, dollarLineMesh);
           nodeGroup.add(adsGroup);
           break;
           
         case 'content_marketing': // Content - Document/Pen shape
           const contentGroup = new THREE.Group();
           // Document
           const document = new THREE.BoxGeometry(0.12, 0.16, 0.02);
           const docMesh = new THREE.Mesh(document, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 }));
           
           // Pen
           const penBody = new THREE.CylinderGeometry(0.01, 0.01, 0.15, 8);
           const penTip = new THREE.ConeGeometry(0.01, 0.03, 8);
           const penBodyMesh = new THREE.Mesh(penBody, new THREE.MeshBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.9 }));
           const penTipMesh = new THREE.Mesh(penTip, new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.9 }));
           
           penBodyMesh.position.set(0.1, 0, 0);
           penBodyMesh.rotation.z = Math.PI / 4;
           penTipMesh.position.set(0.15, 0.05, 0);
           penTipMesh.rotation.z = Math.PI / 4;
           
           contentGroup.add(docMesh, penBodyMesh, penTipMesh);
           nodeGroup.add(contentGroup);
           break;
           
         case 'analytics': // Analytics - Chart/Graph shape
           const analyticsGroup = new THREE.Group();
           // Base chart
           const chartBase = new THREE.BoxGeometry(0.16, 0.12, 0.02);
           const chartMesh = new THREE.Mesh(chartBase, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8 }));
           
           // Bar chart bars
           for (let i = 0; i < 4; i++) {
             const barHeight = 0.04 + (i * 0.02);
             const bar = new THREE.BoxGeometry(0.02, barHeight, 0.02);
             const barMesh = new THREE.Mesh(bar, new THREE.MeshBasicMaterial({ color: color + (i * 0x111111), transparent: true, opacity: 0.9 }));
             barMesh.position.set(-0.06 + (i * 0.04), barHeight / 2 - 0.06, 0.02);
             analyticsGroup.add(barMesh);
           }
           
           analyticsGroup.add(chartMesh);
           nodeGroup.add(analyticsGroup);
           break;
           
         case 'influencer': // Influencer - Person with crown
           const influencerGroup = new THREE.Group();
           // Person head
           const head = new THREE.SphereGeometry(0.06, 12, 12);
           const headMesh = new THREE.Mesh(head, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 }));
           
           // Crown
           const crown = new THREE.CylinderGeometry(0.07, 0.05, 0.04, 8);
           const crownMesh = new THREE.Mesh(crown, new THREE.MeshBasicMaterial({ color: 0xffd700, transparent: true, opacity: 0.9 }));
           crownMesh.position.set(0, 0.08, 0);
           
           // Crown points
           for (let i = 0; i < 5; i++) {
             const point = new THREE.ConeGeometry(0.01, 0.03, 4);
             const pointMesh = new THREE.Mesh(point, new THREE.MeshBasicMaterial({ color: 0xffd700, transparent: true, opacity: 0.9 }));
             const angle = (i / 5) * Math.PI * 2;
             pointMesh.position.set(Math.cos(angle) * 0.06, 0.11, Math.sin(angle) * 0.06);
             influencerGroup.add(pointMesh);
           }
           
           influencerGroup.add(headMesh, crownMesh);
           nodeGroup.add(influencerGroup);
           break;
           
         case 'mobile_marketing': // Mobile - Phone shape
           const mobileGroup = new THREE.Group();
           // Phone body
           const phoneBody = new THREE.BoxGeometry(0.08, 0.14, 0.02);
           const phoneScreen = new THREE.BoxGeometry(0.06, 0.1, 0.01);
           
           const phoneMesh = new THREE.Mesh(phoneBody, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 }));
           const screenMesh = new THREE.Mesh(phoneScreen, new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.8 }));
           
           screenMesh.position.set(0, 0, 0.015);
           
           // Home button
           const homeButton = new THREE.SphereGeometry(0.01, 8, 8);
           const buttonMesh = new THREE.Mesh(homeButton, new THREE.MeshBasicMaterial({ color: 0x666666, transparent: true, opacity: 0.9 }));
           buttonMesh.position.set(0, -0.05, 0.015);
           
           mobileGroup.add(phoneMesh, screenMesh, buttonMesh);
           nodeGroup.add(mobileGroup);
           break;
           
         default:
           // Default sphere for unknown types
           const defaultSphere = new THREE.SphereGeometry(0.12, 12, 12);
           const defaultMesh = new THREE.Mesh(defaultSphere, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8 }));
           nodeGroup.add(defaultMesh);
       }
      
       // Store channel info for orbital animation
       (nodeGroup as any).channelType = type;
       (nodeGroup as any).channelName = name;
       (nodeGroup as any).originalPosition = new THREE.Vector3(pos[0], pos[1], pos[2]);
       (nodeGroup as any).orbitAngle = Math.random() * Math.PI * 2;
       
       nodeGroup.position.set(pos[0], pos[1], pos[2]);
       channels.push(nodeGroup);
       networkGroup.add(nodeGroup);
      
      // Create curved glowing connections to central hub
      const startPoint = new THREE.Vector3(0, 0, 0); // Hub center
      const endPoint = new THREE.Vector3(pos[0], pos[1], pos[2]); // Channel position
      
      // Create curved path with control points for smooth arc
      const midPoint = startPoint.clone().lerp(endPoint, 0.5);
      midPoint.y += 0.3; // Add curve height
      
      const curve = new THREE.QuadraticBezierCurve3(
        startPoint,
        midPoint,
        endPoint
      );
      
      // Create tube geometry along the curve
      const tubeGeometry = new THREE.TubeGeometry(curve, 32, 0.008, 8, false);
      
      // Create gradient material with glow effect
      const connectionMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.5 + index * 0.1, 0.8, 0.6), // Different colors per channel
        transparent: true,
        opacity: 0.8
      });
      
      const connection = new THREE.Mesh(tubeGeometry, connectionMaterial);
      
      // Add glow effect using a larger tube with lower opacity
      const glowGeometry = new THREE.TubeGeometry(curve, 32, 0.02, 8, false);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.5 + index * 0.1, 1.0, 0.8),
        transparent: true,
        opacity: 0.2
      });
      const glowConnection = new THREE.Mesh(glowGeometry, glowMaterial);
      
      networkGroup.add(connection);
      networkGroup.add(glowConnection);
      
      // Store curve for particle animation
      (connection as any).curve = curve;
      (glowConnection as any).curve = curve;
      
      // Create electric current effect - moving particles along the connection
      const particleCount = 8;
      const electricParticles: THREE.Mesh[] = [];
      
      for (let i = 0; i < particleCount; i++) {
        const particleGeometry = new THREE.SphereGeometry(0.008, 6, 6);
        const particleMaterial = new THREE.MeshBasicMaterial({ 
          color: 0x00ffff, 
          transparent: true, 
          opacity: 0.9
        });
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        
        // Store curve info for animation along curved path
        (particle as any).curve = curve;
        (particle as any).progress = (i / particleCount) + Math.random() * 0.2;
        (particle as any).speed = 0.008 + Math.random() * 0.008;
        (particle as any).channelColor = new THREE.Color().setHSL(0.5 + index * 0.1, 1.0, 0.7);
        
        electricParticles.push(particle);
        networkGroup.add(particle);
      }
      
      // Store particles for animation
      (networkGroup as any).electricParticles = (networkGroup as any).electricParticles || [];
      (networkGroup as any).electricParticles.push(...electricParticles);
    });
    
    // Create audience particles (potential customers) flying from channels to hub
    const audienceParticles: THREE.Mesh[] = [];
    
    channels.forEach((channel, channelIndex) => {
      const particleCount = 3 + Math.floor(Math.random() * 3); // 3-5 particles per channel
      
      for (let i = 0; i < particleCount; i++) {
        const particleGeometry = new THREE.SphereGeometry(0.015, 8, 8);
        const particleMaterial = new THREE.MeshBasicMaterial({ 
          color: 0x00aaff, // Blue for potential customers
          transparent: true, 
          opacity: 0.8
        });
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        
        // Store audience particle info
        const channelPos = (channel as any).originalPosition;
        (particle as any).startPos = channelPos.clone();
        (particle as any).endPos = new THREE.Vector3(0, 0, 0); // Hub center
        (particle as any).progress = Math.random(); // Random start position
        (particle as any).speed = 0.005 + Math.random() * 0.005; // Slower than electric particles
        (particle as any).channelIndex = channelIndex;
        (particle as any).isConverted = false;
        (particle as any).spawnDelay = Math.random() * 5000; // Random spawn delay
        (particle as any).lastSpawnTime = Date.now();
        
        // Start at channel position
        particle.position.copy(channelPos);
        
        audienceParticles.push(particle);
        networkGroup.add(particle);
      }
    });
    
    // Store audience particles for animation
    (networkGroup as any).audienceParticles = audienceParticles;
    
    scene.add(networkGroup);

     camera.position.z = 5;
     
     sceneRef.current = scene;
     rendererRef.current = renderer;
     networkGroupRef.current = networkGroup;
      nodesRef.current = channels as unknown as THREE.Mesh[];
      centralHubRef.current = centralHub as unknown as THREE.Mesh;

    // Mouse hold interaction for network control
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isControlling = false;
    let isMouseDown = false;
    
    const handleMouseDown = (event: MouseEvent) => {
      if (event.button === 0) { // Left mouse button
        isMouseDown = true;
        isControlling = true;
        
        const rect = container.getBoundingClientRect();
        const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        // Set target rotation based on mouse position with full 360-degree range
        targetRotationY = mouseX * Math.PI * 2; // Full 360-degree rotation
        targetRotationX = mouseY * Math.PI; // Increased range for X rotation
      }
    };
    
    const handleMouseUp = (event: MouseEvent) => {
      if (event.button === 0) { // Left mouse button
        isMouseDown = false;
        isControlling = false;
      }
    };
    
    const handleMouseMove = (event: MouseEvent) => {
      if (isMouseDown && isControlling) {
        const rect = container.getBoundingClientRect();
        const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        // Update target rotation while dragging with full 360-degree range
        targetRotationY = mouseX * Math.PI * 2; // Full 360-degree rotation
        targetRotationX = mouseY * Math.PI; // Increased range for X rotation
      }
    };
    
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mousemove', handleMouseMove);
    
    // Also handle mouse leave to stop control
    const handleMouseLeave = () => {
      isMouseDown = false;
      isControlling = false;
    };
    
    container.addEventListener('mouseleave', handleMouseLeave);
    
    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      // Rotate network based on click control or auto-rotation
      if (isControlling) {
        // Smoothly interpolate to target rotation with faster response
        const lerpFactor = 0.1; // Increased from 0.05 for smoother response
        networkGroup.rotation.y += (targetRotationY - networkGroup.rotation.y) * lerpFactor;
        networkGroup.rotation.x += (targetRotationX - networkGroup.rotation.x) * lerpFactor;
        
        // Add continuous rotation for 360-degree effect
        networkGroup.rotation.y += 0.01;
      } else {
        // Auto rotation when not being controlled
        networkGroup.rotation.y += 0.005;
        networkGroup.rotation.x += 0.003;
      }
      
      // Animate individual channels with orbital movement
      channels.forEach((channel, index) => {
        // Self rotation
        channel.rotation.y += 0.02;
        
        // Orbital movement around central hub
        const orbitRadius = (channel as any).originalPosition.length();
        (channel as any).orbitAngle += 0.008 + (index * 0.001); // Different speeds for each channel
        
        const newX = Math.cos((channel as any).orbitAngle) * orbitRadius;
        const newZ = Math.sin((channel as any).orbitAngle) * orbitRadius;
        
        // Keep original Y position with slight floating effect
        const originalY = (channel as any).originalPosition.y;
        const newY = originalY + Math.sin(Date.now() * 0.001 + index) * 0.1;
        
        channel.position.set(newX, newY, newZ);
      });
      
      // Animate electric particles
      if ((networkGroup as any).electricParticles) {
        (networkGroup as any).electricParticles.forEach((particle: any) => {
          // Update particle progress
          particle.progress += particle.speed;
          
          // Reset particle when it reaches the end
          if (particle.progress >= 1) {
            particle.progress = 0;
          }
          
          // Move along the curved path using the stored curve
          if (particle.curve) {
            const currentPos = particle.curve.getPoint(particle.progress);
            particle.position.copy(currentPos);
          }
          
          // Dynamic color based on progress and channel
          const baseColor = particle.channelColor || new THREE.Color(0x00ffff);
          const progressColor = new THREE.Color().lerpColors(
            baseColor,
            new THREE.Color(0xffffff),
            Math.sin(particle.progress * Math.PI) * 0.5 + 0.5
          );
          particle.material.color.copy(progressColor);
          
          // Enhanced flickering effect with data flow pulse
          const pulseIntensity = Math.sin(Date.now() * 0.005 + particle.progress * 15) * 0.3;
          particle.material.opacity = 0.8 + pulseIntensity;
          
          // Scale effect for data flow visualization
          const scaleEffect = 1 + Math.sin(particle.progress * Math.PI * 2) * 0.3;
          particle.scale.setScalar(scaleEffect);
          
          // Subtle random movement for organic feel
          particle.position.x += (Math.random() - 0.5) * 0.005;
          particle.position.y += (Math.random() - 0.5) * 0.005;
          particle.position.z += (Math.random() - 0.5) * 0.005;
        });
      }
      
      // Animate audience particles (potential customers)
      if ((networkGroup as any).audienceParticles) {
        const currentTime = Date.now();
        
        (networkGroup as any).audienceParticles.forEach((particle: any) => {
          // Update particle progress
          particle.progress += particle.speed;
          
          // Reset particle when it reaches the hub (conversion complete)
          if (particle.progress >= 1) {
            particle.progress = 0;
            particle.isConverted = false;
            particle.lastSpawnTime = currentTime;
            
            // Reset to channel position (respawn)
            const channel = channels[particle.channelIndex];
            particle.startPos.copy(channel.position);
            particle.material.color.setHex(0x00aaff); // Reset to blue
          }
          
          // Interpolate position from channel to hub center
          const currentPos = particle.startPos.clone().lerp(particle.endPos, particle.progress);
          particle.position.copy(currentPos);
          
          // Conversion effect - change color when close to hub
          const distanceToHub = particle.position.distanceTo(new THREE.Vector3(0, 0, 0));
          if (distanceToHub < 0.5 && !particle.isConverted) {
            particle.isConverted = true;
            particle.material.color.setHex(0xffaa00); // Change to orange/gold for conversion
            
            // Add slight scale effect for conversion
            particle.scale.setScalar(1.5);
            setTimeout(() => {
              if (particle.scale) particle.scale.setScalar(1);
            }, 200);
          }
          
          // Add floating movement
          particle.position.y += Math.sin(currentTime * 0.003 + particle.channelIndex) * 0.005;
          
          // Pulsing opacity based on conversion status
          if (particle.isConverted) {
            particle.material.opacity = 0.9 + Math.sin(currentTime * 0.01) * 0.1;
          } else {
            particle.material.opacity = 0.6 + Math.sin(currentTime * 0.005 + particle.channelIndex) * 0.2;
          }
        });
      }
      
      // Animate central hub (Brand Core)
      const time = Date.now() * 0.001;
      
      // Rotate core polyhedron
      if ((centralHub as any).core) {
        (centralHub as any).core.rotation.x += 0.01;
        (centralHub as any).core.rotation.y += 0.015;
        (centralHub as any).core.rotation.z += 0.008;
      }
      
      // Animate rings
      if ((centralHub as any).rings) {
        (centralHub as any).rings[0].rotation.z += 0.02;
        (centralHub as any).rings[1].rotation.x += 0.015;
        (centralHub as any).rings[2].rotation.y += 0.01;
      }
      
      // Animate energy particles around core
      if ((centralHub as any).energyParticles) {
        (centralHub as any).energyParticles.forEach((particle: any, index: number) => {
          const angle = time + (index / 12) * Math.PI * 2;
          const radius = 0.2 + Math.sin(time * 2 + index) * 0.05;
          particle.position.x = Math.cos(angle) * radius;
          particle.position.z = Math.sin(angle) * radius;
          particle.position.y = Math.sin(time * 3 + index) * 0.1;
          
          // Pulsing opacity
          particle.material.opacity = 0.6 + Math.sin(time * 4 + index) * 0.3;
        });
      }
      
      // Gentle pulsing scale for entire hub
      centralHub.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (container) {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (container) {
        container.removeEventListener('mousedown', handleMouseDown);
        container.removeEventListener('mouseup', handleMouseUp);
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    // GSAP animations for text
    gsap.fromTo(
      '.hero-title',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.5 }
    );
    
    gsap.fromTo(
      '.hero-subtitle',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.8 }
    );
    
    gsap.fromTo(
      '.hero-cta',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.1 }
    );
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Particles Background - Behind everything */}
      <div className="absolute inset-0 z-0">
        <div ref={particlesRef} className="absolute inset-0" />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900 z-10" />
      
      {/* Content */}
      <div className="relative z-20 px-4 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center h-full min-h-[80vh]">
          {/* Left Content */}
          <div className="text-left">
            <h1 className="hero-title text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Giải Pháp Marketing
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Số Hóa Toàn Diện</span>
            </h1>
            
            <p className="hero-subtitle text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
              Chúng tôi giúp doanh nghiệp phát triển mạnh mẽ trong kỷ nguyên số với các giải pháp marketing đa kênh: SEO, SEM, Social Media, Content Marketing và Analytics – tối ưu ROI và gia tăng doanh thu bền vững.
            </p>
            
            <div className="hero-cta flex flex-col sm:flex-row gap-4 items-start">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 212, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              >
                Tư Vấn Marketing Miễn Phí
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300"
              >
                Xem Gói Dịch Vụ
              </motion.button>
            </div>
          </div>
          
          {/* Right Content - Three.js Network */}
          <div className="relative h-[500px] lg:h-[600px]">
            <div ref={mountRef} className="absolute inset-0 z-0" />
          </div>
        </div>
        
        {/* Scroll Indicator - 3 V shapes */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          style={{ opacity: Math.max(0, 1 - scrollY / 100) }}
          onClick={() => {
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div className="relative flex flex-col items-center">
            {/* First V */}
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0 }}
              className="text-cyan-400 text-2xl font-bold leading-none"
              style={{ letterSpacing: '0.3em', transform: 'scaleX(2.0)' }}
            >
              ∨
            </motion.div>
            {/* Second V */}
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="text-cyan-400 text-2xl font-bold leading-none -mt-3"
              style={{ letterSpacing: '0.3em', transform: 'scaleX(2.0)' }}
            >
              ∨
            </motion.div>
            {/* Third V */}
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="text-cyan-400 text-2xl font-bold leading-none -mt-3"
              style={{ letterSpacing: '0.3em', transform: 'scaleX(2.0)' }}
            >
              ∨
            </motion.div>
            <div className="text-cyan-400 text-xs mt-2 font-medium tracking-wider">SCROLL</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;