/**
 * GearEnvironment Component
 * HDRI environment + lighting setup for the 3D gear scene.
 * Lights must be OUTSIDE <Environment>, not inside it.
 */

import { Environment } from '@react-three/drei';
import { LIGHTING } from '@/lib/constants';

export default function GearEnvironment() {
  return (
    <Environment
      files={LIGHTING.HDRI_PATH}
      background={false}
    />
  );
}
