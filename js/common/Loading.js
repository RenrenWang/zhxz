import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import Colors from '../../res/style/colors'
import Tool from '../util/Tool';
export default class Loading extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
          <View style={{flex:1,flexDirection:'column',justifyContent:"center",alignItems:'center'}}>
               
                  <Text style={{color:Colors.c9Color,fontSize:16}}>{this.props.msg?this.props.msg:'正在加载...'}</Text>
                  
           </View>
        )
    }
}