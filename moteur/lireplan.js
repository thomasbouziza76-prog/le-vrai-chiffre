// node lireplan.js plan.js → JSON (phrases, ancres, format) sans les fonctions
const fs=require('fs'); const src=fs.readFileSync(process.argv[2],'utf8');
const PLAN=new Function(src+';return PLAN;')();
console.log(JSON.stringify({phrases:PLAN.phrases,ancres:PLAN.ancres||{},format:PLAN.format||'court',cartons:PLAN.cartons||[],scenes:PLAN.scenes.map(s=>{const o={};for(const k in s) if(typeof s[k]!=='function') o[k]=s[k];return o;}),abonne:PLAN.abonne,question:PLAN.question,source:PLAN.source,persos:PLAN.persos,musique:PLAN.musique}));
