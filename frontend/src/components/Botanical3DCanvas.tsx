import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 3D Cyber-Botanical Plant / Growth Spores
function BotanicalFlora({ activeIndex }: { activeIndex: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const centralSporeRef = useRef<THREE.Mesh>(null!);
  const leavesRef = useRef<THREE.Group>(null!);

  // Generate cyber-leaves arranged in a botanical Fibonacci spiral
  const petals = useMemo(() => {
    const list = [];
    const count = 18;
    for (let i = 0; i < count; i++) {
      const angle = i * 2.39996; // Golden angle
      const radius = 0.8 + (i / count) * 2.2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = -1.2 + (i / count) * 2.4;
      list.push({
        pos: [x, y, z] as [number, number, number],
        rot: [0.3 * Math.sin(i), angle, 0.4] as [number, number, number],
        scale: 0.35 + (i / count) * 0.45,
      });
    }
    return list;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
    if (centralSporeRef.current) {
      centralSporeRef.current.rotation.x += delta * 0.4;
      centralSporeRef.current.rotation.z += delta * 0.3;
    }
    if (leavesRef.current) {
      leavesRef.current.rotation.y -= delta * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Bio-Luminescent Spore Core */}
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh ref={centralSporeRef} scale={1.5}>
          <icosahedronGeometry args={[1, 2]} />
          <MeshDistortMaterial
            color="#10b981"
            emissive="#047857"
            emissiveIntensity={0.9}
            distort={0.45}
            speed={2.2}
            roughness={0.15}
            metalness={0.6}
            wireframe={activeIndex % 2 === 1}
          />
        </mesh>
      </Float>

      {/* Cyber Flora Petals / Foliage Nodes */}
      <group ref={leavesRef}>
        {petals.map((petal, i) => (
          <mesh
            key={i}
            position={petal.pos}
            rotation={petal.rot}
            scale={petal.scale}
          >
            <coneGeometry args={[0.3, 0.9, 5]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#10b981" : "#34d399"}
              emissive="#064e3b"
              emissiveIntensity={0.7}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* Orbiting Neon Botanical Rings */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.2, 0.02, 16, 100]} />
        <meshStandardMaterial color="#34d399" emissive="#10b981" emissiveIntensity={1.2} />
      </mesh>
      <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[2.8, 0.015, 16, 100]} />
        <meshStandardMaterial color="#059669" emissive="#059669" emissiveIntensity={0.9} />
      </mesh>
    </group>
  );
}

// Glowing Bio-Pollen & Spores floating in 3D Space
function BioPollenParticles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 400;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorA = new THREE.Color('#10b981');
    const colorB = new THREE.Color('#34d399');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;

      const c = Math.random() > 0.5 ? colorA : colorB;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

interface SceneProps {
  activeIndex?: number;
}

export default function Botanical3DCanvas({ activeIndex = 0 }: SceneProps) {
  return (
    <div className="absolute inset-0 pointer-events-none -z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#a7f3d0" />
        <pointLight position={[-10, -10, -5]} intensity={1.2} color="#10b981" />
        <pointLight position={[0, 5, 0]} intensity={0.8} color="#059669" />

        <BotanicalFlora activeIndex={activeIndex} />
        <BioPollenParticles />
      </Canvas>
    </div>
  );
}
