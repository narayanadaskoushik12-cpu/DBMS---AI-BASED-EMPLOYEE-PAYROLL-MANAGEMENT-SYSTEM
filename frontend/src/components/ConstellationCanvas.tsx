import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { DimensionItem } from '../data/dimensionsData';

interface NodeProps {
  dim: DimensionItem;
  position: [number, number, number];
  isSelected: boolean;
  onSelect: (dim: DimensionItem) => void;
}

function OrbitingNode({ dim, position, isSelected, onSelect }: NodeProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <group position={position}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(dim);
          }}
          scale={isSelected ? 1.4 : 0.85}
        >
          <sphereGeometry args={[0.35, 24, 24]} />
          <meshStandardMaterial
            color={dim.color}
            emissive={dim.color}
            emissiveIntensity={isSelected ? 1.4 : 0.6}
            roughness={0.2}
            metalness={0.8}
            wireframe={!isSelected}
          />
        </mesh>

        {/* Orbit Node 3D Label */}
        <Html
          position={[0, 0.55, 0]}
          center
          distanceFactor={12}
          style={{ pointerEvents: 'none' }}
        >
          <div
            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap backdrop-blur-md transition-all duration-300 border ${
              isSelected
                ? 'bg-sky-500/90 text-white border-sky-300 shadow-lg shadow-sky-500/50 scale-110'
                : 'bg-slate-900/80 text-slate-300 border-white/10 hover:border-sky-400/50'
            }`}
          >
            #{dim.id} {dim.name}
          </div>
        </Html>
      </Float>
    </group>
  );
}

interface ConstellationProps {
  dimensions: DimensionItem[];
  selectedDim: DimensionItem | null;
  onSelectDim: (dim: DimensionItem) => void;
}

export default function ConstellationCanvas({
  dimensions,
  selectedDim,
  onSelectDim,
}: ConstellationProps) {
  // Distribute dimensions on a 3D Fibonacci sphere
  const radius = 5.2;
  const nodes = dimensions.map((dim, i) => {
    const phi = Math.acos(-1 + (2 * i) / dimensions.length);
    const theta = Math.sqrt(dimensions.length * Math.PI) * phi;
    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);
    return { dim, pos: [x, y, z] as [number, number, number] };
  });

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 11], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[12, 12, 12]} intensity={1.5} color="#38bdf8" />
        <pointLight position={[-12, -12, -12]} intensity={0.9} color="#a855f7" />

        <OrbitControls
          enableZoom={true}
          maxDistance={18}
          minDistance={5}
          autoRotate={true}
          autoRotateSpeed={0.5}
          enablePan={false}
        />

        {/* Central Core Hologram */}
        <mesh scale={1.2}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.5}
            wireframe
          />
        </mesh>

        {/* 45 Dimension Orbit Nodes */}
        {nodes.map(({ dim, pos }) => (
          <OrbitingNode
            key={dim.id}
            dim={dim}
            position={pos}
            isSelected={selectedDim?.id === dim.id}
            onSelect={onSelectDim}
          />
        ))}
      </Canvas>
    </div>
  );
}
