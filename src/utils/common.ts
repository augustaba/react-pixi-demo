/*
 * @Author: Lemon
 * @Date: 2021-07-02 00:20:45
 * @LastEditors: Lemon
 * @LastEditTime: 2021-07-15 17:11:03
 * @FilePath: /react-pixi-my/src/utils/common.ts
 */

import { Rectangle, Texture } from "pixi.js";

export type EnvType = 'web' | 'mini';
export const env: EnvType =
  process.env.NODE_ENV === 'production' ? 'mini' : 'web';
  export const windowWidth =
  env === ('web' as EnvType)
    ? window.innerWidth
    : my.getSystemInfoSync().windowWidth;
export const windowHeight =
  env === ('web' as EnvType)
    ? window.innerHeight
    : my.getSystemInfoSync().windowHeight;

export const ratio = windowWidth / 750;

export const makeTextures = (texture, framesConfig) => {
  return framesConfig.map(
    ({ x, y, w, h }) => new Texture(texture, new Rectangle(x, y, w, h)),
  );
}
