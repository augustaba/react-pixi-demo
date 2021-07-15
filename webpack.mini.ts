/*
 * @Author: Lemon
 * @Date: 2021-06-30 20:35:04
 * @LastEditors: Lemon
 * @LastEditTime: 2021-07-02 00:43:42
 * @FilePath: /react-pixi-my/webpack.mini.ts
 */
import merge from "webpack-merge";
import commonConfig from "./webpack.common";

export default merge(commonConfig, {
  mode: 'production',
  entry: {
    game: './src/mini.tsx'
  },
  resolve: {
    alias: {
      '@augustaba/react-pixi-fiber$': '@augustaba/react-pixi-fiber/react-pixi-mini',
      'pixi.js$': '@tbminiapp/pixi-miniprogram-engine'
    }
  },
})