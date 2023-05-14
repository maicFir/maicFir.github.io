import{a2 as ht,_ as ct,f as lt,I as dt,R as pt,a0 as ft,o as ut,c as wt}from"./app.13e035d0.js";var _t=Object.defineProperty,Y=Object.getOwnPropertySymbols,vt=Object.prototype.hasOwnProperty,gt=Object.prototype.propertyIsEnumerable,U=(i,t,e)=>t in i?_t(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e,R=(i,t)=>{for(var e in t||(t={}))vt.call(t,e)&&U(i,e,t[e]);if(Y)for(var e of Y(t))gt.call(t,e)&&U(i,e,t[e]);return i},Q=(i,t,e)=>{if(!t.has(i))throw TypeError("Cannot "+e)},n=(i,t,e)=>(Q(i,t,"read from private field"),e?e.call(i):t.get(i)),I=(i,t,e)=>{if(t.has(i))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(i):t.set(i,e)},E=(i,t,e,s)=>(Q(i,t,"write to private field"),s?s.call(i,e):t.set(i,e),e),c,P,u,w;const Mt=2147483647,S=class{constructor(i,t,e,s=!0){I(this,c,void 0),I(this,P,void 0),E(this,c,{width:0,height:0});const{el:r,ctx:o}=S.initCanvas(i);this.el=r,this.ctx=o,E(this,P,s),this.size={width:t||window.innerWidth,height:e||window.innerHeight}}get size(){return R({},n(this,c))}set size({width:i,height:t}){var e;if(n(this,c).width===i&&n(this,c).height===t)return;n(this,c).width=i,n(this,c).height=t;const s=(e=n(this,P)?window.devicePixelRatio:1)!=null?e:1;this.el.width=Math.round(n(this,c).width*s),this.el.height=Math.round(n(this,c).height*s),this.el.style.width=n(this,c).width+"px",this.el.style.height=n(this,c).height+"px",n(this,P)&&this.ctx.scale(s,s)}clear(){S.clearCanvas(this.ctx,R({},n(this,c)))}to(i){i.ctx.drawImage(this.el,0,0,n(this,c).width,n(this,c).height)}handleResize(i){this.size={width:window.innerWidth,height:window.innerHeight}}static setCanvasStyle(i,t,e){const s=i.style,{zIndex:r=0,opacity:o=1}=t;s.position="fixed",s.top="0",s.left="0",s.zIndex=r.toString(),s.width=(e?e.width:i.width).toString()+"px",s.height=(e?e.height:i.height).toString()+"px",o!==1&&(s.opacity=o.toString()),s.pointerEvents="none"}static initCanvas(i){i||(i=document.createElement("canvas"));const t=i.getContext("2d");return{el:i,ctx:t}}static createOffscreenCanvas(){return new S}static clearCanvas(i,t){const{width:e,height:s}=t;i.clearRect(0,0,e,s)}};let F=S;c=new WeakMap;P=new WeakMap;class mt{constructor(t,e,s,r=!0,o=!0,C={zIndex:0,opacity:1}){I(this,u,void 0),I(this,w,void 0),E(this,u,new F(t,e,s,r)),F.setCanvasStyle(n(this,u).el,C,{width:e,height:s}),E(this,w,o?new F(void 0,e,s,r):null)}get size(){return n(this,u).size}draw(t){var e;const s=(e=n(this,w))!=null?e:n(this,u);s.clear(),t(s.ctx,R({},s.size))}render(){!n(this,w)||(n(this,u).clear(),n(this,w).to(n(this,u)))}handleResize(t){n(this,u).handleResize(t),n(this,w)&&n(this,w).handleResize(t)}clear(){n(this,u).clear(),n(this,w)&&n(this,w).clear()}}u=new WeakMap;w=new WeakMap;var H=(i,t,e)=>{if(!t.has(i))throw TypeError("Cannot "+e)},f=(i,t,e)=>(H(i,t,"read from private field"),e?e.call(i):t.get(i)),kt=(i,t,e)=>{if(t.has(i))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(i):t.set(i,e)},yt=(i,t,e,s)=>(H(i,t,"write to private field"),s?s.call(i,e):t.set(i,e),e),d;class Ct{constructor(){kt(this,d,void 0),yt(this,d,new Map)}add(t,e){var s;f(this,d).has(t)||f(this,d).set(t,new Set),(s=f(this,d).get(t))==null||s.add(e)}start(t){if(f(this,d).has(t))for(const e of f(this,d).get(t))window.addEventListener(t,e)}stop(t){if(f(this,d).has(t))for(const e of f(this,d).get(t))window.removeEventListener(t,e)}startAll(){for(const t of f(this,d).keys())this.start(t)}stopAll(){for(const t of f(this,d).keys())this.stop(t)}clear(){f(this,d).clear()}}d=new WeakMap;function Pt(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}function Z(i){return!!i.touches}class p{static randomFloat(t,e){return Math.random()*(e-t)+t}static randomInt(t,e){return Math.floor(p.randomFloat(t,e))}static choice(t){const e=t.length,s=Math.floor(e*Math.random());return t[s]}static color(t="0123456789ABCDEF"){return"#"+p.choice(t)+p.choice(t)+p.choice(t)+p.choice(t)+p.choice(t)+p.choice(t)}}function Wt(i,{leftColor:t="#fff",rightColor:e="#444",leftBgColor:s="#35495e",rightBgColor:r="#00ffc0"}={}){console.log(`%c ${i} %c v0.3.3 a117dec %c`,`background: ${s}; padding: 2px; color: ${t}; font-weight: bold; text-transform: uppercase;`,`background: ${r}; padding: 2px; color: ${e}; font-weight: bold; text-transform: uppercase;`,"background: transparent")}var xt=Object.defineProperty,J=Object.getOwnPropertySymbols,zt=Object.prototype.hasOwnProperty,St=Object.prototype.propertyIsEnumerable,K=(i,t,e)=>t in i?xt(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e,b=(i,t)=>{for(var e in t||(t={}))zt.call(t,e)&&K(i,e,t[e]);if(J)for(var e of J(t))St.call(t,e)&&K(i,e,t[e]);return i},G=(i,t,e)=>{if(!t.has(i))throw TypeError("Cannot "+e)},a=(i,t,e)=>(G(i,t,"read from private field"),e?e.call(i):t.get(i)),h=(i,t,e)=>{if(t.has(i))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(i):t.set(i,e)},l=(i,t,e,s)=>(G(i,t,"write to private field"),s?s.call(i,e):t.set(i,e),e),$t=(i,t,e,s)=>({set _(r){l(i,t,r,e)},get _(){return a(i,t,s)}}),k=(i,t,e)=>(G(i,t,"access private method"),e),W,x,z,v,g,O,T,A,M,m,y,$,_,D,j,V,tt,B,X,N,et,q,it,L,st;class at{constructor(t,e,s,r,o){h(this,W,void 0),h(this,x,void 0),h(this,z,void 0),this.size=s,this.color=r,l(this,z,0),l(this,W,o),l(this,x,e),this.position=b({},t)}move(){this.position.x=Math.sin(a(this,W))*a(this,x)+this.position.x,this.position.y=Math.cos(a(this,W))*a(this,x)+this.position.y+a(this,z)*.3,$t(this,z)._++}shouleRemove(t){return this.position.x<0||this.position.x>t.width||this.position.y>t.height}}W=new WeakMap;x=new WeakMap;z=new WeakMap;class It extends at{draw(t,e){t.fillStyle=this.color,t.beginPath(),t.arc(this.position.x,this.position.y,this.size,0,Math.PI*2),t.fill()}}class Et extends at{constructor(t,e,s,r,o){super(t,e,s,r,o),h(this,v,0)}draw(t,e){t.fillStyle=this.color,t.beginPath();const s=this.size*2,r=this.size;for(let o=0;o<5;o++)t.lineTo(Math.cos((18+72*o-a(this,v))/180*Math.PI)*s+this.position.x,-Math.sin((18+72*o-a(this,v))/180*Math.PI)*s+this.position.y),t.lineTo(Math.cos((54+72*o-a(this,v))/180*Math.PI)*r+this.position.x,-Math.sin((54+72*o-a(this,v))/180*Math.PI)*r+this.position.y);t.fill(),l(this,v,a(this,v)+5)}}v=new WeakMap;class nt{static create(t,e,s,r,o,C){const ot=this.shapeMap.get(t);return new ot(e,s,r,o,C)}}nt.shapeMap=new Map([["star",Et],["circle",It]]);class Ot{constructor(t,e,s,r){h(this,g,void 0),this.stopped=!1,l(this,g,new Set);for(let o=0;o<r;o++){const C=nt.create(t,e,p.randomFloat(1,6),s,p.color("89ABCDEF"),p.randomFloat(Math.PI-1,Math.PI+1));a(this,g).add(C)}}move(t){for(const e of a(this,g)){if(e.shouleRemove(t)){a(this,g).delete(e);continue}e.move()}a(this,g).size===0&&(this.stopped=!0)}draw(t,e){for(const s of a(this,g))s.draw(t,e)}}g=new WeakMap;var rt=(i=>(i.Star="star",i.Circle="circle",i))(rt||{});class Tt{constructor({shape:t="star",size:e=2,numParticles:s=10}={},r={}){h(this,D),h(this,V),h(this,B),h(this,N),h(this,q),h(this,L),h(this,O,void 0),h(this,T,void 0),h(this,A,void 0),h(this,M,null),h(this,m,new Set),h(this,y,!1),h(this,$,void 0),h(this,_,new Ct),l(this,O,t),l(this,T,e),l(this,A,s),l(this,$,r),this.animate=this.animate.bind(this)}mount(t){l(this,M,new mt(t,window.innerWidth,window.innerHeight,!0,!0,a(this,$))),k(this,D,j).call(this),Wt("Theme Popper \u{1F389}",{leftBgColor:"#ffb366"})}unmount(){k(this,V,tt).call(this),l(this,y,!1)}animate(){if(l(this,y,!0),a(this,m).size===0){l(this,y,!1),a(this,M).clear();return}requestAnimationFrame(this.animate);for(const t of a(this,m)){if(t.stopped){a(this,m).delete(t);return}t.move(a(this,M).size)}a(this,M).draw((t,e)=>{for(const s of a(this,m))s.draw(t,e)}),a(this,M).render()}}O=new WeakMap;T=new WeakMap;A=new WeakMap;M=new WeakMap;m=new WeakMap;y=new WeakMap;$=new WeakMap;_=new WeakMap;D=new WeakSet;j=function(){Pt()?a(this,_).add("touchstart",k(this,B,X).bind(this)):a(this,_).add("mousedown",k(this,B,X).bind(this)),a(this,_).add("visibilitychange",k(this,q,it).bind(this)),a(this,_).add("resize",ht(k(this,N,et).bind(this),500)),a(this,_).startAll()};V=new WeakSet;tt=function(){a(this,_).stopAll(),a(this,_).clear()};B=new WeakSet;X=function(i){const t={x:Z(i)?i.touches[0].clientX:i.clientX,y:Z(i)?i.touches[0].clientY:i.clientY},e=new Ot(a(this,O),b({},t),a(this,T),a(this,A));a(this,m).add(e),a(this,y)||k(this,L,st).call(this)};N=new WeakSet;et=function(i){a(this,M).handleResize(i)};q=new WeakSet;it=function(i){a(this,m).clear(),l(this,y,!1)};L=new WeakSet;st=function(){requestAnimationFrame(this.animate)};const At=new WeakMap,Bt=lt({name:"Spakler",setup(i,t){const e={shape:rt.Star,size:1.75,numParticles:10},s={opacity:1,zIndex:Mt},r=dt(null),o=new Tt(e,s);return pt(()=>{}),ft(()=>{o.unmount(At.get(r.value))}),{}}}),Ft={id:"canvas"};function Rt(i,t,e,s,r,o){return ut(),wt("canvas",Ft)}var Xt=ct(Bt,[["render",Rt],["__file","Index.vue"]]);export{Xt as default};