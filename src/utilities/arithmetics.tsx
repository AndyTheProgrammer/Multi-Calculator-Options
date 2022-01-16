export function addNumbers(num_1:any, num_2:any){
    const a = parseFloat(num_1)
    const b = parseFloat(num_2)

    return (a + b)
}

export function subtractNumbers(num_1:any, num_2:any){
    const a = parseFloat(num_1)
    const b = parseFloat(num_2)

    return (a - b)
}

export function findGreatest(num_1:any, num_2:any){
    const a = parseFloat(num_1)
    const b = parseFloat(num_2)

    if(a > b)
        return a
    else
        return b
}

export function findModulus(num_1:any, num_2:any){
    const a = parseFloat(num_1)
    const b = parseFloat(num_2)
    if(a > b){
        var ans = a % b;
        return ans
    }
    else{
        var ans = b % a;
        return ans
    }
}

export function findQuotient(num_1:any, num_2:any){
    const a = Math.abs(parseFloat(num_1))
    const b = Math.abs(parseFloat(num_2))
    if(a > b){
        var ans = a / b;
        return Math.floor(ans)
    }
    else{
        var ans = b / a;
        return Math.floor(ans)
    }
}

export function findProduct(num_1:any, num_2:any){
    const a = parseFloat(num_1)
    const b = parseFloat(num_2)

    return (a * b)
}

export function findGreatestCommonDiviser(num_1:any, num_2:any){
    var a = parseFloat(num_1)
    var b = parseFloat(num_2)
    a = Math.abs(a);
    b = Math.abs(b);

    while(b) {
        var t:number = b;
        b = a % b;
        a = t;
    }
    console.log("GSD ", a)
    return a;
        
}

export const decimalCount = (num:any) => {
    // Convert to String
    const numStr = String(num);
    // String Contains Decimal
    if (numStr.includes('.')) {
       return numStr.split('.')[1].length;
    };
    // String Does Not Contain Decimal
    return 0;
 }
