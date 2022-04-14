// resolve和reject也是两个函数
function add(a:number,b:number):Promise<number>{
	return new Promise((resolve,reject)=>{
		if(b%17===0){
			reject(`bad number',${b}`)
		}
		setTimeout(()=>{
			resolve(a+b)
		},2000)
	})
}

function mul(a:number,b:number):Promise<number>{
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{
			resolve(a*b)
		},3000)
	})
}

async function calc(){
	try{
		const [a,b]=await Promise.all([add(2,3),add(4,5)])
		return await mul(a,b)

	}catch(err){
		console.log('caught err ',err)
		return undefined
	}
}

calc().then(res=>{
	console.log(res)
})