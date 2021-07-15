/*
 * @Author: Lemon
 * @Date: 2021-07-15 15:34:21
 * @LastEditors: Lemon
 * @LastEditTime: 2021-07-15 19:44:19
 * @FilePath: /react-pixi-my/src/BusinessComponent/Loading/LoadingBar/index.tsx
 */
import AnimatedSprite from '@/PureComponents/AnimatedSprite'
import { makeTextures, ratio } from '@/utils/common'
import { Container, Sprite, usePixiApp } from '@augustaba/react-pixi-fiber'
import React from 'react'
import { LoadingIceCubeFrameConfig } from './util'

export interface LoadingBarProps {

}

const LoadingBar:React.FC<LoadingBarProps> = props => {
  const { loader: { resources } } = usePixiApp()
  return <Container>
    <Sprite width={471*ratio} height={35*ratio} texture={resources.loadingBarBg.texture}></Sprite>
    <Container width={50*ratio} height={50*ratio}>
      <AnimatedSprite loop={true} isPlaying={true} textures={makeTextures(resources.loadingIceCube.texture, LoadingIceCubeFrameConfig)} width={50} height={50}/>
    </Container>
  </Container>
}
export default LoadingBar