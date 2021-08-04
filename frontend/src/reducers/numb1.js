export default function(number = 0, action){
    if(action.type == 'addNumbRecipe'){
        console.log("ACTION", action.numbX)
        return action.numbX
    } else {
        return number
    }
}