import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

function CentralCore() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const outerRingRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.15;
      outerRingRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <group>
      {/* Central Pulsing Vault Sphere */}
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh ref={meshRef} scale={1.8}>
          <octahedronGeometry args={[1, 2]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.8}
            wireframe
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Inner Glowing Core */}
        <Sphere args={[0.9, 32, 32]}>
          <MeshDistortMaterial
            color="#06b6d4"
            emissive="#0891b2"
            emissiveIntensity={0.6}
            distort={0.4}
            speed={2}
            roughness={0.2}
          />
        </Sphere>
      </Float>

      {/* Orbiting Hologram Rings */}
      <group ref={outerRingRef}>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[3.2, 0.03, 16, 100]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.9} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
          <torusGeometry args={[2.7, 0.02, 16, 100]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.7} />
        </mesh>
        <mesh rotation={[0, Math.PI / 4, Math.PI / 2]}>
          <torusGeometry args={[3.6, 0.025, 16, 100]} />
          <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </group>
  );
}

function FloatingDataNodes() {
  const nodes = [
    { pos: [3.5, 1.2, -1], color: '#38bdf8' },
    { pos: [-3.2, -1.5, 0.5], color: '#10b981' },
    { pos: [2.2, -2.4, -0.8], color: '#f59e0b' },
    { pos: [-2.6, 2.2, -1.2], color: '#ec4899' },
    { pos: [0, 3.2, 0.5], color: '#8b5cf6' },
  ];

  return (
    <>
      {nodes.map((node, i) => (
        <Float key={i} speed={1.5 + i * 0.3} rotationIntensity={1} floatIntensity={1.5}>
          <mesh position={node.pos as [number, number, number]}>
            <dodecahedronGeometry args={[0.25, 0]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.9}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none -z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#06b6d4" />

        <Stars radius={50} depth={50} count={2500} factor={4} saturation={0} fade speed={1.5} />
        <CentralCore />
        <FloatingDataNodes />
      </Canvas>
    </div>
  );
}
