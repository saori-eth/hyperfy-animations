import { CameraControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"

interface CameraProps {
  position?: [number, number, number]
  target?: [number, number, number]
}

export const Camera = ({ target = [0, 0.5, 0], position = [0, 0.5, 2.5] }: CameraProps) => {
  const camControls = useRef<CameraControls | null>(null)

  useEffect(() => {
    if (camControls.current) {
      camControls.current.setPosition(position[0], position[1], position[2])
    }
  }, [])

  useFrame(() => {
    if (camControls.current) {
      camControls.current.setTarget(target[0], target[1], target[2])
    }
  })

  return <CameraControls ref={camControls} />
}