import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    Alert
} from 'react-native'
import Colors from '../../res/style/colors'
import NavBar from '../common/NavBar'
import MyListView from '../common/MyListView'
export default class Suggestion extends React.Component {
    static navigationOptions = {
        tabBarLabel: '意见反馈',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../res/images/suggestionIcon.png')}
                style={{ tintColor: tintColor, height: 23, width: 23 }}
            />
        ),
    };
    constructor(props) {
        super(props)
        this.title = "意见反馈";
        this.placeholder = "请输入您的问题或建议"
        this.state = {
            text: "",
            isMe:false,
            userId:null,
            username:null,
            url:"http://121.40.241.28:7070/zhxz/app/newsAction.action?affType=FL"
        }
    }
componentDidMount(){
  storage.load({
            key: 'user',
            }).then(ret => {
       
            this.setState({
                username:ret.pinfoName,
                userId:ret.pinfoId
            })
        }).catch(err => {
           
           // this.toUrl('Login')
        })
}
   

   lookMe(){
        if(!this.state.userId){
        return Alert.alert(
                '提示',
                '未登录，请先登录',
                [
                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    { text: '确定', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            );
        }

        let  strUser=this.state.isMe?'':'&fbUserid='+this.state.userId;
         this.setState({
             isMe:!this.state.isMe,
             url:'http://121.40.241.28:7070/zhxz/app/newsAction.action?affType=FL'+strUser
         })
      
       
   }
    _submit(){

             if(!this.state.userId){
        return Alert.alert(
                '提示',
                '未登录，请先登录',
                [
                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    { text: '确定', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            );
        }
        if(this.state.text!=""||this.state.text.length>0){
            if(this.state.text.length<50){
                   
                this.setState({
                   text:"",
                    url:'http://121.40.241.28:7070/zhxz/app/newsAction.action?affType=MD&fbText='+this.state.text+'&fbPerson='+this.state.username+'&fbUserid='+this.state.userId
                })
    //    fetch(')
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             console.log(JSON.stringify(responseJson));


    //             if (responseJson.result == 'fail') {}
    //                })

            }else{

                  return Alert.alert(
                '提示',
                '字数不能超过50个字',
                [
                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    { text: '确定', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            );
              
            }
        }else{
           
               return Alert.alert(
                '提示',
                '内容不能为空',
                [
                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    { text: '确定', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            );
        }

          
      
        
   }
    _renderHeader() {
        return (
            <View style={{ flexDirection: 'column', flex: 1 }}>
                <Text
                    style={{ marginVertical: 10, paddingHorizontal: 5, fontSize: 16, color: Colors.defaultFontColor }}>
                    您的意见是我们进步的动力，有问题反馈过来，我们将全力为你解答、持续改进系统。
                    </Text>
                <View style={{ position: 'relative', height: 150 }}>
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={{ textAlignVertical: 'top', color: "#999", backgroundColor: '#fff', fontSize: 16, height: 150, borderColor: "#dcdcdc", borderWidth: 1 }}
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                        maxLength={50}
                        multiline={true}
                        placeholder={this.placeholder}
                    />
                    <Text style={{ fontSize: 16, color: "#999", position: 'absolute', right: 3, bottom: 3 }}>(0-50字)</Text>
                </View>
               <TouchableOpacity
               onPress={this._submit.bind(this)}
               activeOpacity={1}
               > 
                   <Text style={{color:'#fff',fontSize:18,margin: 15,paddingVertical:12,textAlign:'center',backgroundColor:Colors.mianColor,borderRadius:5}}>提交</Text>
               </TouchableOpacity>
                <View style={{ flexDirection: 'column',  flex: 1 }}>
                    <View
                        style={{ paddingHorizontal: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50, backgroundColor: "#fff", borderBottomWidth: 1, borderTopWidth: 1, borderColor: Colors.dColor, }}
                    >
                        <Text style={{ fontSize: 16, color: Colors.defaultFontColor }}>反馈信息</Text>
                      <TouchableOpacity
                            onPress={this.lookMe.bind(this)}
                            activeOpacity={1}
                            >  
                        {this.state.isMe? <Text style={{ fontSize: 16, color: Colors.buleColor }}>全部</Text>:<Text style={{ fontSize: 16, color: Colors.buleColor }}>我的</Text>}
                  </TouchableOpacity>
                    </View>


                </View>


            </View>
        )
    }
    render() {
        let {goBack, state} = this.props.navigation;
        return (
            <View style={{ flexDirection: 'column', flex: 1 }}>
                <NavBar
                    title={this.title}
                    navBarbgColor={Colors.mianColor}
                    navBarLeftAction={() => goBack()}
                //  navBarRight={() => this._navBarRight()}
                />


                <MyListView
                    // swipeEnabled={true}
                    // animationEnabled={true}
                    // removeClippedSubviews={false}
                    renderHeader={this._renderHeader.bind(this)}
                    url={this.state.url}//fbUserid=1
                    navigation={this.props.navigation}
                    showImg={false}
                    itemType={4}

                />
            </View>
        )
    }
}