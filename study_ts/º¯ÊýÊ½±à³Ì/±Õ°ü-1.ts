function loggingComparer(
    logger:(a:number,b:number)=>void,
    comp:(a:number,b:number)=>number){
    return (a:number,b:number)=>{
        logger(a,b)
        return comp(a,b)
    }
}

function createComparer(p:{smallerFirst:boolean}){
    if(p.smallerFirst){
        return (a:number,b:number)=>a-b
    }else{
        return (a:number,b:number)=>b-a
    }
}
function processArray(a:number[]){
    let compCount=0
    const logger=(a:number,b:number)=>{
        console.log('comparing',a,b)
        compCount++
    }
    const comp=createComparer({smallerFirst:false})
    a.sort(loggingComparer(logger,comp))
    return compCount
}
let a = [ 5.2,32,11,55,2,6,7,44,9,0,33]
console.log(processArray(a))
console.log(processArray(a))