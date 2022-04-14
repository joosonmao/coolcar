let sum=0;
[1,2,3,4].forEach(v=>{
	sum+=v*v
})
console.log(sum);
const b=[1,2,3,4].map(v=>v*v)
const s=b.reduce((s,v)=>s+v)
console.log(s)