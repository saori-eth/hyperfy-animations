import * as THREE from 'three'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'
import { VRMHumanBoneName, type VRM } from '@pixiv/three-vrm'

/**
 * Reset a VRM model to its initial T-pose state
 * @param {VRM} vrm The VRM model to reset
 */
export const resetVRM = (vrm: VRM) => {
  if (!vrm.humanoid) return

  // Reset all humanoid bones to their initial rotation
  Object.values(VRMHumanBoneName).forEach((boneName) => {
    const bone = vrm.humanoid?.getNormalizedBoneNode(boneName)
    if (bone) {
      bone.quaternion.set(0, 0, 0, 1) // Reset to identity quaternion
      bone.position.set(0, 0, 0) // Reset position
      bone.updateMatrix()
    }
  })

  // Update VRM after resetting bones
  vrm.update(0) // Pass deltaTime of 0 since we're just resetting
}

/**
 * Load Mixamo animation, convert for three-vrm use, and return it.
 *
 * @param {string} url A url of mixamo animation data
 * @param {VRM} vrm A target VRM
 * @returns {Promise<THREE.AnimationClip>} The converted AnimationClip
 */

export const loadAnim = async (url: string, vrm: VRM) => {
  const loader = new FBXLoader() // A loader which loads FBX
  return loader.loadAsync(url).then((asset) => {
    const clip = THREE.AnimationClip.findByName(asset.animations, 'mixamo.com') // extract the AnimationClip

    const tracks: THREE.KeyframeTrack[] = [] // KeyframeTracks compatible with VRM will be added here

    const restRotationInverse = new THREE.Quaternion()
    const parentRestWorldRotation = new THREE.Quaternion()
    const _quatA = new THREE.Quaternion()
    const _vec3 = new THREE.Vector3()

    // Adjust with reference to hips height.
    const motionHipsHeight = asset.getObjectByName('mixamorigHips')?.position.y
    const vrmHipsY = vrm.humanoid
      ?.getNormalizedBoneNode('hips')
      ?.getWorldPosition(_vec3).y
    const vrmRootY = vrm.scene.getWorldPosition(_vec3).y
    if (!vrmHipsY || !motionHipsHeight)
      return console.error('Failed to load animation')
    const vrmHipsHeight = Math.abs(vrmHipsY - vrmRootY)
    const hipsPositionScale = vrmHipsHeight / motionHipsHeight

    clip.tracks.forEach((track) => {
      // Convert each tracks for VRM use, and push to `tracks`
      const trackSplitted = track.name.split('.')
      const mixamoRigName = trackSplitted[0]

      const vrmBoneName =
        mixamoVRMRigMap[mixamoRigName as keyof typeof mixamoVRMRigMap]
      const vrmNodeName = vrm.humanoid?.getNormalizedBoneNode(
        vrmBoneName as VRMHumanBoneName
      )?.name
      const mixamoRigNode = asset.getObjectByName(mixamoRigName)

      if (vrmNodeName != null) {
        const propertyName = trackSplitted[1]

        // Store rotations of rest-pose.
        mixamoRigNode?.getWorldQuaternion(restRotationInverse).invert()
        mixamoRigNode?.parent?.getWorldQuaternion(parentRestWorldRotation)

        if (track instanceof THREE.QuaternionKeyframeTrack) {
          // Retarget rotation of mixamoRig to NormalizedBone.
          for (let i = 0; i < track.values.length; i += 4) {
            const flatQuaternion = track.values.slice(i, i + 4)

            _quatA.fromArray(flatQuaternion)

            // 親のレスト時ワールド回転 * トラックの回転 * レスト時ワールド回転の逆
            _quatA
              .premultiply(parentRestWorldRotation)
              .multiply(restRotationInverse)

            _quatA.toArray(flatQuaternion)

            flatQuaternion.forEach((v, index) => {
              track.values[index + i] = v
            })
          }

          tracks.push(
            new THREE.QuaternionKeyframeTrack(
              `${vrmNodeName}.${propertyName}`,
              track.times,
              track.values.map((v, i) =>
                vrm.meta?.metaVersion === '0' && i % 2 === 0 ? -v : v
              )
            )
          )
        } else if (track instanceof THREE.VectorKeyframeTrack) {
          const value = track.values.map(
            (v, i) =>
              (vrm.meta?.metaVersion === '0' && i % 3 !== 1 ? -v : v) *
              hipsPositionScale
          )
          tracks.push(
            new THREE.VectorKeyframeTrack(
              `${vrmNodeName}.${propertyName}`,
              track.times,
              value
            )
          )
        }
      }
    })

    return new THREE.AnimationClip('vrmAnimation', clip.duration, tracks)
  })
}

/**
 * A map from Mixamo rig name to VRM Humanoid bone name
 */
export const mixamoVRMRigMap = {
  mixamorigHips: 'hips',
  mixamorigSpine: 'spine',
  mixamorigSpine1: 'chest',
  mixamorigSpine2: 'upperChest',
  mixamorigNeck: 'neck',
  mixamorigHead: 'head',
  mixamorigLeftShoulder: 'leftShoulder',
  mixamorigLeftArm: 'leftUpperArm',
  mixamorigLeftForeArm: 'leftLowerArm',
  mixamorigLeftHand: 'leftHand',
  mixamorigLeftHandThumb1: 'leftThumbMetacarpal',
  mixamorigLeftHandThumb2: 'leftThumbProximal',
  mixamorigLeftHandThumb3: 'leftThumbDistal',
  mixamorigLeftHandIndex1: 'leftIndexProximal',
  mixamorigLeftHandIndex2: 'leftIndexIntermediate',
  mixamorigLeftHandIndex3: 'leftIndexDistal',
  mixamorigLeftHandMiddle1: 'leftMiddleProximal',
  mixamorigLeftHandMiddle2: 'leftMiddleIntermediate',
  mixamorigLeftHandMiddle3: 'leftMiddleDistal',
  mixamorigLeftHandRing1: 'leftRingProximal',
  mixamorigLeftHandRing2: 'leftRingIntermediate',
  mixamorigLeftHandRing3: 'leftRingDistal',
  mixamorigLeftHandPinky1: 'leftLittleProximal',
  mixamorigLeftHandPinky2: 'leftLittleIntermediate',
  mixamorigLeftHandPinky3: 'leftLittleDistal',
  mixamorigRightShoulder: 'rightShoulder',
  mixamorigRightArm: 'rightUpperArm',
  mixamorigRightForeArm: 'rightLowerArm',
  mixamorigRightHand: 'rightHand',
  mixamorigRightHandPinky1: 'rightLittleProximal',
  mixamorigRightHandPinky2: 'rightLittleIntermediate',
  mixamorigRightHandPinky3: 'rightLittleDistal',
  mixamorigRightHandRing1: 'rightRingProximal',
  mixamorigRightHandRing2: 'rightRingIntermediate',
  mixamorigRightHandRing3: 'rightRingDistal',
  mixamorigRightHandMiddle1: 'rightMiddleProximal',
  mixamorigRightHandMiddle2: 'rightMiddleIntermediate',
  mixamorigRightHandMiddle3: 'rightMiddleDistal',
  mixamorigRightHandIndex1: 'rightIndexProximal',
  mixamorigRightHandIndex2: 'rightIndexIntermediate',
  mixamorigRightHandIndex3: 'rightIndexDistal',
  mixamorigRightHandThumb1: 'rightThumbMetacarpal',
  mixamorigRightHandThumb2: 'rightThumbProximal',
  mixamorigRightHandThumb3: 'rightThumbDistal',
  mixamorigLeftUpLeg: 'leftUpperLeg',
  mixamorigLeftLeg: 'leftLowerLeg',
  mixamorigLeftFoot: 'leftFoot',
  mixamorigLeftToeBase: 'leftToes',
  mixamorigRightUpLeg: 'rightUpperLeg',
  mixamorigRightLeg: 'rightLowerLeg',
  mixamorigRightFoot: 'rightFoot',
  mixamorigRightToeBase: 'rightToes',
}
