// write a func so this func is used to set value for curr user = arrow fun with prop data

//t's a function that returns an action object.
export const setCurrentUser =(data) =>{
    return{
        type:'FETCH_CURRENT_USER',
        payload:data
    }
}