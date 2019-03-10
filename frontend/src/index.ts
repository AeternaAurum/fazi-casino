import './scss/main.scss';
import * as PIXI from 'pixi.js';

function helloName(name: string): void {
  PIXI.utils.sayHello(name);
}

helloName('TEST');
