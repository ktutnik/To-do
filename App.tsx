import React from 'react';
import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native';
import {createStackNavigator,createAppContainer,NavigationScreenProp, createDrawerNavigator, DrawerItems, NavigationActions, StackActions} from 'react-navigation'
import axios from 'axios'


import {UserIsLogged, SetUserLogged} from './async-storage'
import LoginScreen from './screens/Login'
import RegisterScreen from './screens/Register'
import HomeScreen from './screens/Home'
import ProfileScreen from './screens/Profile'
import { TouchableOpacity } from 'react-native-gesture-handler';



interface Props{
  navigation : NavigationScreenProp<any,any>
}
interface State{
  isLogged:boolean
}
 class App extends React.Component<Props,State>{
  constructor(props){
    super(props)
    this.state={
      isLogged:false
    }
  }
  async isLogin(){
    let isLogged=await UserIsLogged()
    //To dispatch this screen so the user cannot go back to login screen if already logged
    //and go to Home screen
    if(isLogged){
      this.props.navigation.dispatch(StackActions.reset({
        index:0,
        actions: [NavigationActions.navigate({ routeName: 'Home' })]
      }))
    }else{
      this.props.navigation.dispatch(StackActions.reset({
        index:0,
        actions: [NavigationActions.navigate({ routeName: 'Login' })]
      }))
    }
  }
  componentWillMount() {
    this.isLogin()
  }
  render(){
    return (<View/>)
  }
}
const DrawerContent = (props) => (
  <View>
    <View 
      style={{
        backgroundColor: '#66bfff',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    > 
      <Text style={{ color: 'white', fontSize: 30 ,marginBottom:5}}>
        Do todo!
      </Text>
      <Button title="log out"
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
                props.navigation.dispatch(StackActions.reset({
                  index:0,
                  actions: [NavigationActions.navigate({ routeName: 'Login' })]
                }))
              }
            }
          ])
      
      }}/>
    </View>
    <DrawerItems {...props} />
  </View>
)


//Drawer navigator as the container of home and profile screen
const MyDrawerNavigator = createDrawerNavigator({
    Home:     {screen: HomeScreen},
    Profile:  {screen: ProfileScreen,},
},{
    initialRouteName: 'Home',
    contentComponent: DrawerContent
})


const DrawerNavContainer= createStackNavigator({
  Main:{screen:MyDrawerNavigator,
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: '#66bfff',color:'#111', },
      headerTintColor: '#111',
      //hamburger menu
      headerLeft:(
      <TouchableOpacity 
        onPress={()=>{navigation.toggleDrawer()}} 
        style={{marginLeft:15}}>
          <Image 
            style={{height:30,width:30}} 
            source={require('./icons/menu.png')}/>
      </TouchableOpacity>)
    })
  }
},{
  headerMode:'float',
})

const AppNav=createStackNavigator({
  Welcome :   App,
  Login :     {screen : LoginScreen },
  Register :  {screen : RegisterScreen },
  Home :      {screen : DrawerNavContainer}
},
{
  initialRouteName: 'Welcome',
  headerMode:'none',
})

export default createAppContainer(AppNav)

//



