const fs=require('fs');
const b=JSON.parse(fs.readFileSync(process.argv[2],'utf8').replace(/^\uFEFF/,'')).packages;
const a=JSON.parse(fs.readFileSync(process.argv[3],'utf8').replace(/^\uFEFF/,'')).packages;
let changed=[],removed=[],same=0;
for(const k of Object.keys(b)){ if(!(k in a)){removed.push(k);continue} if(k!=='' && b[k].version!==a[k].version) changed.push(k+' '+b[k].version+'->'+a[k].version); else if(k!=='') same++; if(k!=='' && b[k].integrity!==a[k].integrity) changed.push('INTEGRITY '+k); }
const added=Object.keys(a).filter(k=>!(k in b));
console.log('pre-existing unchanged:',same,' changed:',changed.length,' removed:',removed.length);
changed.forEach(x=>console.log('  CHANGED',x)); removed.forEach(x=>console.log('  REMOVED',x));
console.log('added:'); added.forEach(k=>console.log('  +',k,a[k].version));