import { Configuration } from "webpack";
import path from 'path'
import WebpackBar from "webpackbar";
import { CleanWebpackPlugin } from "clean-webpack-plugin"
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'


const commonConfig: Configuration = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    fallback: {
			path: false,
      url: false
		},
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        // 开启缓存
        options: { cacheDirectory: true },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new WebpackBar({
      name: 'react-typescript-boilerplate',
      // react 蓝
      color: '#61dafb',
    }),
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        memoryLimit: 1024,
        configFile: path.resolve(__dirname, './tsconfig.json')
      }
    })
  ]

}

export default commonConfig