import React from 'react'
import { Text, View, StatusBar, ToastAndroid, ActivityIndicator} from 'react-native'
import {NavigationScreenProp, StackActions, NavigationActions} from 'react-navigation'
import Axios from 'axios';

import {apiUrl} from '../api-url'
import SimpleTextInput from '../components/simple-text-input'
import {storeToken,storeUserId,getToken,getUserId,SetUserLogged, SetEmail, configOnlyIncomplete} from '../async-storage'
import BlockBtn from '../components/block-btn'
import {styles} from '../styles'
import { any } from 'prop-types';




interface Props{
    navigation: NavigationScreenProp<any,any>
}
interface State{
    email:string
    password:string
    isLoading:boolean
}
export default class LoginScreen extends React.Component<Props,State>{
    constructor(props){
        super(props)
        this.state={
            email:"",
            password:"",
            isLoading:false
        }
        
    }

    async login(){
        if(this.state.email!=''&& this.state.password!=''){
            console.log("email :"+this.state.email+" password : "+this.state.password)
            this.setState({isLoading:true})
            
            await Axios
                .post(apiUrl+"auth/login/",{
                    email:this.state.email.toLowerCase(),
                    password:this.state.password
                })
                .then(result=>{
                    storeToken(result.data.token)
                    SetEmail(this.state.email)
                    SetUserLogged(true)
                    configOnlyIncomplete('yes')
                    console.log(result.data.token)
                    ToastAndroid.showWithGravity("Login Succes",ToastAndroid.LONG,ToastAndroid.CENTER)
                    this.props.navigation.dispatch(StackActions.reset({
                        index:0,
                        actions: [NavigationActions.navigate({ routeName: 'Home' })]
                      }))
                })
                .catch(error=>{
                    console.log(error.response.data)
                    ToastAndroid.showWithGravity(error.response.data,ToastAndroid.LONG,ToastAndroid.CENTER)
                    this.setState({isLoading:false})
                })
            
        }else{
            ToastAndroid.showWithGravity("Please fill the empty field",ToastAndroid.SHORT,ToastAndroid.CENTER)
        }
    }
    render(){
        return(
            
            <View style={styles.container}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>
                    Welcome to To-do
                </Text>
                <SimpleTextInput 
                    placeholderTextColor='#111' 
                    placeholder='E-mail' 
                    onChangeText={text=>{this.setState({email:text})}} 
                    secureTextEntry={false} />
                <SimpleTextInput 
                    placeholderTextColor='#111' 
                    placeholder='Password' 
                    onChangeText={text=>{this.setState({password:text.toString()})}} 
                    secureTextEntry={true}/>
                <ActivityIndicator 
                    style={{display:this.state.isLoading?'flex':'none',}} 
                    size='large' 
                    animating={this.state.isLoading} color='#111'/>
                <BlockBtn 
                    title='Login' 
                    onPress={()=>{this.login()}}/>
                <BlockBtn 
                    title='Register' 
                    onPress={()=>{this.props.navigation.navigate('Register')}}/>
                <Text style={{textAlign:'center',marginTop:10}}>
                    Please Login or Register if you don't have any account
                </Text>
            </View> 
        );
    }
}