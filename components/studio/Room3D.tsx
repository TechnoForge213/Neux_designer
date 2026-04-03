interface Room3DProps {
  dimensions: { width: number; length: number; height: number };
}

export const Room3D = ({ dimensions }: Room3DProps) => {
  const { width, length, height } = dimensions;
  
  return (
    <group>
      {/* Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color="#e5e7eb" roughness={0.8} metalness={0.2} />
      </mesh>
      
      {/* Back Wall */}
      <mesh
        position={[0, height / 2, -length / 2]}
        receiveShadow
      >
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color="#f3f4f6" roughness={0.9} side={2} />
      </mesh>
      
      {/* Left Wall */}
      <mesh
        position={[-width / 2, height / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[length, height]} />
        <meshStandardMaterial color="#f3f4f6" roughness={0.9} side={2} />
      </mesh>
      
      {/* Right Wall */}
      <mesh
        position={[width / 2, height / 2, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[length, height]} />
        <meshStandardMaterial color="#f3f4f6" roughness={0.9} side={2} />
      </mesh>
    </group>
  );
};
