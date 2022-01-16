function findModulus(num_1, num_2){
    const a = parseInt(num_1)
    const b = parseInt(num_2)
    if(a > b){
        var ans = a % b;
        return ans
    }
    else{
        var ans = b % a;
        return ans
    }
}

export default findModulus