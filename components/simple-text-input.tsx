import React from 'react'
import {Button,View, TextInput} from 'react-native'

import {styles} from './styles'

export default function EditText(props){
    return (
        <View style={styles.inputTextContainer}>
            <TextInput 
                style={props.style}
                value={props.value}
                placeholderTextColor={props.placeholderTextColor} 
                placeholder={props.placeholder} 
                onChangeText={props.onChangeText} 
                secureTextEntry={props.secureTextEntry}/>
        </View>
    );
}

