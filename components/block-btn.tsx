import React from 'react'
import {Button,View} from 'react-native'

export default function Blockbtn(props){
    return (
        <View style={{width:'100%',paddingTop:10,}}>
            <Button 
                color='#111' 
                title={props.title} 
                onPress={props.onPress} />
        </View>
    );
}