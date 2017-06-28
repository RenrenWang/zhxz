import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native'
import Colors from '../../res/style/colors'
export default class My extends React.Component {
    static navigationOptions = {
        tabBarLabel: '我的',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../res/images/myIcon.png')}
                style={{ tintColor: tintColor, height: 28, width: 28 }}
            />
        ),
    };
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ height: 150,paddingHorizontal:20, backgroundColor: Colors.mianColor ,flexDirection:'row',alignItems:'center'}}>
                    <Image
                        source={require('../../res/images/myIcon.png')}
                        style={{ tintColor: "#fff", height: 56, width: 56 }}
                    />
                    <Text style={{marginLeft:15,fontSize:16,color:"#fff"}}>用户名</Text>
                </View>
                <View style={{marginVertical:15,paddingVertical:15,paddingHorizontal:5,backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}>
                    <Text>退出登录</Text>
                </View>
            </View>
        )
    }
}