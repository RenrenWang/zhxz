import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Alert,
    ScrollView,
    DeviceEventEmitter
} from 'react-native'
import Colors from '../../res/style/colors'
import { NavigationActions } from 'react-navigation'
const {width, height} = Dimensions.get('window');
export default class UserInfo extends React.Component {

    constructor(props) {
        super(props)
      this.state={
      
         pinfoName:null,
         pinfoPname:null,
         pinfoSname:null,
         pinfoSex:null,
         pinfoPhone:null,
         townTitle:null,
         villTitle:null,
        deparTitle:null
         
      }
    }

    logOut() {

        Alert.alert(
            '退出登录',
            '您确定要退出登录吗？',
            [

                { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: '确定', onPress: () => {

                        storage.remove({
                            key: 'user'
                        })
                          //this.props.navigation.goBack(null); 
                         DeviceEventEmitter.emit('userNameDidChange', null);
                        const resetAction = NavigationActions.reset({
                            index:0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'Login' })
                            ]
                        })
                        this.props.navigation.dispatch(resetAction)


                    }

                },
            ],
            { cancelable: false }
        )

    }
    componentDidMount(){
          fetch('http://121.40.241.28:7070/zhxz/app/newsAction.action?affType=UR&pinfoId='+this.props.navigation.state.params.id)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(JSON.stringify(responseJson));

                if(responseJson.result == 'success') {
                    let data=responseJson.data[0];
                  this.setState({
                    
                        pinfoName:data.pinfoName,
                        pinfoPname:data.pinfoPname,
                        pinfoSname:data.pinfoSname,
                        pinfoSex:data.pinfoSex,
                        pinfoPhone:data.pinfoPhone,
                        townTitle:data.townTitle,
                        villTitle:data.villTitle,
                        deparTitle:data.deparTitle
                  })
                } 
            })

    }
    toUrl(url) {
        this.props.navigation.navigate(url);
    }
   itemClick(){
       
   }
    renderCellItem(items) {
        return (

            <View style={{ marginTop: 15, paddingHorizontal: 10, backgroundColor: '#fff', }}>
                {
                    items.map((item, index) => {
                        return <TouchableOpacity
                        activeOpacity={1}
                        onPress={item.action?item.action:()=>{}}
                         key={index} 
                         style={{ borderBottomColor: "#e2e2e2", borderBottomWidth: items.length - 1 <= index ? 0 : 1, flexDirection: 'row', paddingVertical: 15, justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row' }}>
  
                                <Text style={{ fontSize: 14, marginLeft: 5 }}>{item.title}</Text>
                            </View>
                           <View style={{ flexDirection: 'row' }}>
                              {item.avatar?<Image
                                source={item.avatar}
                                style={{ tintColor:Colors.mianColor, height: 45, width: 45 }}
                               />:<Text style={{ fontSize: 16, marginRight: 5 }}>{item.text}</Text>}
                               {!item.avatar?<Image
                                source={require('../../res/images/leftIcon.png')}
                                style={{ tintColor: '#999', height: 15, width: 15 }}
                               />:null}
                              
                           </View>
                            </TouchableOpacity>
                        
                    })
                }
          
 </View>
        )
    }

    render() {
    
        
        let MyItems = [
            { title: "我的头像",avatar:require('../../res/images/myIcon.png')},
            { title: "用户名", text:this.state.pinfoName},
            { title: "手机号码",  text:this.state.pinfoPhone},
            { title: "个性签名",text:this.state.pinfoSname},
            { title: "姓名",text:this.state.pinfoPname },
          
            { title: "性别" ,text:this.state.pinfoSex},
             { title: "区域" ,text:(this.state.townTitle&&this.state.townTitle!="")?(this.state.townTitle+"-"+this.state.villTitle):""},
              { title: "单位" ,text:this.state.deparTitle},

        ];
        return (

              <ScrollView 
              style={{ flex: 1, flexDirection: 'column' }}
                scrollEnabled={true}>
                  
              
          

                {this.renderCellItem(MyItems)}
                {this.renderCellItem([{ title: "修改密码",action:this.toUrl.bind(this,'ResetPassword')}])}
                <View style={{ alignItems: 'center' }}>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{ marginVertical: 25, borderRadius: 5, width: width - 5, backgroundColor: "#b00808", height: 45, alignItems: 'center', justifyContent: 'center' }}
                        onPress={this.logOut.bind(this)}
                    >
                        <Text style={{ color: "#fff", fontSize: 18 }} >退出登录</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}