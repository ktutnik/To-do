import {AsyncStorage} from 'react-native'

export async function storeToken(token:string){
    try{
        console.log('storing:'+token)
        await AsyncStorage.setItem('token','Bearer '+token)
    } catch(eror){
        console.log(eror)
    }
}
export async function getToken():Promise<String>{
    try{
        return await AsyncStorage.getItem('token')
    }catch(error){
        return error.toString()
    }
}
export async function storeUserId(userId:string){
    console.log('storing :'+userId)
    try{
        await AsyncStorage.setItem('userId',userId)
    }catch(error){
        console.log(error)
    }
}
export async function getUserId():Promise<String>{
    try{
        const value = await AsyncStorage.getItem('userId')
        console.log('mengambil :'+value)
        return value
    }catch(error){
        return error.toString()
    }
}
export async function SetUserLogged(isLogged:boolean){
    try{
        AsyncStorage.setItem('loggedIn',isLogged?'true':'false')
    }catch(error){}
}
export async function UserIsLogged() : Promise<boolean>{
    try{
        const value= await AsyncStorage.getItem('loggedIn')
        return value =='true'
    }catch(error){
        console.log(error)
        return false
    }
}
export async function SetEmail(email:string){
    try{
        AsyncStorage.setItem('email',email)
    }catch(error){
        console.log(error)
    }
}
export async function GetEmail(){
    try{
        const value =AsyncStorage.getItem('email')
        return value
    }catch(error){
        console.log(error)
    }
}

export async function clearUserCredentials(){
    try{
        await AsyncStorage.clear()
    }catch(error){

    }
}

export async function configOnlyIncomplete(preference:string){
    try{
        await AsyncStorage.setItem('onlyIncomplete',preference)
    }catch(error){
        console.log(error)
    }
}
export async function getConfigOnlyIncomplete(){
    try{
        const value =await AsyncStorage.getItem('onlyIncomplete')
        return value
    }catch(error){
        console.log(error)
    }
}