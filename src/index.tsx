
import { Application, TextStyle } from 'pixi.js';
import React from 'react';
import { Text, render, AppContext } from '@augustaba/react-pixi-fiber'
import App from './App';

// Setup PIXI app

const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  forceCanvas: false,
  backgroundColor: 0x10bb99,
  resolution: 1,
  view: document.getElementById('canvas') as HTMLCanvasElement,
});

// Use the custom renderer to render a valid PIXI object into a PIXI container.
render(<AppContext.Provider value={app}>
  <App />
</AppContext.Provider>, app.stage);