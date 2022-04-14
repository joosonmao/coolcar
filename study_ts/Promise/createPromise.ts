function add(a:number,b:number,callback:(res:number)=>void):void{
	setTimeout(()=>{
		callback(a+b)
	},2000)
}

// 如果要连加就要回调套回调
// 这样就产生了callback hell
// 层层嵌套才能连加
add(2,4,res=>{
	console.log('2+4:',res)
	add(res,4,res=>{
		console.log('2+3+4',res)
	})
})

//所以就有了promise
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

add(2,3).then(res=>{
	console.log('2+3',res)
	return mul(res,4)
}).then(res=>{
	console.log('(2+3)*4',res)
	return add(res,5)
}).then(res=>{
	console.log('final result',res)
}).catch(err=>{
	console.log('caught error',err)
})

add(2,3).then(res=>{
	console.log('2+3',res)
	return add(res,4)
}).then(res=>{
	console.log('2+3+4',res)
	return add(res,5)
}).then(res=>{
	console.log('2+3+4+5',res)
	return add(res,6)
}).catch(err=>{
	console.log('caught error',err)
})

// 如果不打印log，简便的做法
add(2,3)
.then(res=>add(res,4))
.then(res=>add(res,5))
.then(res=>{
	console.log('final result',res)
})

// （２＋３）×（４＋５）
// ａｌｌ是一起都做
Promise.all([add(2,3),add(4,5)]).then(res=>{
// 小技巧可以写成下面的
// Promise.all([add(2,3),add(4,5)]).then(([a,b])=>{
	const [a,b]=res
	console.log(a,b)
	return mul(a,b)
}).then(res=>{
	console.log("final result",res)
})

//race是看谁先做完
Promise.race([add(2,3),add(4,5)]).then(res=>{
	console.log(res)
})