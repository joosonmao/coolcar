// 当有第三方的包很好，我们想利用，但参数数量不匹配，这时候就可以用闭包来实现

// 以下是一个技巧
// 手里有一个双参数的函数，如何去部分应用，先给你一个参数做成一个单参数的函数，然后
// 再给到一个需要单参数的环境中
const a = [ 5.2,32,11,55,2,6,7,44,9,0,33]
function isGoodNumber(goodFactor:number,v:number){
    return v%goodFactor===0
}
function filterArray(a:number[],f:(v:number)=>boolean){
    return a.filter(f)
}

// console.log(a.filter((v)=>v%2===0))
// config
const GOOD_FACTOR=2
console.log(filterArray(a,(v)=>isGoodNumber(GOOD_FACTOR,v)))

// 从下面这个函数理解部分应用
// 函数先给第一个参数a，返回一个单参数的函数，参数是我们要的第2个参数
// partialApply里的第一个函数参数里的参数a和后面第二个参数a并没有什么关系
// a并没有在{}里定义，所以是一个自由变量
function partialApply(f:(a:number,b:number)=>boolean,
	a:number){
	return (b:number){
		return f(a,b)//b是普通变量，a是自由变量
	}
}

console.log(filterArray(a,partialApply(isGoodNumber,GOOD_FACTOR)))
