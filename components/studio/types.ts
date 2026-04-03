export interface SceneObject {
  id: string;
  name: string;
  type: 'furniture' | 'wall' | 'floor' | 'custom';
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
  color: string;
  visible: boolean;
  locked: boolean;
}

export interface Layer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  objects: string[];
}
