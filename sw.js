if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const f=e=>i(e,t),l={module:{uri:t},exports:o,require:f};s[t]=Promise.all(n.map((e=>l[e]||f(e)))).then((e=>(r(...e),o)))}}define(["./workbox-7cfec069"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-KbNs48eM.css",revision:null},{url:"assets/index-Syaf2YHW.js",revision:null},{url:"assets/offset.worker-xWByoXh0.js",revision:null},{url:"assets/timer.worker-KZHSadG8.js",revision:null},{url:"index.html",revision:"fadd653d162fdf5846dbda0c09dc45bf"},{url:"registerSW.js",revision:"31ff30c53ffefe95e3926c186d339b98"},{url:"manifest-icon-192.maskable.png",revision:"0b07fb2446158a859071ecd7f806aa2a"},{url:"manifest-icon-512.maskable.png",revision:"58c9376f65413493ac173e184e42f7e4"},{url:"manifest.webmanifest",revision:"b90df93a53fc7410234aaa0c7ceb5620"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
