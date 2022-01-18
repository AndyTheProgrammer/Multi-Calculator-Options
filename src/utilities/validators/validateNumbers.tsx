//returns false if value is zero or not a valide number

export default function validateNumbers(val:Array<any>){
    var isNumber = false
    for(var i = 0; i < val.length; i++){
        var num = parseFloat(val[i])
        // console.log("This num ",num)
        if(!isNaN(num) && num !== 0){
            isNumber = true
            // console.log("IS A NUMBER **********************")   
        }else{
            // console.log("IS NOT A NUMBER ********************") 
            return false
            
        }
    }
    // console.log("final result ",isNumber)
    return isNumber
}

export function decimalValidator(input:any){
    let regex = /^[-+]?[0-9]+\.[0-9]+$/;
    return (regex.test(input));
}