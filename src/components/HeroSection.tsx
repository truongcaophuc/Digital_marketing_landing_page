"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useLanguage } from "../contexts/LanguageContext";

// Interface for extended THREE.Group with custom properties
interface ExtendedGroup extends THREE.Group {
  nodes?: THREE.Mesh[];
  connections?: THREE.Line[];
}

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const { t } = useLanguage();
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

    const particlesCamera = new THREE.PerspectiveCamera(
      75,
      containerWidth / containerHeight,
      0.1,
      1000
    );
    particlesCamera.position.set(0, 0, 10); // Moved camera further back to see more particles

    const particlesRenderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
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

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.003,
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.6,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
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
    window.addEventListener("resize", handleParticlesResize);

    return () => {
      window.removeEventListener("resize", handleParticlesResize);
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

    const camera = new THREE.PerspectiveCamera(
      75,
      containerWidth / containerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 16); // Increased distance for smaller initial size

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    rendererRef.current = renderer;

    renderer.setSize(containerWidth, containerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Add optimized lighting system for enhanced glow effects
    const ambientLight = new THREE.AmbientLight(0x202040, 0.3); // Darker ambient for better contrast
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Reduced intensity
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);

    // Add multiple point lights for enhanced glow
    const pointLight1 = new THREE.PointLight(0x00ddff, 1.0, 15); // Bright cyan
    pointLight1.position.set(0, 3, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x0099ff, 0.8, 12); // Blue accent
    pointLight2.position.set(-3, -2, 4);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x00ffcc, 0.6, 10); // Cyan-green accent
    pointLight3.position.set(3, -1, 2);
    scene.add(pointLight3);

    // Add rim light for edge highlighting
    const rimLight = new THREE.DirectionalLight(0x00ffff, 0.4); // Increased intensity
    rimLight.position.set(-10, -10, -5);
    scene.add(rimLight);

    // Add orbit controls for user interaction with smooth damping
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableZoom = false; // Disabled zoom functionality
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    controls.rotateSpeed = 0.5;

    // Add floating particles around network
    const particleCount = 100;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Random positions in sphere around network
      const radius = 8 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i3 + 2] = radius * Math.cos(phi);

      // Cyan-blue color variations
      particleColors[i3] = 0.0 + Math.random() * 0.3;
      particleColors[i3 + 1] = 0.8 + Math.random() * 0.2;
      particleColors[i3 + 2] = 1.0;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    particleGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(particleColors, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const floatingParticles = new THREE.Points(
      particleGeometry,
      particleMaterial
    );
    scene.add(floatingParticles);

    // Create simple node network
    const networkGroup = new THREE.Group();

const nodes: THREE.Mesh[] = [];
    const connections: THREE.Line[] = [];

    // Network node positioning - optimized geometric layout
    const nodePositions = [
      // Central hub
      { x: 0, y: 0, z: 0 },

      // Inner ring - 6 nodes in perfect circle
      { x: 2.5 * Math.cos(0), y: 2.5 * Math.sin(0), z: 0 },
      { x: 2.5 * Math.cos(Math.PI / 3), y: 2.5 * Math.sin(Math.PI / 3), z: 0 },
      {
        x: 2.5 * Math.cos((2 * Math.PI) / 3),
        y: 2.5 * Math.sin((2 * Math.PI) / 3),
        z: 0,
      },
      { x: 2.5 * Math.cos(Math.PI), y: 2.5 * Math.sin(Math.PI), z: 0 },
      {
        x: 2.5 * Math.cos((4 * Math.PI) / 3),
        y: 2.5 * Math.sin((4 * Math.PI) / 3),
        z: 0,
      },
      {
        x: 2.5 * Math.cos((5 * Math.PI) / 3),
        y: 2.5 * Math.sin((5 * Math.PI) / 3),
        z: 0,
      },

      // Outer ring - 6 nodes in larger circle with Z variation
      { x: 4 * Math.cos(Math.PI / 6), y: 4 * Math.sin(Math.PI / 6), z: 1.5 },
      { x: 4 * Math.cos(Math.PI / 2), y: 4 * Math.sin(Math.PI / 2), z: -1.5 },
      {
        x: 4 * Math.cos((5 * Math.PI) / 6),
        y: 4 * Math.sin((5 * Math.PI) / 6),
        z: 1,
      },
      {
        x: 4 * Math.cos((7 * Math.PI) / 6),
        y: 4 * Math.sin((7 * Math.PI) / 6),
        z: -1,
      },
      {
        x: 4 * Math.cos((3 * Math.PI) / 2),
        y: 4 * Math.sin((3 * Math.PI) / 2),
        z: 1.5,
      },
      {
        x: 4 * Math.cos((11 * Math.PI) / 6),
        y: 4 * Math.sin((11 * Math.PI) / 6),
        z: -1.5,
      },
    ];

    // Define node connections for optimized network structure
    const nodeConnections = [
      // Central hub to inner ring (star pattern)
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],

      // Inner ring circular connections
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 1],

      // Inner ring to outer ring (radial connections)
      [1, 7],
      [2, 8],
      [3, 9],
      [4, 10],
      [5, 11],
      [6, 12],

      // Outer ring partial connections (for visual balance)
      [7, 8],
      [9, 10],
      [11, 12],

      // Cross connections for network complexity
      [7, 10],
      [8, 11],
      [9, 12],
    ];

    // Define main nodes (will have different visual styling)
    const mainNodes = [0, 1, 3, 5]; // Central hub and key inner ring nodes

    // Create sphere nodes
    nodePositions.forEach((position, index) => {
      // Determine node size and type
      const isMainNode = mainNodes.includes(index);
      const radius = isMainNode ? 0.15 : 0.1; // Reduced node size
      const segments = isMainNode ? 32 : 24;

      // Create sphere geometry
      const sphereGeometry = new THREE.SphereGeometry(
        radius,
        segments,
        segments
      );

      // Create enhanced material with bright, glowing colors
      const hue = isMainNode ? 0.52 : 0.58; // Bright cyan to electric blue
      const saturation = 1.0; // Maximum saturation for vibrant colors
      const lightness = isMainNode ? 0.7 : 0.65; // Much brighter base colors

      // Create star-like glowing material
      const sphereMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(hue, saturation, lightness + 0.2), // Brighter base color
        transparent: true,
        opacity: isMainNode ? 0.8 : 0.6,
        blending: THREE.AdditiveBlending, // Creates glow effect
        side: THREE.DoubleSide,
      });

      // Create sphere mesh
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(position.x, position.y, position.z);

      // Create outer glow effect for star-like appearance
      const glowGeometry = new THREE.SphereGeometry(radius * 1.5, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(hue, 1.0, 0.8),
        transparent: true,
        opacity: isMainNode ? 0.3 : 0.2,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
      });
      const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
      glowSphere.position.copy(sphere.position);

      // Add both sphere and glow to the group
      networkGroup.add(glowSphere);
      sphere.userData.glowSphere = glowSphere; // Store reference for animation

      // Store animation data
      sphere.userData = {
        initialPosition: sphere.position.clone(),
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        floatSpeed: (Math.random() - 0.5) * 0.005,
        floatAmplitude: 0.05 + Math.random() * 0.1,
        baseScale: isMainNode ? 1.2 : 1.0,
        isHovered: false,
        isMainNode: isMainNode,
      };

      nodes.push(sphere);
      networkGroup.add(sphere);
    });

    // Create connections between nodes
    nodeConnections.forEach(([startIndex, endIndex]) => {
      if (nodes[startIndex] && nodes[endIndex]) {
        const startPos = nodes[startIndex].position;
        const endPos = nodes[endIndex].position;

        // Create line geometry
        const points = [startPos.clone(), endPos.clone()];

        // Create segmented line for progressive lighting effect
        const segments = 20; // Number of segments for smooth flow
        const lineSegments = [];

        for (let i = 0; i < segments; i++) {
          const t1 = i / segments;
          const t2 = (i + 1) / segments;

          const point1 = startPos.clone().lerp(endPos, t1);
          const point2 = startPos.clone().lerp(endPos, t2);

          const segmentGeometry = new THREE.BufferGeometry().setFromPoints([
            point1,
            point2,
          ]);
          const segmentMaterial = new THREE.LineBasicMaterial({
            color: new THREE.Color().setHSL(0.58, 0.8, 0.4), // Matching node color scheme
            transparent: true,
            opacity: 0.15,
            linewidth: 2,
          });

          const segment = new THREE.Line(segmentGeometry, segmentMaterial);
          segment.userData = {
            segmentIndex: i,
            totalSegments: segments,
            baseOpacity: 0.15,
            maxOpacity: 0.9,
            flowOffset: Math.random() * Math.PI * 2,
            flowSpeed: 1.2 + Math.random() * 0.8,
          };

          lineSegments.push(segment);
          networkGroup.add(segment);
        }

        // Store segment references
        connections.push(...lineSegments);
      }
    });

    // Store references for animation
    (networkGroup as ExtendedGroup).nodes = nodes;
    (networkGroup as ExtendedGroup).connections = connections;

    scene.add(networkGroup);

    camera.position.z = 8; // Moved camera further back to make model appear smaller

    sceneRef.current = scene;
    rendererRef.current = renderer;
    networkGroupRef.current = networkGroup;
    nodesRef.current = [];
    centralHubRef.current = null;

    // Raycaster for hover detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredSprite: THREE.Mesh | null = null;

    // Mouse hold interaction for network control
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isControlling = false;
    let isMouseDown = false;

    const handleMouseDown = (event: MouseEvent) => {
      if (event.button === 0) {
        // Left mouse button
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
      if (event.button === 0) {
        // Left mouse button
        isMouseDown = false;
        isControlling = false;
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Update mouse position for raycasting
      mouse.x = mouseX;
      mouse.y = mouseY;

      // Raycast for hover detection
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodes);

      // Reset previous hovered node
      if (hoveredSprite && hoveredSprite !== (intersects[0]?.object || null)) {
        hoveredSprite.userData.isHovered = false;
      }

      // Set new hovered node
      hoveredSprite = (intersects[0]?.object as THREE.Mesh) || null;
      if (hoveredSprite) {
        hoveredSprite.userData.isHovered = true;
      }

      if (isMouseDown && isControlling) {
        // Update target rotation while dragging with full 360-degree range
        targetRotationY = mouseX * Math.PI * 2; // Full 360-degree rotation
        targetRotationX = mouseY * Math.PI; // Increased range for X rotation
      }
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mousemove", handleMouseMove);

    // Also handle mouse leave to stop control
    const handleMouseLeave = () => {
      isMouseDown = false;
      isControlling = false;
    };

    container.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Animate each node (only when controlling or very subtle)
      nodes.forEach((node, index) => {
        const userData = node.userData;

        // Static position unless controlling
        node.position.copy(userData.initialPosition);

        if (isControlling) {
          // Gentle floating animation only when interacting
          const floatOffset =
            Math.sin(time * userData.floatSpeed * 2 + index) *
            userData.floatAmplitude *
            0.3;
          node.position.y += floatOffset;
        }

        // Scale effects with hover
        let pulseScale = 1 + Math.sin(time * 0.8 + index * 0.3) * 0.02;

        // Enhanced scale and pulsing when hovered
        if (userData.isHovered) {
          pulseScale = 1.4 + Math.sin(time * 5 + index * 0.5) * 0.15; // More dramatic pulsing

          // Color shift to brighter hue when hovered
          const hoverHue = userData.isMainNode ? 0.5 : 0.55;
          (node.material as THREE.MeshBasicMaterial).color.setHSL(hoverHue, 1.0, 0.9);

          // Update glow sphere color
          if (userData.glowSphere) {
            userData.glowSphere.material.color.setHSL(hoverHue, 1.0, 0.8);
            userData.glowSphere.material.opacity = userData.isMainNode
              ? 0.5
              : 0.3;
          }
        } else {
          // Reset to normal state
          const normalHue = userData.isMainNode ? 0.52 : 0.58;
          const normalSaturation = 1.0;
          const normalLightness = userData.isMainNode ? 0.9 : 0.85;

          (node.material as THREE.MeshBasicMaterial).color.setHSL(
            normalHue,
            normalSaturation,
            normalLightness
          );

          // Update glow sphere
          if (userData.glowSphere) {
            userData.glowSphere.material.color.setHSL(normalHue, 1.0, 0.8);
            userData.glowSphere.material.opacity = userData.isMainNode
              ? 0.3
              : 0.2;
          }
        }

        node.scale.setScalar(pulseScale);

        // Sync glow sphere position and scale
        if (userData.glowSphere) {
          userData.glowSphere.position.copy(node.position);
          userData.glowSphere.scale.setScalar(pulseScale * 0.8); // Slightly smaller scale for glow
        }

        // Star twinkle effect - random opacity variations
        const twinkleSpeed = userData.isMainNode ? 2.0 : 1.5;
        const twinkleIntensity = userData.isMainNode ? 0.3 : 0.2;
        const twinkle =
          Math.sin(time * twinkleSpeed + index * 2.5) * twinkleIntensity;

        // Opacity effects with hover and twinkle
        if (userData.isHovered) {
          if (node.material instanceof THREE.Material) {
            node.material.opacity = 1.0; // Full opacity when hovered
          }
          if (userData.glowSphere) {
            userData.glowSphere.material.opacity = userData.isMainNode
              ? 0.6
              : 0.4;
          }
        } else {
          const baseOpacity = userData.isMainNode ? 0.8 : 0.6;
          if (node.material instanceof THREE.Material) {
            node.material.opacity = baseOpacity + twinkle;
          }

          if (userData.glowSphere) {
            const glowOpacity = userData.isMainNode ? 0.3 : 0.2;
            userData.glowSphere.material.opacity = glowOpacity + twinkle * 0.5;
          }
        }
      });

      // Animate segmented connections with progressive lighting
      const connections = (networkGroup as ExtendedGroup).connections || [];
      connections.forEach((segment) => {
        const userData = segment.userData;
        if (userData.segmentIndex === undefined) return;

        // Calculate flow wave position
        const flowTime = time * userData.flowSpeed + userData.flowOffset;
        const wavePosition = (Math.sin(flowTime) + 1) * 0.5; // 0 to 1

        // Calculate distance from wave center to this segment
        const segmentPosition = userData.segmentIndex / userData.totalSegments;
        const waveWidth = 0.3; // Width of the bright wave
        const distanceFromWave = Math.abs(segmentPosition - wavePosition);

        // Calculate opacity based on distance from wave
        let opacity = userData.baseOpacity;
        if (distanceFromWave < waveWidth) {
          const intensity = 1 - distanceFromWave / waveWidth;
          opacity =
            userData.baseOpacity +
            (userData.maxOpacity - userData.baseOpacity) * intensity;
        }

if (segment.material instanceof THREE.LineBasicMaterial) {
  segment.material.opacity = opacity;
}

        // Color intensity follows the wave
        const colorIntensity = opacity / userData.maxOpacity;
if (segment.material instanceof THREE.LineBasicMaterial) {
  segment.material.color.setHSL(0.55, 0.8, 0.3 + colorIntensity * 0.4);
}
      });

      // Animate circle indicators for main nodes
      nodes.forEach((node, index) => {
        if (node.userData.circle) {
          const circle = node.userData.circle;
          circle.material.opacity = 0.4 + Math.sin(time * 2 + index) * 0.2;
          circle.rotation.z += 0.01;
          // Add subtle pulsing scale
          const pulseScale = 1 + Math.sin(time * 1.5 + index * 0.3) * 0.1;
          circle.scale.setScalar(pulseScale);
        }
      });

      // Animate floating particles
      if (floatingParticles) {
        floatingParticles.rotation.y += 0.001;
        floatingParticles.rotation.x += 0.0005;

        // Animate individual particle positions
        const positions = floatingParticles.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] += Math.sin(time * 0.5 + i * 0.01) * 0.002; // Gentle floating
        }
        floatingParticles.geometry.attributes.position.needsUpdate = true;
      }

      // Network stays still unless being controlled
      if (isControlling) {
        // Smoothly interpolate to target rotation when controlling
        const lerpFactor = 0.08;
        networkGroup.rotation.y +=
          (targetRotationY - networkGroup.rotation.y) * lerpFactor;
        networkGroup.rotation.x +=
          (targetRotationX - networkGroup.rotation.x) * lerpFactor;
      }
      // No auto-rotation - network stays static when not controlled

      // Update controls for smooth interaction
      controls.update();

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

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (container) {
        container.removeEventListener("mousedown", handleMouseDown);
        container.removeEventListener("mouseup", handleMouseUp);
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    // GSAP animations for text
    gsap.fromTo(
      ".hero-title",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.5 }
    );

    gsap.fromTo(
      ".hero-subtitle",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.8 }
    );

    gsap.fromTo(
      ".hero-cta",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1.1 }
    );
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden pt-16"
    >
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
              {t("hero.title")
                .split("\n")
                .map((line, index) => (
                  <React.Fragment key={index}>
                    {index === 0 ? (
                      line
                    ) : (
                      <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        {line}
                      </span>
                    )}
                    {index < t("hero.title").split("\n").length - 1 && <br />}
                  </React.Fragment>
                ))}
            </h1>

            <p className="hero-subtitle text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
              {t("hero.subtitle")}
            </p>

            <div className="hero-cta flex flex-col sm:flex-row gap-4 items-start">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0, 212, 255, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              >
                {t("hero.cta")}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300"
              >
                {t("hero.learn_more")}
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
            document
              .getElementById("services")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <div className="relative flex flex-col items-center justify-center">
            {/* First V */}
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0,
              }}
              className="text-cyan-400 text-2xl font-bold leading-none flex items-center justify-center"
              style={{ transform: "scaleX(2.0)" }}
            >
              ∨
            </motion.div>
            {/* Second V */}
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
              className="text-cyan-400 text-2xl font-bold leading-none -mt-3 flex items-center justify-center"
              style={{ transform: "scaleX(2.0)" }}
            >
              ∨
            </motion.div>
            {/* Third V */}
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
              className="text-cyan-400 text-2xl font-bold leading-none -mt-3 flex items-center justify-center"
              style={{ transform: "scaleX(2.0)" }}
            >
              ∨
            </motion.div>
            <div className="text-cyan-400 text-xs mt-2 font-medium tracking-wider text-center flex items-center justify-center">
              SCROLL
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
