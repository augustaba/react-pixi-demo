/*
 * @Author: Lemon
 * @Date: 2021-06-21 21:06:11
 * @LastEditors: Lemon
 * @LastEditTime: 2021-06-21 22:51:18
 * @FilePath: /react-pixi-my/webpack.dev.ts
 */
import commonConfig from './webpack.common';
import merge from 'webpack-merge'
import { HotModuleReplacementPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path'

const devConfig = merge(commonConfig, {
  devtool: 'eval-source-map',
  entry: {
    game: './src/index.tsx'
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: true,
      template: path.resolve(__dirname, './public/index.html'),
      filename: 'index.html',
      chunks: ['game'],
      inject: true
    }),
    new HotModuleReplacementPlugin()],
  mode: 'development',
  // @ts-ignore
  devServer: {
    port: 8088,
		contentBase: './dist',
		hot: true
  }
});

export default devConfig