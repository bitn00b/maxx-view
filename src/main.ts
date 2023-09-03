import './app.css'
import App from './App.svelte'

  (window as any).global = window;
if (global === undefined) {
   var global = window;
}

window.process = {
  ...window.process,
};

const app = new App({
  target: document.getElementById('app'),
})

export default app
