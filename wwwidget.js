!function(){const t=document.createElement("div");t.id="wwworkshop-widget";const o=function(){const t=document.getElementsByTagName("script");return Array.prototype.map.call(t,(t=>({src:t.src,color:t.dataset.color||"#000",type:t.dataset.linkType}))).filter((t=>t.src.includes("wwwidget.js")))[0]}(),e=`<svg xmlns="http://www.w3.org/2000/svg" fill="${o.color}" viewBox="0 0 19 30"><style>path{transition:opacity 300ms ease-in-out;}g{pointer-events: bounding-box;}g:hover path{opacity:1;}</style><g><path opacity=".1" d="M3.1 17.1l1.5 1.4-1.5 1.4 7.1 7.1 5.7-5.6-1.5-1.5 1.5-1.4 2.8 2.9-8.5 8.4-9.9-9.9z"/><path d="M.3 8.6l9.9 9.9 8.5-8.5L8.8.2.3 8.6zm2.8 0L8.8 3l7.1 7.1-5.7 5.7-7.1-7.2z"/><path opacity=".5" d="M3.1 11.5l1.5 1.4-1.5 1.4 7.1 7.1 5.7-5.7-1.5-1.4 1.5-1.4 2.8 2.8-8.5 8.5-9.9-9.9z"/></g></svg>`,n=`\n    <a title="WWWorkshop.org" href="https://wwworkshop.org#${function(){let t="random";return"next"===o.type&&(t=`${window.location.host}${window.location.pathname}`),t}()}" style="position:absolute;width:100%;height:100%">${e}</a>\n  `;t.style.cssText="position:fixed; z-index:2147483647; width:19px; height:30px; bottom:20px; right:20px;",t.innerHTML=n,document.body.appendChild(t)}();