/*
 * @Author: Lemon
 * @Date: 2021-06-21 19:10:05
 * @LastEditors: Lemon
 * @LastEditTime: 2021-07-02 00:39:03
 * @FilePath: /react-pixi-my/src/mini.tsx
 */
import * as PIXI from "@tbminiapp/pixi-miniprogram-engine";
import * as React from "react";

import { AppContext, render, Text } from '@augustaba/react-pixi-fiber';
import App from "./App";

// @ts-ignore
const { registerCanvas, devicePixelRatio } = PIXI.miniprogram

// @ts-ignore
const canvas = $global.canvas

// console.log(canvas, '888')

registerCanvas(canvas)

const contextType = 'webgl';

const context = canvas.getContext(contextType);

const app = new PIXI.Application({
  width: canvas.width / devicePixelRatio,
  height: canvas.height / devicePixelRatio,
  view: canvas,
  // @ts-ignore
  context: context,
  forceCanvas: false,
  resolution: devicePixelRatio,
  backgroundColor: 0xffbad6,
  antialias: true // 抗锯齿
});
render(<AppContext.Provider value={app}>
  <App />
</AppContext.Provider>, app.stage);