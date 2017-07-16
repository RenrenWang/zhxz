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
import MyListView from '../common/MyListView'
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
      //  this.getData();

    }
    componentWillUnmount() {
        if (this.cancelable)
            this.cancelable.cancel();
    }
   toComment(id){ 
      
     return this.props.navigation.navigate("Comment",{id,type:this.props.navigation.state.params.type});
   }
    getData() {
       


        this.cancelable = Tool.makeCancelable(fetch('http://121.40.241.28:7070/zhxz/app/newsAction.action?affType=DV&villId=' + this.props.navigation.state.params.id));


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

    _renderHeader(){
        return(
             <View>
                  <Image  style={{width,height:210}} source={{uri:'http://121.40.241.28:7070/zhxz/'+ this.props.navigation.state.params.imgUrl}}/>
                  <View style={{marginTop:15,padding:10,backgroundColor:'#fff'}}>
                    <Text>特色民宿</Text>
              </View>  
             </View>
        )
    }
    render() {

        let {goBack, state} = this.props.navigation;

        let data = (this.state.data);
 
         
        return ( <View style={{ flex: 1 }}>
               
                   
                <MyListView
                    // swipeEnabled={true}
                    // animationEnabled={true}
                    // removeClippedSubviews={false}
                    renderHeader={this._renderHeader.bind(this)}
                    url={'http://121.40.241.28:7070/zhxz/app/newsAction.action?affType=PL&villId='+this.props.navigation.state.params.id}//fbUserid=1
                    navigation={this.props.navigation}
                    showImg={false}
                    itemType={4}

                />
                      
                   
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