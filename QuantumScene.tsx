
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Environment } from '@react-three/drei';
import * as THREE from 'three';

const HarmoniousOrb = ({ position, color, scale = 1, speed = 1, distort = 0.4 }: { position: [number, number, number]; color: string; scale?: number, speed?: number, distort?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * (speed * 0.5) + position[0]) * 0.3;
      ref.current.rotation.x = t * 0.2;
      ref.current.rotation.z = t * 0.1;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 64, 64]} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        envMapIntensity={0.5}
        clearcoat={0.5}
        metalness={0.2}
        roughness={0.3}
        distort={distort}
        speed={speed}
      />
    </Sphere>
  );
};

const ConnectionRing = () => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
       const t = state.clock.getElapsedTime();
       ref.current.rotation.z = t * 0.05;
       ref.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.1) * 0.1;
    }
  });

  return (
    <Torus ref={ref} args={[4, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
      {React.createElement('meshStandardMaterial', { color: "#E91E63", transparent: true, opacity: 0.2 })}
    </Torus>
  );
}

export const BuddyHeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        {React.createElement('ambientLight', { intensity: 1 })}
        {React.createElement('pointLight', { position: [10, 10, 10], intensity: 2, color: "#E91E63" })}
        {React.createElement('pointLight', { position: [-10, -10, 5], intensity: 1.5, color: "#00AEEF" })}
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
          {/* Tělo - Modrá Náhoda */}
          <HarmoniousOrb position={[-2, 1, 0]} color="#00AEEF" scale={1.1} speed={1.5} distort={0.5} />
          {/* Mysl - Fialová Náhoda */}
          <HarmoniousOrb position={[2, 1.5, -1]} color="#673AB7" scale={0.9} speed={1.2} distort={0.3} />
          {/* Srdce - Růžová Náhoda */}
          <HarmoniousOrb position={[0, -1.5, 0]} color="#E91E63" scale={1.3} speed={0.8} distort={0.6} />
          
          <ConnectionRing />
        </Float>

        <Environment preset="studio" />
      </Canvas>
    </div>
  );
};