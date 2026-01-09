import{c as n,r as a,j as e,m as r,X as p}from"./app-Dr-qe37l.js";import{A as u}from"./index-Bm14vWMG.js";/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],o=n("circle-alert",y);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],b=n("circle-check-big",f),k=({message:l,type:i="success",duration:s=3e3,onClose:t})=>{const[m,c]=a.useState(!0);a.useEffect(()=>{const h=setTimeout(()=>{c(!1),setTimeout(t,300)},s);return()=>clearTimeout(h)},[s,t]);const x={success:"bg-emerald-500",error:"bg-brand-red",info:"bg-blue-500"},d={success:e.jsx(b,{size:20}),error:e.jsx(o,{size:20}),info:e.jsx(o,{size:20})};return e.jsx(u,{children:m&&e.jsxs(r.div,{initial:{opacity:0,y:50,scale:.9},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,scale:.9,transition:{duration:.2}},className:`fixed bottom-8 right-8 z-100 flex items-center gap-4 px-6 py-4 rounded-2xl text-white shadow-2xl ${x[i]}`,children:[e.jsxs("div",{className:"flex items-center gap-3",children:[d[i],e.jsx("span",{className:"font-bold tracking-tight",children:l})]}),e.jsx("button",{onClick:()=>{c(!1),setTimeout(t,300)},className:"hover:scale-110 transition-transform opacity-70 hover:opacity-100",children:e.jsx(p,{size:18})}),e.jsx(r.div,{initial:{width:"100%"},animate:{width:"0%"},transition:{duration:s/1e3,ease:"linear"},className:"absolute bottom-0 left-0 h-1 bg-white/20"})]})})};export{o as C,k as T};
