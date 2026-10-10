import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  scrollProgress: number; // 0 to 1
  activeDomainIndex: number;
}

function LivingCyberFlora({ scrollProgress, activeDomainIndex }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const centralSporeRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // 3D camera/object response to scroll
      groupRef.current.rotation.y = scrollProgress * Math.PI * 2.5 + state.clock.elapsedTime * 0.15;
      groupRef.current.position.y = Math.sin(scrollProgress * Math.PI) * 0.8;
      groupRef.current.position.z = -1 + Math.cos(scrollProgress * Math.PI * 1.5) * 1.2;
    }

    if (centralSporeRef.current) {
      centralSporeRef.current.rotation.x += delta * 0.4;
      centralSporeRef.current.rotation.z += delta * 0.3;
    }

    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.4;
    if (ring2Ref.current) ring2Ref.current.rotation.x -= delta * 0.3;
    if (ring3Ref.current) ring3Ref.current.rotation.y += delta * 0.25;
  });

  // Color dynamics based on active domain
  const emeraldColors = ['#10b981', '#059669', '#34d399', '#047857', '#6ee7b7'];
  const activeColor = emeraldColors[activeDomainIndex % emeraldColors.length];

  return (
    <group ref={groupRef}>
      {/* Central Pulsing Spore */}
      <Float speed={3} rotationIntensity={1} floatIntensity={1.5}>
        <mesh ref={centralSporeRef} scale={1.8}>
          <icosahedronGeometry args={[1, 2]} />
          <MeshDistortMaterial
            color={activeColor}
            emissive="#064e3b"
            emissiveIntensity={1.2}
            distort={0.4 + scrollProgress * 0.3}
            speed={2.5}
            roughness={0.1}
            metalness={0.8}
            wireframe={activeDomainIndex % 2 === 1}
          />
        </mesh>
      </Float>

      {/* Dynamic Botanical Petal Halo */}
      {Array.from({ length: 14 }).map((_, i) => {
        const angle = (i / 14) * Math.PI * 2;
        const radius = 2.4 + Math.sin(scrollProgress * Math.PI + i) * 0.4;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * 0.5;
        const z = Math.sin(angle + scrollProgress * 3) * 0.8;

        return (
          <mesh
            key={i}
            position={[x, y, z]}
            rotation={[angle * 0.5, 0, angle]}
            scale={0.45}
          >
            <coneGeometry args={[0.3, 1, 5]} />
            <meshStandardMaterial
              color="#34d399"
              emissive="#047857"
              emissiveIntensity={0.8}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>
        );
      })}

      {/* Orbiting Laser-Gymnast Rings */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.4, 0.025, 16, 100]} />
        <meshStandardMaterial color="#34d399" emissive="#10b981" emissiveIntensity={1.5} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
        <torusGeometry args={[2.9, 0.02, 16, 100]} />
        <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={1.2} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[0, Math.PI / 4, Math.PI / 2]}>
        <torusGeometry args={[3.8, 0.015, 16, 100]} />
        <meshStandardMaterial color="#6ee7b7" emissive="#10b981" emissiveIntensity={1.0} />
      </mesh>
    </group>
  );
}

// 3D Spore Pollen Particles
function CyberPollenParticles({ scrollProgress }: { scrollProgress: number }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 500;

  const [positions, colors] = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c1 = new THREE.Color('#10b981');
    const c2 = new THREE.Color('#34d399');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18;

      const c = Math.random() > 0.4 ? c1 : c2;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.08 + scrollProgress * 0.02;
      pointsRef.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function BotanicalScrollCanvas({
  scrollProgress,
  activeDomainIndex,
}: SceneProps) {
  return (
    <div className="fixed inset-0 pointer-events-none -z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.8} color="#a7f3d0" />
        <pointLight position={[-10, -10, -5]} intensity={1.5} color="#10b981" />
        <pointLight position={[0, 6, 2]} intensity={1.0} color="#059669" />

        <LivingCyberFlora
          scrollProgress={scrollProgress}
          activeDomainIndex={activeDomainIndex}
        />
        <CyberPollenParticles scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
