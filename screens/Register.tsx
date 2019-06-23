import React from 'react'
import { Text, View, StatusBar ,AsyncStorage,ToastAndroid,ActivityIndicator} from 'react-native'
import {NavigationScreenProp} from 'react-navigation'
import axios from 'axios'

import {apiUrl} from '../api-url'
import {storeUserId,getUserId} from '../async-storage'
import SimpleTextInput from '../components/simple-text-input'
import BlockBtn from '../components/block-btn'
import {styles} from '../styles'

interface Props{
    navigation: NavigationScreenProp<any,any>
}
interface State{
    name:string
    email:string
    password:string
    confirmPassword:string
    isLoading:boolean
}
export default class RegisterScreen extends React.Component<Props,State>{
    constructor(props){
        super(props)
        this.state={
            name:'',
            email:'',
            password:'',
            confirmPassword:'',
            isLoading:false
        }
    }
    //called when register button pressed
    async Register(){
        //checking wheter the field is empty
        if(this.state.name !='' && this.state.email !='' && this.state.password !='' && this.state.password == this.state.confirmPassword){
            this.setState({isLoading:true})
            //api post request to plumier123.herokuapp.com for register
            await axios
                .post(apiUrl+"api/v1/users",{
                    name:this.state.name,email:this.state.email,password:this.state.password
                }).then(data=>{
                    ToastAndroid.showWithGravity("Success, please login",ToastAndroid.LONG,ToastAndroid.CENTER); 
                    //navigate to login screen
                    this.props.navigation.navigate('Login');
                })
                .catch(error=>{
                    ToastAndroid.showWithGravity(error.response.data[0].messages.toString(),ToastAndroid.LONG,ToastAndroid.CENTER);
                })   
            //stop the spinner
            this.setState({isLoading:false})
        }else{
            if(this.state.password!=this.state.confirmPassword && this.state.password!='' && this.state.confirmPassword!=''){
                ToastAndroid.showWithGravity("Password doesn't match",ToastAndroid.SHORT,ToastAndroid.CENTER)
                this.setState({password:'',confirmPassword:''})
            }else{
                ToastAndroid.showWithGravity("Please fill all the emptyfield",ToastAndroid.SHORT,ToastAndroid.CENTER)
            }
        }
    }
    render(){
        return(
            <View style={styles.container}> 
                <Text 
                    style={{fontSize:20,fontWeight:'bold'}}>
                        Register
                </Text>
                <SimpleTextInput 
                    placeholderTextColor='#111' 
                    placeholder='Name' 
                    onChangeText={text=>{this.setState({name:text})}} 
                    secureTextEntry={false} />
                <SimpleTextInput 
                    placeholderTextColor='#111' 
                    placeholder='E-mail' 
                    onChangeText={text=>{this.setState({email:text})}} 
                    secureTextEntry={false} />
                <SimpleTextInput 
                    value={this.state.password} placeholderTextColor='#111' 
                    placeholder='Password' 
                    onChangeText={text=>{this.setState({password:text})}} 
                    secureTextEntry={true} />
                <SimpleTextInput 
                    value={this.state.confirmPassword} 
                    placeholderTextColor='#111' 
                    placeholder='Confirm Password' 
                    onChangeText={text=>{this.setState({confirmPassword:text})}} 
                    secureTextEntry={true} />
                <ActivityIndicator 
                    style={{display:this.state.isLoading?'flex':'none',}} 
                    size='large' 
                    animating={this.state.isLoading} color='#111'/>
                <BlockBtn 
                    title='Register' 
                    onPress={()=>{this.Register()}}/>
                <BlockBtn 
                    title='Login' 
                    onPress={()=>{this.props.navigation.navigate('Login')}}/>
                <Text 
                    style={{textAlign:'center',marginTop:10}}>
                        Please Login or Register if you don't have any account
                </Text>
                
            </View> 
        );
    }
}