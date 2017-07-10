import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    StatusBar,
    Platform,
    Alert

} from 'react-native'
import _ from 'lodash';
import Colors from '../../res/style/colors'
import CommonStyles from '../../res/style/commonStyles'
import Tool from '../util/Tool';
import Loading from '../common/Loading';
const {width, height} = Dimensions.get('window');
import MyListView from '../common/MyListView'
export default class Comment extends React.Component {

     constructor(porps){
         super(porps);
          this.placeholder = "请输入评论内容(0-200)"
         this.state={
             data:{},
            text: "",
            username:null,
            userId:null,
            commentId:0
         }
     }

     componentDidMount(){
         this.getImgs();
         
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
      getImgs(){
        // 
        fetch('http://121.40.241.28:7070/zhxz/app/newsAction.action?commentDetail=&affType='+this.props.navigation.state.params.type+'&itemId='+this.props.navigation.state.params.id)
        .then((response) => response.json())
            .then((responseJson) => {
              
                if(responseJson.result == "fail") {
                  
                }else if(responseJson.result=="success"){
               console.log(responseJson)
                   this.setState({
                       data:responseJson
                   })
                //       responseJson.data.map((item,index)=>{
                //     console.log(item);
                //      this.titles.push(item.lpName);
                //      this.imgs=
                //      this.setState({
                //          isSwiper:true
                //      })
                
                   
                //   })} 
                }
            })
     }

     _renderHeader(){
           let  data=this.state.data;
         return (
             <View style={{ flexDirection: 'column', backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 5, justifyContent: 'space-between', borderBottomColor: Colors.dColor, borderBottomWidth: 1 }}>
                    <Text numberOfLines={2} style={{ fontSize: 19, color: "#222" }}>{data.infoTitle}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <Text>{Tool.format(data.createDate)}</Text>
                        {/*<Text>0条评论</Text>*/}
                    </View>
                </View>
         )
     }

      _submit(){
        if(this.state.text!=""||this.state.text.length>0){
            if(this.state.text.length<=200){
                    fetch('http://121.40.241.28:7070/zhxz/app/newsAction.action?commentInfo=&affType='+this.props.navigation.state.params.type+'&itemId='+this.props.navigation.state.params.id+'&pinfoId='+this.state.userId+'&commText='+this.state.text)
                    .then((response) => response.json())
                    .then((responseJson) => {
                      //  alert(JSON.stringify(responseJson));
                       Alert.alert(
                            '提示',
                            responseJson.result=="success"?"评论成功":"评论失败",
                            [
                                // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                                // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                { text: '确定', onPress: () => console.log('OK Pressed') },
                            ],
                            { cancelable: false }
                        );
                        if(responseJson.result=="success"){
                             this.setState({
                           commentId:responseJson.commIds,
                           text:""
                           })
                        }
                    
                   
                        
                    })
            }else{
                  Alert.alert(
                '提示',
                '字数不能超过200个字',
                [
                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    { text: '确定', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            );
                
            }
        }else{
         
                Alert.alert(
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
    render() {
        let {goBack, state} = this.props.navigation;
     
   
        return (
           <View style={{ flexDirection: 'column', backgroundColor: '#fff',flex:1}}>
             {this.state.data.result?
       
          
                <MyListView
                    // swipeEnabled={true}
                    // animationEnabled={true}
                    // removeClippedSubviews={false}
                    url={'http://121.40.241.28:7070/zhxz/app/newsAction.action?commentDetail=&affType='+this.props.navigation.state.params.type+'&itemId='+this.props.navigation.state.params.id+"&n="+this.state.commentId}
                    navigation={this.props.navigation}
                    showImg={false}
                    itemType={4}
                    renderHeader={this._renderHeader.bind(this)}
                />:
                <Loading />}
                <View style={{ alignItems: 'center', backgroundColor: "#f3Color",paddingHorizontal:5, flexDirection: 'row', justifyContent: 'space-between', height: 55,backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: Colors.dColor }}>
                       <TextInput
                        underlineColorAndroid='transparent'
                        style={{ textAlignVertical: 'top', color: "#999",width:width-60, backgroundColor: '#fff', fontSize: 16, height: 45, borderColor: "#dcdcdc", borderWidth: 1 }}
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                        maxLength={200}
                        multiline={true}
                        placeholder={this.placeholder}
                    /> 
                   <TouchableOpacity
                   onPress={this._submit.bind(this)}
                   >
                      <Image
                source={require('../../res/images/postIcon.png')}
                style={{ tintColor: Colors.mianColor, height: 35, width: 35 }}
            />
            </TouchableOpacity>
                </View>
            </View>
             
        )
    }
}