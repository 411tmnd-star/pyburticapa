const fs = require("fs");
const s = JSON.parse(fs.readFileSync("bassdata/bass_series.json", "utf8"));
for (const song of ["seyi", "detty"]) {
  const d = s[song]; const t = d.t, db = d.bassDb, fps = 43.0664;
  // bass-level peaks (local maxima of the raw bass band, 2 frames either side) and their offset to the nearest beat
  const peaks = [];
  for (let i = 2; i < db.length - 2; i++) {
    if (db[i] > db[i-1] && db[i] >= db[i+1] && db[i] > db[i-2] && db[i] >= db[i+2] && db[i] > -40) peaks.push(t[i]);
  }
  const offs = peaks.map(p => { let best = Infinity; for (const b of d.beats) if (Math.abs(p-b) < Math.abs(best)) best = p-b; return best; })
    .filter(o => Math.abs(o) < 0.25).map(o => o*1000).sort((a,b)=>a-b);
  const med = offs[Math.floor(offs.length/2)];
  const q = (x) => offs[Math.floor(offs.length*x)].toFixed(0);
  // beat-synchronous: for each beat, the time of the strongest bass within +-250 ms
  const per = d.beats.map(b => { let bi=-1, bv=-1e9; for (let i=0;i<t.length;i++){ if (Math.abs(t[i]-b)<=0.25 && db[i]>bv){bv=db[i]; bi=i;} } return (t[bi]-b)*1000; }).sort((a,b)=>a-b);
  console.log(song, "bass peaks near beats:", offs.length, "median", med.toFixed(0), "ms, IQR", q(0.25), "..", q(0.75), "ms");
  console.log(song, "strongest bass per beat (+-250 ms): median", per[Math.floor(per.length/2)].toFixed(0), "ms, IQR", per[Math.floor(per.length*0.25)].toFixed(0), "..", per[Math.floor(per.length*0.75)].toFixed(0), "ms");
}
