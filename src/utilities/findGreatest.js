function findGreatest(num_1, num_2){
    const a = parseInt(num_1)
    const b = parseInt(num_2)

    if(a > b)
        return a
    else
        return b
}

export default findGreatest