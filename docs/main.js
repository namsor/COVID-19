!function(e){function t(t){for(var o,i,c=t[0],a=t[1],l=t[2],h=0,u=[];h<c.length;h++)i=c[h],Object.prototype.hasOwnProperty.call(s,i)&&s[i]&&u.push(s[i][0]),s[i]=0;for(o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o]);for(d&&d(t);u.length;)u.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],o=!0,c=1;c<n.length;c++){var a=n[c];0!==s[a]&&(o=!1)}o&&(r.splice(t--,1),e=i(i.s=n[0]))}return e}var o={},s={0:0},r=[];function i(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=o,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var c=window.webpackJsonp=window.webpackJsonp||[],a=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var d=a;r.push([5,1]),n()}({4:function(e,t,n){},5:function(e,t,n){"use strict";n.r(t);n(4);var o=n(0);let r={distance:30,densityData:[],zoomState:null,zoomExtent:[1,8],screen:{},colors:{gradientA:o.rgb(64,64,64),gradientB:o.rgb(0,0,0),contours:o.rgb(216,169,21),keywords:o.rgb(256,256,256,.2),nodes:o.rgb(200,200,200)},style:{fontNodes:"normal 3pt Helvetica"},setVariables:()=>{r.linkExtent=[r.links.reduce((e,t)=>{const n=Object.entries(t.tokens);for(const[t,o]of n)return e<o?e:o},1/0),r.links.reduce((e,t)=>{const n=Object.entries(t.tokens);for(const[t,o]of n)return e>o?e:o},0)],r.keywordScale=o.scaleLinear().domain(r.linkExtent).range([r.zoomExtent[1]+1,r.zoomExtent[0]-5]),r.geoPath=o.geoPath().context(r.context)},setScreen:()=>{"devicePixelRatio"in window&&window.devicePixelRatio>1?r.screen.density=window.devicePixelRatio:r.screen.density=1,console.log("screen density:",r.screen.density),r.body=document.querySelector("body"),r.screen.width=r.body.clientWidth*r.screen.density,r.screen.height=r.body.clientHeight*r.screen.density,r.canvas=o.select("#visualization"),r.context=document.querySelector("#visualization").getContext("2d"),r.backgroud=o.select("#background"),r.bgContext=document.querySelector("#background").getContext("2d",{alpha:!1}),r.gradient=r.bgContext.createRadialGradient(r.screen.width/2,r.screen.height/2,0,r.screen.width/2,r.screen.height/2,r.screen.width/2)}};var i=n.p+"nodes.json",c=n.p+"links.json",a=n(3);const l=()=>{const e=o.extent(r.nodes,e=>Math.floor(e.x)),t=o.extent(r.nodes,e=>Math.floor(e.y)),n=e[1]-e[0],s=t[1]-t[0],i=e[0],c=t[0];r.densityData=o.contourDensity().x(e=>Math.floor(e.x)-i).y(e=>Math.floor(e.y)-c).weight(e=>{return t=e.tokens,Math.floor(Object.values(t).reduce((e,t)=>e+t));var t}).size([n,s]).cellSize(10).bandwidth(70).thresholds(30)(r.nodes),r.densityData.forEach(e=>e.coordinates=e.coordinates.map(e=>e.map(e=>e.map(e=>[Math.floor(e[0]+i),Math.floor(e[1]+c)]))))};var d=()=>{const e=s.zoomState.x*s.screen.density,t=s.zoomState.y*s.screen.density,n=s.zoomState.k;s.screen.width=s.body.clientWidth*s.screen.density,s.screen.height=s.body.clientHeight*s.screen.density,s.context.scale(s.screen.density,s.screen.density),s.canvas.style("width",`${s.body.clientWidth}px`).style("height",`${s.body.clientHeight}px`).attr("width",s.screen.width).attr("height",s.screen.height),s.backgroud.style("width",`${s.body.clientWidth}px`).style("height",`${s.body.clientHeight}px`).attr("width",s.screen.width).attr("height",s.screen.height),s.gradient.addColorStop(0,s.colors.gradientA),s.gradient.addColorStop(1,s.colors.gradientB),s.bgContext.fillStyle=s.gradient,s.bgContext.fillRect(0,0,s.screen.width,s.screen.height),s.context.save(),s.context.clearRect(0,0,s.screen.width,s.screen.height),s.context.translate(e,t),s.context.scale(n,n),l(),r.context.beginPath(),r.context.strokeStyle=r.colors.contours,r.densityData.forEach((e,t)=>{r.geoPath(e),r.context.lineWidth=.5}),r.context.stroke(),r.context.beginPath(),r.context.fillStyle=r.colors.nodes,r.context.font=r.style.fontNodes,r.context.textAlign="center",r.nodes.forEach(e=>{r.context.beginPath(),r.context.arc(e.x,e.y,1,0,2*Math.PI),r.context.fill()}),s.context.restore()};window.s=r,r.zoomState=o.zoomIdentity;var h=()=>{o.select("#searchField").on("input",(function(){const e=r.nodes.find(e=>(console.log(this),-1!==e.id.toLowerCase().indexOf(this.value.toLowerCase())));o.select("#searchResults").html(""),o.select("#searchResults").append("p").html(`Press the key 'enter'<br>to focus on ${e.id}`),console.log("matching",e),r.zoomTo=e})).on("keypress",(function(){if(32===o.event.keyCode||13===o.event.keyCode){const e=8,t=(r.screen.width/2-r.zoomTo.x*e)/r.screen.density,n=(r.screen.height/2-r.zoomTo.y*e)/r.screen.density;r.zoomState=o.zoomIdentity.translate(t,n).scale(e),r.canvas.transition().duration(2e3).call(r.zoom.transform,r.zoomState)}}))};window.d3=o,window.s=r,Promise.all([o.json(i),o.json(c)]).then(([e,t])=>{r.links=t,r.nodes=e,r.setScreen(),r.setVariables(),console.log("nodes",r.nodes.length),console.log("links",r.links.length),(()=>{const e=o.forceSimulation().force("charge",a.a().strength(-3).distanceMin(.1).distanceMax(1e4)).force("center",o.forceCenter(r.screen.width/2,r.screen.height/2)).force("link",o.forceLink().id(e=>e.id).strength(e=>.5*e.value));e.nodes(r.nodes),e.force("link").links(r.links);e.on("tick",d).on("end",()=>{r.end=!0,d()}),window.onresize=function(){d()},r.zoom=o.zoom().on("zoom",()=>{r.zoomState=o.event.transform,d()}),r.zoom.scaleExtent(r.zoomExtent),r.zoom.scaleTo(r.canvas,r.zoomExtent[0]),r.canvas.call(r.zoom)})(),r.canvas.on("mousemove",()=>{const e=r.zoomState.invertX(event.x)*r.screen.density,t=r.zoomState.invertY(event.y)*r.screen.density;for(let n=r.nodes.length-1;n>=0;--n){const s=r.nodes[n],i=e-s.x,c=t-s.y;if(i*i+c*c<400){const e=Object.entries(s.tokens).reduce((e,t)=>(e.length<30&&e.push(`${t[0]} (${t[1].toFixed(2)})`),e),[]);let t=`<h2><strong>${s.name}</strong></h2>`;t+=`<p>Number of papers: ${s.docs}</p>`,t+=`<p>Tokens:<br/>${e.join("<br/>")}</p>`,o.select("#focus").html(t)}}}),h()})}});