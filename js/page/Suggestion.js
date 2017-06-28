import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    Button,
    TouchableOpacity
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
        }
    }
    _submit(){
        if(this.state.text!=""||this.state.text.length>0){
            if(this.state.text.length<50){
                    alert(this.state.text);    
            }else{
               alert("字数不能超过50个字");   
            }
        }else{
            alert("内容不能为空");
        }
       
        // fetch('http://121.40.241.28:7070/zhxz/app/newsAction.action?affType=MD&fbText='+this.state.text+'&fbPerson='+this.state.fbPerson+'&fbUserid=1')
        // .then((response) => response.json())
        // .then((responseJson) => {
               
        // })
        
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
                   <Text style={{color:'#fff',fontSize:18,margin: 15,paddingVertical:10,textAlign:'center',backgroundColor:Colors.mianColor,borderRadius:5}}>提交</Text>
               </TouchableOpacity>
                <View style={{ flexDirection: 'column',  flex: 1 }}>
                    <View
                        style={{ paddingHorizontal: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50, backgroundColor: "#fff", borderBottomWidth: 1, borderTopWidth: 1, borderColor: Colors.dColor, }}
                    >
                        <Text style={{ fontSize: 16, color: Colors.defaultFontColor }}>反馈信息</Text>

                        <Text style={{ fontSize: 16, color: Colors.buleColor }}>我的</Text>
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
                    url={"http://121.40.241.28:7070/zhxz/app/newsAction.action?affType=FL"}//fbUserid=1
                    navigation={this.props.navigation}
                    showImg={false}
                    itemType={4}

                />
            </View>
        )
    }
}