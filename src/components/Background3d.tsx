import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Points } from "three";

function Snowflakes() {
  const snowflakesRef = useRef<Points>(null);
  const particleCount = 50;

  // Create positions and additional attributes for snowflakes
  const positions = new Float32Array(particleCount * 3);
  const rotations = new Float32Array(particleCount);
  const speeds = new Float32Array(particleCount);
  const sizes = new Float32Array(particleCount);

  // Initialize snowflakes with random positions and attributes
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30; // x
    positions[i * 3 + 1] = Math.random() * 20; // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15; // z

    rotations[i] = Math.random() * Math.PI * 2;
    speeds[i] = 0.02 + Math.random() * 0.03;
    sizes[i] = 0.1 + Math.random() * 0.2;
  }

  useFrame(({ clock }) => {
    if (!snowflakesRef.current) return;

    const currentPositions = snowflakesRef.current.geometry.attributes.position
      .array as Float32Array;
    const time = clock.getElapsedTime();

    for (let i = 0; i < particleCount; i++) {
      // Update y position (falling)
      currentPositions[i * 3 + 1] -= speeds[i];

      // Add gentle swaying motion
      currentPositions[i * 3] += Math.sin(time + rotations[i]) * 0.01;

      // Reset position when snowflake falls below view
      if (currentPositions[i * 3 + 1] < -10) {
        currentPositions[i * 3] = (Math.random() - 0.5) * 30;
        currentPositions[i * 3 + 1] = 20;
        currentPositions[i * 3 + 2] = (Math.random() - 0.5) * 15;
      }
    }

    snowflakesRef.current.geometry.attributes.position.needsUpdate = true;
    snowflakesRef.current.rotation.y = time * 0.05;
  });

  return (
    <points ref={snowflakesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 h-screen w-full" style={{ zIndex: -1 }}>
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        style={{ height: "100vh", background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <Snowflakes />
      </Canvas>
    </div>
  );
}
