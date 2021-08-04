export default function(number = 0, action){
    if(action.type == 'addNumb'){
       // console.log("ACTION", action.numb)
        return action.numb
    } else {
        return number
    }
}