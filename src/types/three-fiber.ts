import { ThreeElements } from '@react-three/fiber';
import { SpringValue } from '@react-spring/three';
import { Vector3, Color, Euler, Mesh, Object3D, BufferGeometry, Material } from 'three';

export type ThreeVector = [number, number, number] | Vector3;
export type MeshProps = ThreeElements['mesh'];
export type AnimatedMeshElement = Object3D & {
  geometry: BufferGeometry;
  material: Material;
};

export interface AnimatedMeshProps {
  color: string;
  hovered: boolean;
  spring: {
    position: SpringValue<ThreeVector>;
    rotation: SpringValue<ThreeVector>;
  };
  onHover: (hovered: boolean) => void;
}

export interface SpringProps {
  position: SpringValue<ThreeVector>;
  rotation: SpringValue<ThreeVector>;
}

export interface MaterialProps {
  color: string;
  roughness: number;
  metalness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  emissive: Color;
  emissiveIntensity: number;
}

type EulerOrder = 'XYZ' | 'YZX' | 'ZXY' | 'XZY' | 'YXZ' | 'ZYX';

export interface AnimatedMeshRefProps extends MeshProps {
  position?: ThreeVector;
  rotation?: Euler | [x: number, y: number, z: number, order?: EulerOrder];
}
