import { StyleSheet} from 'react-native';
export const styles =StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#66bfff',
        alignItems: 'center',
        justifyContent: 'center',
        padding :20
      },
      homeContainer:{
        backgroundColor:'#66bfff',
        alignItems: 'center',
        height:'100%',
        minHeight: 100,
        paddingTop: 0,
        paddingLeft: 10,
      },




      todoContainer:{
        width:'100%',
        borderBottomColor: '#111',
        borderBottomWidth: 1,
        borderLeftColor: '#111',
        borderLeftWidth:2,
        flexDirection: 'column',
        padding:3,
        marginBottom: 2,
        //borderBottomLeftRadius: 5,
      },
      todoButtonContainer:{
        flexDirection:'row',
        width:'50%',
        
      },
      todoTextContainer:{
        flexDirection:'column',
        width:'100%',
      },
      bold:{
        fontWeight:'bold',
      },
      isSelected:{
        color:'red'
      },
      todoAddContainer:{
        position:'absolute',
        alignItems: 'center',
        justifyContent:'center',
        width:40,
        height:40,
        bottom:20,
        right:20,
        //backgroundColor:'#111',
      },
      todoImageAdd:{
        resizeMode:'contain',
        width:45,
        height:45
      }
})
