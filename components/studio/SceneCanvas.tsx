import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, GizmoHelper, GizmoViewport, PerspectiveCamera } from "@react-three/drei";
import { Room3D } from "./Room3D";
import { SceneObject } from "./types";

interface SceneCanvasProps {
  objects: SceneObject[];
  selectedId: string | null;
  onSelectObject: (id: string | null) => void;
  onUpdateObject: (id: string, updates: Partial<SceneObject>) => void;
  roomDimensions: { width: number; length: number; height: number };
}

export const SceneCanvas = ({ 
  objects, 
  selectedId, 
  onSelectObject, 
  onUpdateObject,
  roomDimensions 
}: SceneCanvasProps) => {
  return (
    <div className="w-full h-full bg-background">
      <Canvas shadows gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}>
        <PerspectiveCamera makeDefault position={[10, 10, 10]} fov={50} />
        <OrbitControls makeDefault enableDamping dampingFactor={0.05} />
        
        {/* Cinematic Lighting Setup - Movie Quality */}
        <ambientLight intensity={0.2} color="#ffffff" />
        
        {/* Main Key Light - Cinematic */}
        <directionalLight
          position={[10, 15, 5]}
          intensity={2.0}
          castShadow
          shadow-mapSize-width={8192}
          shadow-mapSize-height={8192}
          shadow-camera-far={100}
          shadow-camera-left={-30}
          shadow-camera-right={30}
          shadow-camera-top={30}
          shadow-camera-bottom={-30}
          shadow-bias={-0.0001}
          color="#fff5e6"
        />
        
        {/* Fill Light - Softer shadows */}
        <directionalLight
          position={[-8, 8, -8]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
          color="#e6f3ff"
        />
        
        {/* Accent/Rim Lights for depth */}
        <pointLight position={[15, 5, 15]} intensity={1.2} color="#00d4ff" distance={50} decay={2} />
        <pointLight position={[-15, 5, -15]} intensity={1.0} color="#ff6b35" distance={50} decay={2} />
        <pointLight position={[0, -3, 0]} intensity={0.5} color="#4a5568" distance={30} decay={2} />
        
        {/* Hemisphere for natural ambient lighting */}
        <hemisphereLight intensity={0.6} color="#87ceeb" groundColor="#8b7355" />
        
        {/* Spot lights for dramatic effect */}
        <spotLight
          position={[0, 20, 0]}
          angle={0.3}
          penumbra={0.5}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          color="#ffffff"
        />
        
        {/* Grid */}
        <Grid
          args={[50, 50]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#6b7280"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#3b82f6"
          fadeDistance={50}
          fadeStrength={1}
          infiniteGrid
        />
        
        {/* Room */}
        <Room3D dimensions={roomDimensions} />
        
        {/* Scene Objects */}
        {objects.map((obj) => (
          <mesh
            key={obj.id}
            position={[obj.position.x, obj.position.y, obj.position.z]}
            rotation={[obj.rotation.x, obj.rotation.y, obj.rotation.z]}
            scale={[obj.scale.x, obj.scale.y, obj.scale.z]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectObject(obj.id);
            }}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={obj.color}
              roughness={0.7}
              metalness={0.3}
            />
          </mesh>
        ))}
        
        {/* Gizmo Helper */}
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport 
            axisColors={["#ef4444", "#22c55e", "#3b82f6"]} 
            labelColor="white"
          />
        </GizmoHelper>
      </Canvas>
    </div>
  );
};
