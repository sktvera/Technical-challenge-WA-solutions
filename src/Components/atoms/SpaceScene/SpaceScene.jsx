/**
 * @author Julian David Vera Godoy
 * @description Animacion 3d Planeta
 * @date 2025-05-08
 */

//Librerias______
import React, { useRef, useEffect, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, useGLTF, useAnimations } from '@react-three/drei';
import test from './assets/spaceship.glb';

const RotatingStars = memo(() => {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02; 
    }
  });

  return (
    <Stars
      ref={ref}
      radius={100}
      depth={50}
      count={3000}  // Reducido para mejor rendimiento
      factor={3}    // Menos denso
      saturation={0}
      fade
      speed={0.5}   // Menos velocidad para suavidad
    />
  );
});

function RocketModel() {
  const ref = useRef();
  const { scene, animations } = useGLTF(test);
  const { actions } = useAnimations(animations, ref);

  // Efecto para manejar la animación y rotación
  useEffect(() => {
    if (actions['Take 001']) {
      actions['Take 001'].play();
    }
  }, [actions]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.5;  
      ref.current.position.y = Math.sin(Date.now() * 0.001) * 0.3;  
    }
  });

  return (
    <primitive
      object={scene}
      ref={ref}
      position={[0, 0, -2]} 
      scale={6.5}          
    />
  );
}

const SpaceScene = () => {
  return (
    <Canvas
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,          
        pointerEvents: 'none' 
      }}
      camera={{ position: [0, -2, 5], fov: 60 }}
      gl={{ antialias: true, alpha: true }}  
    >
      <ambientLight intensity={0.3} />  // Menor intensidad para ambiente
      <directionalLight position={[5, 5, 5]} intensity={0.7} />
      <RotatingStars />
      <RocketModel />
    </Canvas>
  );
};

export default memo(SpaceScene);