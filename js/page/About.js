import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    StatusBar,
    Platform

} from 'react-native'

import Config from '../Config.js'
import Colors from '../../res/style/colors'
import CommonStyles from '../../res/style/commonStyles'

const {width, height} = Dimensions.get('window');

export default class Home extends React.Component {
    constructor(props){
        super(props)

    }
    render(){
        return(
            <ScrollView 
              horizontal={false}
            style={{flex:1,flexDirection:'column',backgroundColor:'#fff'}}>
            <View style={{alignItems:'center'}}>
                  <Image
                    style={{ height: 100, width: 100, marginVertical:30}}
                    source={require('../../res/images/logo.png')}
                 />
                  <Text style={{paddingHorizontal:5,fontSize:16,color:Colors.c9Color,lineHeight:30}}>{Config.appInfo}</Text>
            </View>
           </ScrollView>
        )
    }
}