import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Linking,
    Modal,
    Platform,
    Dimensions,
    Share
} from 'react-native'
import _ from 'lodash';
import Colors from '../../res/style/colors'
import Tool from '../util/Tool';
import Loading from '../common/Loading';
import ImageViewer from 'react-native-image-zoom-viewer';
const {width, height} = Dimensions.get('window');
import PhotoView from 'react-native-photo-view';
export default class OpenD extends React.Component {

    constructor(props) {
        super(props)
        this.images=[];
        this.cancelable = null;
        this.state = {
            dataState: true,
            data: [],
            files: [],
            isLoading: true,
            isError: false,
            msg: "网络加载失败，请稍后重试...",
            isModal:false,
           _images:[],
           result:''
        }
    }


    componentDidMount() {
        Linking.getInitialURL().then((url) => {
            if (url) {
                console.log('Initial url is: ' + url);
            }
        }).catch(err => console.error('An error occurred', err));
        this.getData();

    }
    componentWillUnmount() {
        if (this.cancelable)
            this.cancelable.cancel();
    }
   toComment(id){ 
      
     return this.props.navigation.navigate("Comment",{id,type:this.props.navigation.state.params.type});
   }

    _shareText() {
    Share.share({
      message: this.state.data.infoDescription,
      url: 'http://www.hvquan.com/',
      title: this.state.data.infoTitle
    }, {
      dialogTitle: '分享',
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ],
      tintColor: 'green'
    })
    .then(this._showResult)
    .catch((error) => this.setState({result: 'error: ' + error.message}));
  }

  _showResult(result) {
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        this.setState({result: 'shared with an activityType: ' + result.activityType});
      } else {
        this.setState({result: 'shared'});
      }
    } else if (result.action === Share.dismissedAction) {
      this.setState({result: 'dismissed'});
    }
  }
    getData() {



        this.cancelable = Tool.makeCancelable(fetch('http://121.40.241.28:7070/zhxz/app/newsAction.action?affType=SF&infoId=' + this.props.navigation.state.params.id));


        this.cancelable.promise.then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.result == "fail") {


                } else if (responseJson.result == "success") {
                    console.log("------------" + JSON.stringify(responseJson));
                        let images=[];
                      responseJson.attachData.map((item, index) => {
                        
                           if(item.lidType=="M")
                            images.push({url:'http://121.40.241.28:7070/zhxz'+item.lidFileuri});
                      })
                    this.setState({
                        data: responseJson.data[0],
                        files: responseJson.attachData,
                        isLoading: false,
                        _images:images
                    })
                }

            })
            .catch((error) => {
                this.setState({
                    isError: true
                })

            });

    }
    _handleOpenURL(url) {
        //   let  url="http://blog.csdn.net/pz789as/article/details/53021283";
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }
    _setModalVisible(visible){
       
       
            this.setState({
                isModal:visible
            })
    }
    _faillmageSource(url){
            alert(url);
    }


    render() {

        let {goBack, state} = this.props.navigation;

        let data = (this.state.data);
       
          this.images=[];
        return (
            <View style={{ flex: 1 }}>
                {!this.state.isLoading  ?
                    <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', backgroundColor: "#fff" }}>
                        <ScrollView
                            horizontal={false}
                            style={{ flexDirection: 'column', flex: 1 }}>

                            <View style={{ flexDirection: 'column', padding: 5, justifyContent: 'space-between', borderBottomColor: Colors.dColor, borderBottomWidth: 1 }}>
                                <Text numberOfLines={2} style={{ fontSize: 19, color: "#222" }}>{data.infoTitle}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                    <Text>{Tool.format(data.createDate)}</Text>
                                </View>
                            </View>
                            <View style={{ padding: 5, marginTop: 10 }}>
                                <Text style={{ fontSize: 16, lineHeight: 25, color: Colors.defaultFontColor }}>{data.infoDescription}</Text>
                                <View style={{ paddingVertical: 10, marginTop: 15 }}>

                                    {this.state.files.map((item, index) => {
                                     
                                       if(item.lidType=="M")
                                       this.images.push({url:'http://121.40.241.28:7070/zhxz'+item.lidFileuri});
                                      
                                        return item.lidType == "A" ? <Text style={{ color: '#1e90ff', fontSize: 16 }} key={index} onPress={() => this._handleOpenURL('http://121.40.241.28:7070/zhxz/' + item.lidFileuri)}>{Tool.fileName(item.lidFileuri)}</Text>:
                                           <TouchableOpacity
                                           key={index}
                                           activeOpacity={1}
                                            onPress={this._setModalVisible.bind(this,true)}
                                            style={{alignItems:'center',justifyContent:'center'}}
                                            >
                                            <Image  style={{ width:width-15,height:width-15}} source={{ uri: 'http://121.40.241.28:7070/zhxz/' + item.lidFileuri }} />
                                               </TouchableOpacity>
                                    })}

                                

                                     {/*<Text>{JSON.stringify(this.state._images)}</Text>*/}
                                   <Modal 
                                     visible={this.state.isModal}
                                     transparent={true}
                                     onRequestClose={() =>{this._setModalVisible(false)}}
                                     >
                                     <ImageViewer 
                                     
                                        imageUrls={this.images}
                                        loadingRender={()=><Text style={{color:"#fff"}}>正在加载图片...</Text>} />
                                     </Modal>
                                </View>
                            </View>

                        </ScrollView >
                        <View style={{ alignItems: 'center', backgroundColor: "#f3Color", flexDirection: 'row', justifyContent: 'center', height: 50,backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: Colors.dColor }}>
                            <TouchableOpacity
                              onPress={_.throttle(this.toComment.bind(this,data.infoId),1000,{

  'trailing': false
})}
                              style={styles.footerItem}
                            >
                                <Image style={styles.icon} source={require('../../res/images/commentIcon.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this._shareText.bind(this)}
                                style={styles.footerItem}
                            >
                                <Image style={styles.icon} source={require('../../res/images/sharIcon.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.footerItem}
                            >
                                <Image style={styles.icon} source={require('../../res/images/fontSizeIcon.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    : <Loading />}
            </View>)


    }
}
const styles = StyleSheet.create({
    footerItem: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    icon: {
        height: 25,
        width: 25,
        justifyContent: 'center',
        tintColor: Colors.c9Color
    }
})