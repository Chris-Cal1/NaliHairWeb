export default function(token = '', action){
    if(action.type == 'addToken'){
        console.log(action.token, "AcTION =====>>")
        return action.token
    } else {
        return token
    }
}
