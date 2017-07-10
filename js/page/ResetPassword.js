import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Alert
} from 'react-native'
import Colors from '../../res/style/colors'
import { NavigationActions } from 'react-navigation'
const {width, height} = Dimensions.get('window');
export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.placeholderOldPassword = "旧密码";
        this.placeholderPassword = "新密码";
        this.placeholderConfirmPassword="确认新密码";
        this.state = {
            oldPassword:null,
            confirmPassword: null,
            password: null,
            userId:null
        }
    }

     componentDidMount(){

      
        storage.load({
            key: 'user',
            }).then(ret => {
       
            this.setState({
             
                userId:ret.pinfoId
            })
        }).catch(err => {
           
           // this.toUrl('Login')
        })
    }
   resetPassword(){
      if(!this.state.oldPassword||this.state.oldPassword==""){
           return Alert.alert(
                '提示',
                '旧密码不能为空',
                [
                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    { text: '确定', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            );
      }
         if(!this.state.password||this.state.password==""){
           return Alert.alert(
                '提示',
                '新密码不能为空',
                [
                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    { text: '确定', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            );
      }
      if(this.state.confirmPassword!=this.state.password){
           return Alert.alert(
                '提示',
                '两次密码输入不一致',
                [
                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    { text: '确定', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            );
      }
          fetch('http://121.40.241.28:7070/zhxz/sysLogin.action?updateAppPassword=&pinfoId='+this.state.userId+'&userNewpwd='+this.state.password)
            .then((response) => response.json())
            .then((responseJson) => {
            
               Alert.alert(
                '提示',
                  responseJson.data ,
                [
                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    { text: '确定', onPress:responseJson.result=='success'?this.toLogin.bind(this):()=>console.log("失败") },
                ],
                { cancelable: false }
              );
              

            });
        //;
    }
    toLogin(){
          const resetAction = NavigationActions.reset({
                                        index:0,
                                        actions: [
                                            NavigationActions.navigate({ routeName: 'Login' })
                                        ]
                                   })
        this.props.navigation.dispatch(resetAction)
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#fff" }}>
           

                <View style={{marginTop:10}}>
                   
                        <TextInput
                            underlineColorAndroid='transparent'
                            style={{marginVertical:5,borderColor: "#dcdcdc", borderWidth: 1, color: "#999", backgroundColor: '#fff',width:width-15, height: 50, borderBottomColor: "#dcdcdc", borderBottomWidth: 1 }}
                            onChangeText={(oldPassword) => this.setState({ oldPassword })}
                            value={this.state.username}
                            placeholder={this.placeholderOldPassword}
                            secureTextEntry={true}
                        />
                 
                      
                        <TextInput
                            underlineColorAndroid='transparent'
                            style={{marginVertical:5, color: "#999",borderColor: "#dcdcdc", borderWidth: 1, backgroundColor: '#fff', width:width-15, height: 50, }}
                            onChangeText={(password) => this.setState({ password })}
                            value={this.state.password}
                            placeholder={this.placeholderPassword}
                            secureTextEntry={true}
                        />
                          <TextInput
                            underlineColorAndroid='transparent'
                            style={{marginVertical:5, color: "#999",borderColor: "#dcdcdc", borderWidth: 1, backgroundColor: '#fff', width:width-15, height: 50, }}
                            onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                            value={this.state.confirmPassword}
                            placeholder={this.placeholderConfirmPassword}
                            secureTextEntry={true}
                        />
                   
                </View>
               
                <TouchableOpacity
                 onPress={this.resetPassword.bind(this)}
                 style={{marginVertical:25,borderRadius: 5,width:width-15,backgroundColor:Colors.mianColor,height:45,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:"#fff",fontSize:16}}>提交</Text>
                </TouchableOpacity>
                
            </View>
        )
    }

}
