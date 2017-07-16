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
    Dimensions
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
           _images:[]
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
    getData() {
       //alert(this.props.navigation.state.params.id);


        this.cancelable = Tool.makeCancelable(fetch('http://121.40.241.28:7070/zhxz/app/newsAction.action?affType=DF&specId=' + this.props.navigation.state.params.id));


        this.cancelable.promise.then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.result == "fail") {


                } else if (responseJson.result == "success") {
                   
                    this.setState({
                        data: responseJson.data[0],
                 
                        isLoading: false
                      
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
 
         
        return ( <View style={{ flex: 1 }}>
                {!this.state.isLoading  ?
                    <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', backgroundColor: Colors.hColor }}>
                        <ScrollView
                            horizontal={false}
                            style={{ flexDirection: 'column', flex: 1 }}>

                              <View
             style={{flexDirection:'column',height:210,borderBottomColor:Colors.dColor,borderBottomWidth:1}}
             >
             <TouchableOpacity
             >
                   <Image  style={{width,height:210-45}} source={{uri:'http://121.40.241.28:7070/zhxz/'+data.specAnnex}}/>
             </TouchableOpacity>
             <View style={{height:45,flexDirection:'row',justifyContent:'space-between',flex:1,backgroundColor:'#fff',paddingHorizontal:10,alignItems:'center'}}>
                  <Text style={{fontSize:16,color:"#000"}}>{data.specTitle}</Text>
                  <View style={{flexDirection:'row'}}>
                      <Text style={{fontSize:16,color:'#999'}}>{data.allnums}</Text>
                      <Image   style={{height:22,width:22,tintColor:"#999"}}  source={require('../../res/images/collectIcon.png')} />
                  </View>
             </View>
             </View>
              <View style={{marginTop:15,padding:10,backgroundColor:'#fff'}}>
                    <Text>{data.specDescription}</Text>
              </View>                  
                         

                        </ScrollView ></View>: <Loading />}
                        {/*<View style={{ alignItems: 'center', backgroundColor: "#f3Color", flexDirection: 'row', justifyContent: 'center', height: 50,backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: Colors.dColor }}>
                            <TouchableOpacity
                              onPress={_.throttle(this.toComment.bind(this,data.infoId),1000,{

  'trailing': false
})}
                              style={styles.footerItem}
                            >
                                <Image style={styles.icon} source={require('../../res/images/commentIcon.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity
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
                    </View>*/}
                   
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