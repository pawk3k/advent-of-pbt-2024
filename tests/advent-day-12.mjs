export default function(t,n,r){const s=Object.fromEntries([t,n,...r.map((e=>e.from)),...r.map((e=>e.to))].map((e=>[e,{distance:Number.POSITIVE_INFINITY,edges:[]}])));for(s[t]&&(s[t]={distance:0,edges:[]});;){const t=e(s);if(void 0===t)return;const o=s[t];if(t===n)return o.edges;delete s[t];for(const e of r)e.from===t&&s[e.to]&&(s[e.to]={distance:o.distance+e.distance,edges:[...o.edges,e]})}};function e(e){let t,n=Number.POSITIVE_INFINITY;for(const[r,{distance:s}]of Object.entries(e))s<n&&(t=r,n=s);return t}