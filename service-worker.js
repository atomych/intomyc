if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,o)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let r={};const c=e=>n(e,t),l={module:{uri:t},exports:r,require:c};i[t]=Promise.all(s.map((e=>l[e]||c(e)))).then((e=>(o(...e),r)))}}define(["./workbox-5b385ed2"],(function(e){"use strict";e.setCacheNameDetails({prefix:"intomyc"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/intomyc/css/app.2725f60e.css",revision:null},{url:"/intomyc/index.html",revision:"e2835e0e9c7245533c53e182702917d6"},{url:"/intomyc/js/app.fc5ee0a7.js",revision:null},{url:"/intomyc/js/chunk-vendors.af1fd890.js",revision:null},{url:"/intomyc/manifest.json",revision:"0ab7f15ecf8eb850176ab574607ef898"},{url:"/intomyc/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map