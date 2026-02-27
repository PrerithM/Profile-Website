/**
 * GearModel Component
 * Loads a GLB model, memoizes the clone, offsets the scene so its
 * bounding-box center sits exactly at (0,0,0) of the parent group,
 * and applies semi-liquid MeshPhysicalMaterial.
 *
 * The centering is the key: when the parent spinRef rotates around its
 * local Y-axis, the gear spins on its own visual centre — not on some
 * arbitrary world-space point.
 */

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { MeshPhysicalMaterial } from "three";

interface GearModelProps {
  modelPath: string;
  materialProps?: Record<string, unknown>;
}

export default function GearModel({
  modelPath,
  materialProps = {},
}: GearModelProps) {
  const { scene } = useGLTF(modelPath);

  // ── Build a centred, material-overridden clone exactly once ───────────────
  const { centeredScene, offset } = useMemo(() => {
    const cloned = scene.clone(true);

    // 1. Find the geometric center in the cloned scene's local space
    const box = new THREE.Box3().setFromObject(cloned);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // 2. Apply materials and smooth geometry
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        // Force smooth normals for a premium look
        mesh.geometry.computeVertexNormals();

        const mat = new MeshPhysicalMaterial({
          color:               new THREE.Color(materialProps.color as string ?? "#c8c8d8"),
          roughness:           (materialProps.roughness           as number) ?? 0.03,
          transmission:        (materialProps.transmission        as number) ?? 1,
          thickness:           (materialProps.thickness           as number) ?? 1.5,
          ior:                 (materialProps.ior                 as number) ?? 1.45,
          opacity:             0, // starts invisible — AnimatedGear dissolves it in
          clearcoat:           (materialProps.clearcoat           as number) ?? 1,
          clearcoatRoughness:  (materialProps.clearcoatRoughness  as number) ?? 0.03,
          envMapIntensity:     (materialProps.envMapIntensity     as number) ?? 1.5,
          transparent: true,
          metalness: 0,
        });
        mesh.material = mat;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });

    return { centeredScene: cloned, offset: center };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, materialProps]);

  // Render the scene offset so its bounding-box centre lands at (0,0,0)
  // in the parent group's local space → parent rotation.y spins on own axis.
  return (
    <primitive
      object={centeredScene}
      position={[-offset.x, -offset.y, -offset.z]}
    />
  );
}
