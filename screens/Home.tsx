import React from 'react'
import { Text, View, Button, Image, ToastAndroid, StatusBar,Alert, ActivityIndicator, Modal, CheckBox } from 'react-native'
import { createDrawerNavigator, createAppContainer, NavigationScreenProp } from 'react-navigation';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Axios from 'axios';


import BlockBtn from '../components/block-btn'
import SimpleTextInput from '../components/simple-text-input'
import {styles} from '../styles'
import ProfileScreen from './Profile'
import { UserIsLogged, getToken, configOnlyIncomplete, getConfigOnlyIncomplete } from '../async-storage';
import { apiUrl } from '../api-url';



interface todo{
    completed:boolean
    createdAt:string
    deleted:boolean
    id:string
    todo:string
    userId:string
}
interface Props{
    navigation: NavigationScreenProp<any,any>
}
interface State{
    isLoading:boolean
    selectedItem:number
    modalAddVisible:boolean
    modalEditVisible:boolean
    modalSettingVisible:boolean
    onlyShowIncomplete:boolean
    newTodo:string
    todoList:todo[]
}
var headerToken=null
export default class HomeScreen extends React.Component<Props,State>{
    static navigationOptions = {
        title: 'To-do List',
      };
    constructor(props){
        super(props)
        this.state={
            isLoading:false,
            selectedItem:null,
            modalAddVisible:false,
            modalEditVisible:false,
            modalSettingVisible:false,
            onlyShowIncomplete:false,
            newTodo:'',
            todoList:[]
        }
    }
    //API function
    async getTodo(){
        const onlyIncomplete=await getConfigOnlyIncomplete()
        this.setState({isLoading:true,selectedItem:null})
        //if(headerToken==null){
        const token= await getToken()
        headerToken={headers: {Authorization:token}}
        console.log(token)
        //}
        await Axios
        .get(apiUrl+"api/v1/todos?offset=0&limit=100",headerToken)
        .then(result=>{
            console.log(result.data)
            if(onlyIncomplete=='no'){
                this.setState({todoList:result.data,onlyShowIncomplete:false})
            }else{
                let todoIncompleteList:todo[]=[]
                result.data.forEach(todo=>{
                    if(!todo.completed)
                        todoIncompleteList.push(todo)
                })
                this.setState({todoList:todoIncompleteList,onlyShowIncomplete:true})
            }
        })
        .catch(error=>{
            console.log(error.response)
        })
        this.setState({isLoading:false})
    }
    async deleteTodo(){
        console.log(this.state.selectedItem)
        if(this.state.selectedItem!=null)
            await Axios.delete(apiUrl+"api/v1/todos/"+this.state.todoList[this.state.selectedItem].id,headerToken)
            .then(result=>{
                console.log(result.data)
                this.getTodo()
            })
            .catch(error=>{console.log(error.response.data)})
    }
    async addTodo(todo:string){
        if(todo!=''){
            Axios.post(apiUrl+"api/v1/todos",{todo:todo},headerToken)
            .then(result=>{
                console.log(result.data)
                this.getTodo()
                ToastAndroid.showWithGravity("Addition Success",ToastAndroid.SHORT,ToastAndroid.CENTER)
            })
            .catch(error=>{
                ToastAndroid.showWithGravity("Addition Failed",ToastAndroid.SHORT,ToastAndroid.CENTER)
            })
        }else{
            ToastAndroid.showWithGravity("Please fill the field",ToastAndroid.SHORT,ToastAndroid.CENTER)
        }
    }
    async editTodo(todo:String,id:string){
        if(todo!=''&&id!=''){
            Axios.put(apiUrl+"api/v1/todos/"+id,{todo:todo},headerToken)
            .then(result=>{this.getTodo();})
            .catch(error=>{console.log(error.response)})
        }
    }
    async completeTodo(todo:string,id:string){
        if(todo!=''&&id!=''){
            Alert.alert("Are you sure?","once complete then it's completely completed :P",[
                {text:"Yes",onPress:()=>{
                    Axios.put(apiUrl+"api/v1/todos/"+id,{todo:todo,completed:true},headerToken)
                    .then(result=>{console.log(result.data);this.getTodo()})
                    .catch(error=>{console.log(error.response)})
                }},
                {text:"Cancel",onPress:()=>{},style:'cancel'}
            ])
            
        }
    }




    //additional function
    



    //react function
    componentWillUpdate(){
    }
    componentWillMount(){
        this.getTodo()
        StatusBar.setTranslucent(true)
    }
    render(){
        return(
                <View style={styles.homeContainer}>
                    <View 
                        style={styles.topHomeContainer}>
                        <View 
                            style={{width:'50%',flexDirection:'row'}}>
                            <Text 
                                style={styles.h1}>
                                To Do List
                            </Text>
                        </View>
                        <View 
                            style={styles.todoActionContainer}>
                            <TouchableOpacity 
                                onPress={()=>this.getTodo()}>
                                <Image 
                                    style={styles.todoActionIcon} 
                                    source={require('../icons/refresh.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={()=>{
                                    if(this.state.selectedItem!=null){
                                        this.setState({modalEditVisible:true});
                                        this.setState({newTodo:this.state.todoList[this.state.selectedItem].todo})
                                    }else{
                                        Alert.alert("Please select an item")
                                    }
                                }}>
                                <Image 
                                    style={styles.todoActionIcon} 
                                    source={require('../icons/edit.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={()=>{
                                    this.setState({modalSettingVisible:true});
                                }}>
                                <Image 
                                    style={[styles.todoActionIcon]} 
                                    source={require('../icons/configuration.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={()=>{
                                    if(this.state.selectedItem!=null)
                                        Alert.alert(
                                            'Are you sure?',
                                            'The item will be deleted permanently',
                                            [
                                                {
                                                    text: 'Cancel',
                                                    onPress: () => {},
                                                    style: 'cancel',
                                                },
                                                {
                                                    text: 'Yes', 
                                                    onPress: () => this.deleteTodo()
                                                },
                                            ],
                                            {cancelable: false}
                                        )
                                    else
                                        Alert.alert("Please select an item")
                            }}>
                                <Image 
                                    style={[styles.todoActionIcon,{marginRight:0}]} 
                                    source={require('../icons/delete.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ActivityIndicator 
                        style={{display:this.state.isLoading?'flex':'none',}} 
                        size='large' 
                        animating={this.state.isLoading} color='#111'/>
                    <FlatList 
                        style={{width:'100%',flexGrow:0}}
                        data={this.state.todoList}
                        keyExtractor={(item)=>item.id}
                        renderItem={({item,index})=>
                            (<View style={styles.todoContainer}> 
                                <TouchableOpacity  
                                    onPress={()=>{
                                            if(index==this.state.selectedItem)
                                                this.setState({selectedItem:null});
                                            else
                                                this.setState({selectedItem:index});
                                            }}>
                                    <View 
                                        style={styles.todoTextContainer}>
                                        <Text 
                                            style={this.state.selectedItem==index?styles.isSelected:styles.bold}>
                                            <Text 
                                                style={styles.bold}>No.</Text>{index+1}
                                        </Text>
                                        <Text>
                                            <Text 
                                                style={styles.bold}>Status : </Text>{item.completed?'Completed':'Incomplete'}
                                        </Text>
                                        {/* <Text>
                                            <Text 
                                                style={[styles.bold]}>Todo : 
                                            </Text>       
                                        </Text> */}
                                        <Text>{item.todo}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>) 
                        }
                    ></FlatList>
                    
                    <View 
                        style={styles.todoAddContainer}>
                        <TouchableOpacity 
                            activeOpacity={0.5}  
                            onPress={()=>{this.setState({modalAddVisible:true});}}>
                            <Image 
                                source={require('../icons/add.png')} 
                                style={styles.todoImageAdd}/>
                            </TouchableOpacity>
                    </View>

                    <Modal
                        //when add pressed
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalAddVisible}
                        onRequestClose={() => {}}>
                        <View 
                            style={styles.modalBackground}>
                            <View style={styles.modalMainContainer}>
                                <Text 
                                    style={styles.h1}>Add To-do</Text>
                                <SimpleTextInput 
                                    placeholder="Enter to-do" 
                                    placeholderTextColor='#111' 
                                    onChangeText={text=>{this.setState({newTodo:text})}} />
                                <BlockBtn 
                                    title="Add to list" 
                                    onPress={()=>{
                                        this.addTodo(this.state.newTodo);
                                        this.setState({modalAddVisible:false})}}/>
                                <BlockBtn 
                                    title="Cancel" 
                                    onPress={()=>{this.setState({modalAddVisible:false})}}/>
                            </View>
                        </View>
                     </Modal>
                    
                     <Modal
                        //when edit pressed
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalEditVisible}
                        onRequestClose={() => {}}>
                        <View 
                            style={styles.modalBackground}>
                            <View style={[styles.modalMainContainer,{height:'70%'}]}>
                                <Text 
                                    style={styles.h1}>Edit To-do</Text>
                                <SimpleTextInput 
                                    value={this.state.newTodo} 
                                    placeholder="Enter to-do" 
                                    placeholderTextColor='#111' 
                                    onChangeText={text=>{
                                        this.setState({newTodo:text})}} />
                                <BlockBtn title="Apply Changes" 
                                    onPress={()=>{
                                        this.setState({modalEditVisible:false})
                                        this.editTodo(this.state.newTodo,this.state.todoList[this.state.selectedItem].id)
                                        }}/>
                                <BlockBtn title="Set To complete" 
                                    onPress={()=>{
                                        this.setState({modalEditVisible:false})
                                        this.completeTodo(this.state.newTodo,this.state.todoList[this.state.selectedItem].id)
                                        }}/>
                                <BlockBtn title="Cancel" onPress={()=>{this.setState({modalEditVisible:false})}}/>
                            </View>
                        </View>
                     </Modal>
                    
                     <Modal
                        //when setting icon pressed
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalSettingVisible}
                        onRequestClose={() => {}}>
                        <View 
                            style={styles.modalBackground}>
                            <View style={styles.modalMainContainer}>
                                <Text 
                                    style={styles.h1}>Preferences</Text>
                                <Text>Only Show Incomplete Todo </Text> 
                                <CheckBox value={this.state.onlyShowIncomplete} onValueChange={()=>{this.setState({onlyShowIncomplete:!this.state.onlyShowIncomplete})}}/>
                                <BlockBtn 
                                    title="OK" 
                                    onPress={()=>{
                                        configOnlyIncomplete(this.state.onlyShowIncomplete?'yes':'no')
                                        this.setState({modalSettingVisible:false})
                                        this.getTodo()}}/>
                                <BlockBtn 
                                    title="Cancel" 
                                    onPress={()=>{this.setState({modalSettingVisible:false})}}/>
                            </View>
                        </View>
                     </Modal>
                </View>
        );
    }
}
