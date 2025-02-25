import { type VRM, VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm'
import { useLoader } from '@react-three/fiber'
import {
  GLTFLoader,
  type GLTFLoaderPlugin,
  type GLTFParser,
} from 'three/examples/jsm/loaders/GLTFLoader.js'

export const useVRMloader = (assetUrl: string): VRM => {
  const vrm: VRM = useLoader(GLTFLoader, assetUrl, (loader) => {
    loader.register((parser: GLTFParser): GLTFLoaderPlugin => {
      return new VRMLoaderPlugin(parser)
    })
  }).userData.vrm

  VRMUtils.rotateVRM0(vrm)

  return vrm
}
