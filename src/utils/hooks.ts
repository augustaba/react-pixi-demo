/*
 * @Author: Lemon
 * @Date: 2021-07-15 15:39:35
 * @LastEditors: Lemon
 * @LastEditTime: 2021-07-15 16:04:21
 * @FilePath: /react-pixi-my/src/utils/hooks.ts
 */

import { usePixiApp } from "@augustaba/react-pixi-fiber"
import { useState, useEffect } from "react"

export function useResource(resource) {
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const { loader } = usePixiApp()
  useEffect(() => {
    console.log('change')
    loader.add(resource)
    loader.load()
    loader.onProgress.add(() => {
      setProgress(loader.progress)
    })
    loader.onComplete.once(() => {
      setIsLoaded(true)
      loader.onProgress.detachAll()
    })
    return () => {
      console.log('78c')
      loader.onProgress.detachAll()
      loader.onComplete.detachAll()
    }
  }, [resource])
  return { progress, isLoaded }
}