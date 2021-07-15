/*
 * @Author: Lemon
 * @Date: 2021-07-01 22:57:46
 * @LastEditors: Lemon
 * @LastEditTime: 2021-07-15 15:56:21
 * @FilePath: /react-pixi-my/src/pureComponents/WithLoading/index.tsx
 */
import { useResource } from '@/utils/hooks'
import { Container, usePixiApp } from '@augustaba/react-pixi-fiber'
import React, { useEffect, useState } from 'react'

export interface WidthLoadingProps {
  resources: {name: string, url: string}[]
}

function WidthLoading(props: WidthLoadingProps) {
  return (WrapperComponent) => (_props) => {
    const { isLoaded, progress } = useResource(props.resources)
    console.log(progress, isLoaded)
    return <>{
      isLoaded ? <WrapperComponent {..._props}>{_props.children}</WrapperComponent> : <Container></Container>
    }</>
  }
}
export default WidthLoading