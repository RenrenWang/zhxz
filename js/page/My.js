import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    DeviceEventEmitter
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

 
    toUrl(url,id) {
        this.props.navigation.navigate(url,{id:id?id:null});
    }

    renderCellItem(items) {
        return (

            <View style={{ marginTop: 15 ,paddingHorizontal: 10, backgroundColor: '#fff',}}>
                {
                    items.map((item, index) => {
                        return <View key={index} style={{ borderBottomColor: "#e2e2e2", borderBottomWidth:items.length-1<=index?0:1, flexDirection: 'row', paddingVertical: 13,  justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    source={item.icon}
                                    style={{ tintColor: Colors.mianColor, height: 23, width: 23 }}
                                />
                                <Text style={{ fontSize: 16, marginLeft: 15 }}>{item.title}</Text>
                            </View>
                            <Image
                                source={require('../../res/images/leftIcon.png')}
                                style={{ tintColor: '#999', height: 15, width: 15 }}
                            />
                        </View>
                    })
                }
            </View>

        )
    }
    render() {

       let user=this.props.screenProps.user;
      
        let MyItems = [
            { title: "分享", toUrl: '', icon: require('../../res/images/sharIcon.png') },
            { title: "关于我们", toUrl: '', icon: require('../../res/images/aboutIcon.png') },
         
        ];
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ height: 150, paddingHorizontal: 20, backgroundColor: Colors.mianColor, flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../res/images/myIcon.png')}
                        style={{ tintColor: "#fff", height: 56, width: 56 }}
                    />
                    {user?<Text style={{ marginLeft: 15, fontSize: 20, color: "#fff" }} onPress={this.toUrl.bind(this,"UserInfo",user.pinfoId)} >{user.pinfoName}</Text>:
                    <Text style={{ marginLeft: 15, fontSize: 20, color: "#fff" }} onPress={this.toUrl.bind(this,"Login")} >立即登录</Text>}
                </View>
                {/*{this.renderCellItem(MyItems)}*/}
            </View>
        )
    }
}