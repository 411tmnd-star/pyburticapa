const fs=require('fs'); const dir=process.argv[2]; const list=JSON.parse(fs.readFileSync(process.argv[3],'utf8'));
(async()=>{
  const lock=JSON.parse(fs.readFileSync(dir+'/package-lock.json','utf8').replace(/^\uFEFF/,''));
  const added=[];
  for(const {Name,Version} of list){
    const r=await fetch(`https://registry.npmjs.org/${Name}/${Version}`);
    if(!r.ok) throw new Error(`registry ${Name}@${Version}: ${r.status}`);
    const m=await r.json();
    const key='node_modules/'+Name;
    lock.packages[key]={version:m.version, resolved:m.dist.tarball, integrity:m.dist.integrity, optional:true, os:m.os, cpu:m.cpu, license:m.license, engines:m.engines, _reconstructed:'platform-filtered optional package; metadata from npm registry'};
    added.push(Name+'@'+m.version+' '+m.dist.integrity.slice(0,20));
  }
  fs.writeFileSync(dir+'/package-lock.json', JSON.stringify(lock,null,2)+'\n');
  console.log('added '+added.length+' reconstructed entries'); console.log(added.slice(0,3).join('\n'));
})().catch(e=>{console.error(e.message); process.exit(1)});