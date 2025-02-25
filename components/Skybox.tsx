import { Sphere } from '@react-three/drei'
import { Gradient, LayerMaterial } from 'lamina'
import * as THREE from 'three'

export const Skybox = () => {
  return (
    <>
      <Sphere scale={[500, 500, 500]}>
        <LayerMaterial color={'#ffffff'} side={THREE.BackSide}>
          <Gradient axes={'x'} colorA="#579f90" colorB="#383838" />
        </LayerMaterial>
      </Sphere>
    </>
  )
}
