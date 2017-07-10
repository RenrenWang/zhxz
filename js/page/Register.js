import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    Dimensions,
    Alert,
    TouchableOpacity
} from 'react-native'
import Colors from '../../res/style/colors'

const {width, height} = Dimensions.get('window');
export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.placeholderUsename = "手机号/用户名";
        this.placeholderPassword = "密码";
        this.state = {
            username: null,
            password: null
        }
    }
    register(){
      if(!this.state.username||this.state.username==""){
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
         if(!this.state.password||this.state.password==""){
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
  
          fetch('http://121.40.241.28:7070/zhxz/sysLogin.action?appUserRegister=&userLogin='+this.state.username+'&userLoginPwd='+this.state.password)
            .then((response) => response.json())
            .then((responseJson) => {
            if(responseJson.result=="fail"){
                   Alert.alert(
                    '提示',
                  responseJson.msg ,
                [
                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    { text: '确定',  onPress:()=>console.log("fail") },
                ],
                { cancelable: false }
              );
              
                     }else  if(responseJson.result=="success"){
                         this.setState({
                             username: null,
                             password: null
                         })
    Alert.alert(
                    '提示',
                  "注册成功",
                [
                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    { text: '确定', onPress:()=>console.log("success") },
                ],
                { cancelable: false }

                     )
              }
             });
             
           
            
        //;
    }
   toUrl(){
     
        this.props.navigation.navigate('Register');
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#fff" }}>
           

                <View style={{marginTop:10}}>
                   
                        <TextInput
                            underlineColorAndroid='transparent'
                            style={{marginVertical:5,borderColor: "#dcdcdc", borderWidth: 1, color: "#999", backgroundColor: '#fff',width:width-15, height: 50, borderBottomColor: "#dcdcdc", borderBottomWidth: 1 }}
                            onChangeText={(username) => this.setState({ username })}
                            value={this.state.username}
                            placeholder={this.placeholderUsename}

                        />
                 
                      
                        <TextInput
                            underlineColorAndroid='transparent'
                            style={{marginVertical:5, color: "#999",borderColor: "#dcdcdc", borderWidth: 1, backgroundColor: '#fff', width:width-15, height: 50, }}
                            onChangeText={(password) => this.setState({ password })}
                            value={this.state.password}
                            placeholder={this.placeholderPassword}
                            secureTextEntry={true}
                        />
                   
                </View>
               
                <TouchableOpacity
                 onPress={this.register.bind(this)}
                style={{marginVertical:25,borderRadius: 5,width:width-15,backgroundColor:Colors.mianColor,height:45,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:"#fff",fontSize:16}}>同意</Text>
                </TouchableOpacity>
                 <View style={{width:width-15,flexDirection:'row'}}>
                    <Text>点击-同意，即表示同意</Text>
                    <Text style={{color:Colors.mianColor}}>《服务条款及隐私协议》</Text>
                </View>
            </View>
        )
    }

}
