/*
 * @Author: Lemon
 * @Date: 2021-06-21 22:47:39
 * @LastEditors: Lemon
 * @LastEditTime: 2021-06-30 20:39:46
 * @FilePath: /react-pixi-my/webpack.prod.ts
 */

import merge from "webpack-merge";
import commonConfig from "./webpack.common";

export default merge(commonConfig, {
  mode: 'production'
})