import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Alert,
    DeviceEventEmitter
} from 'react-native'
import Colors from '../../res/style/colors'
import { NavigationActions } from 'react-navigation'

const {width, height} = Dimensions.get('window');
export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.placeholderUsename = "手机号/用户名";
        this.placeholderPassword = "密码";
        this.state = {
            username: "",
            password: ""
        }
    }
    toUrl(url) {
        let  navigation= this.props.navigation;
       if(url=="Home"){
               const resetAction = NavigationActions.reset({
                                        index:0,
                                        actions: [
                                            NavigationActions.navigate({ routeName: 'TabScreen' })
                                        ]
                    })
            this.props.navigation.dispatch(resetAction)

       }else{
           navigation.navigate(url);
       }
           
       
   
    }

    login() {
     //   DeviceEventEmitter.emit('userNameDidChange', '通知来了');
        
                       
        if (!this.state.username || this.state.username.length <= 0) {

            return Alert.alert(
                '提示',
                '用户名不能为空',
                [
                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    { text: '确定', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            );
        }

        if (!this.state.password || this.state.password.length <= 0) {

            return Alert.alert(
                '提示',
                '密码不能为空',
                [
                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    { text: '确定', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            );
        }
        fetch('http://121.40.241.28:7070/zhxz/sysLogin.action?appLogin=&userLogin=' + this.state.username + '&userLoginPwd=' + this.state.password)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(JSON.stringify(responseJson));


                if (responseJson.result == 'fail') {
                    Alert.alert(
                        '提示',
                        responseJson.msg,
                        [
                            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                            // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            { text: '确定', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false }
                    );
                } else if (responseJson.result == 'success') {


                    // const setParamsAction = NavigationActions.setParams({
                    // params: { title: 'Hello' },
                    // key: 'screen-123',
                    // })
                    // this.props.navigation.dispatch(setParamsAction)
                  let  data=responseJson;
                    storage.save({
                        key: 'user',  // 注意:请不要在key中使用_下划线符号!
                        data


                    });
                   
                    Alert.alert(
                        '提示',
                        responseJson.msg,
                        [
                            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                            // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {
                                text: '确定', onPress: () => {
                                   // this.props.navigation.goBack()
                                  DeviceEventEmitter.emit('userNameDidChange', responseJson);
                                   const resetAction = NavigationActions.reset({
                                        index:0,
                                        actions: [
                                            NavigationActions.navigate({ routeName: 'TabScreen' })
                                        ]
                                   })
                                 this.props.navigation.dispatch(resetAction)

                                 
                                }

                            },
                        ],
                        { cancelable: false }
                    );
                }
            })


    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#fff" }}>
                <Image
                    style={{ height: 90, width: 90, marginVertical: 50 }}
                    source={require('../../res/images/logo.png')}
                />

                <View style={{ borderColor: "#dcdcdc", borderWidth: 1, borderRadius: 5 }}>
                 <View style={{position:'relative'}}>
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={{paddingLeft:36,color: "#999", borderTopLeftRadius: 5, borderTopRightRadius: 5, backgroundColor: '#fff', width: width - 20, height: 50, borderBottomColor: "#dcdcdc", borderBottomWidth: 1 }}
                        onChangeText={(username) => this.setState({ username })}
                        value={this.state.username}
                        placeholder={this.placeholderUsename}

                    />
                    <Image
                       style={{tintColor:"#999", height: 22, width: 22 ,position:'absolute',top:13,left:7}}
                        source={require('../../res/images/myIcon.png')}
                    />
                    </View>
                    <View style={{ backgroundColor: "#dcdcdc", height: 1, width: width - 20  }}></View>
                     <View style={{position:'relative'}}>
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={{paddingLeft:36, color: "#999", borderBottomLeftRadius: 5, borderBottomRightRadius: 5, backgroundColor: '#fff', width: width - 20, height: 50, }}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        placeholder={this.placeholderPassword}
                        secureTextEntry={true}
                    />
                     <Image
                    style={{tintColor:"#999", height: 22, width: 22,position:'absolute',top:13,left:7}}
                    source={require('../../res/images/passwordIcon.png')}
                />
                    </View>
                </View>


                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ marginVertical: 25, borderRadius: 5, width: width - 20, backgroundColor: Colors.mianColor, height: 45, alignItems: 'center', justifyContent: 'center' }}
                    onPress={this.login.bind(this)}
                >
                    <Text style={{ color: "#fff", fontSize: 16 }} >登录</Text>
                </TouchableOpacity>

                <View style={{ width: width - 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                    {/*<Text onPress={this.toUrl.bind(this, 'ResetPassword')}>忘记密码？</Text>*/}
                   {/*<View style={{flexDirection:'column',alignItems:'flex-end'}}>*/}
                        <Text onPress={this.toUrl.bind(this, 'Register')}>新用户注册</Text>
                        <Text  style={{marginTop:5}} onPress={this.toUrl.bind(this, 'Home')}>随便看看</Text>
                   {/*</View>*/}
                </View>
            </View>
        )
    }

}
