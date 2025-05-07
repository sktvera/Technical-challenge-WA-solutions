/**
 * @author Julian David Vera Godoy
 * @description Animacion 3d astronauta___
 * @date 2025-05-08
 */


//librerias_____
import React, { useRef, useEffect, memo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import styled from 'styled-components';
//assets_____
import astronaut from './assets/astronaut_redux_animated.glb';

const SpaceHeaderWrapper = styled.div`
  position: absolute;
  right: 10px;
  bottom: 5px;
  width: 250px;
  height: 250px;
  z-index: 10;
  pointer-events: none;
`;

const Astronaut = memo(() => {
  const group = useRef();
  const { scene, animations } = useGLTF(astronaut);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions['Jazz Dance 1']) {
      actions['Jazz Dance 1'].play();
    }
    return () => {
      // Detener animación al desmontar
      if (actions['Jazz Dance 1']) actions['Jazz Dance 1'].stop();
    };
  }, [actions]);

  return (
    <group ref={group} position={[1, -2.5, 3]} scale={[1.8, 1.8, 1.8]}>
      <primitive object={scene} />
    </group>
  );
});

const OptimizedCanvas = memo(() => (
  <Canvas
    style={{
      width: '100%',
      height: '100%',
      background: 'transparent',
      position: 'relative',
      top: '70px',
    }}
    camera={{ position: [0, 0, 7], fov: 78 }}
    gl={{ antialias: true, powerPreference: 'high-performance' }} // Mejora el rendimiento gráfico
  >
    <ambientLight intensity={0.8} color="#ffffff" />
    <directionalLight position={[0, 5, 5]} intensity={1} color="#ffffff" />
    <pointLight position={[0, -5, 5]} intensity={0.8} color="#00f7ff" />
    <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    <Suspense fallback={null}>
      <Astronaut />
    </Suspense>
  </Canvas>
));

export default function SpaceHeader() {
  return (
    <SpaceHeaderWrapper>
      <OptimizedCanvas />
    </SpaceHeaderWrapper>
  );
}