import React from 'react'
import { Text, View, Alert } from 'react-native'
import { createDrawerNavigator, NavigationScreenProp, StackActions, NavigationActions,  } from 'react-navigation';

import {styles} from '../styles'
import { GetEmail, SetUserLogged } from '../async-storage';
import Blockbtn from '../components/block-btn';
interface Props{
    navigation: NavigationScreenProp<any,any>
}
interface State{
    email:string
}
export default class ProfileScreen extends React.Component<Props,State>{
    static navigationOptions = {
        drawerLabel: 'Profile',
        //title:'Home'
    }
    constructor(props){
        super(props)
        this.state={
            email:''
        }
    }
    async getEmail(){
        const value=await GetEmail()
        this.setState({email:value})
    }
    componentWillMount(){
        this.getEmail()
    }
    render(){
        return(
            <View style={styles.container}>
                <Text>You Are Logged in as</Text>
                <Text>{this.state.email}</Text>
                <Blockbtn title="Log Out" 
                onPress={()=>{
                    Alert.alert("Do you want to log out?",'',[
                      {
                        text:"Cancel",
                        onPress:()=>{},
                        style:'cancel'
                      },
                      {
                        text:"Yes",
                        onPress:()=>{
                          SetUserLogged(false);
                          this.props.navigation.dispatch(StackActions.reset({
                            index:0,
                            actions: [NavigationActions.navigate({ routeName: 'Login' })]
                          }))
                        }
                      }
                    ])
                
                }}/>
            </View> 
        );
    }
}