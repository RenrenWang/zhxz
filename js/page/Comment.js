import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    StatusBar,
    Platform

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
         this.state={
             data:{}
         }
     }

     componentDidMount(){
         this.getImgs()
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
    render() {
        let {goBack, state} = this.props.navigation;
     
   
        return (
           <View style={{ flexDirection: 'column', backgroundColor: '#fff',flex:1}}>
             {this.state.data.result?
       
          
                <MyListView
                    // swipeEnabled={true}
                    // animationEnabled={true}
                    // removeClippedSubviews={false}
                    url={'http://121.40.241.28:7070/zhxz/app/newsAction.action?commentDetail=&affType='+this.props.navigation.state.params.type+'&itemId='+this.props.navigation.state.params.id}
                    navigation={this.props.navigation}
                    showImg={false}
                    itemType={4}
                    renderHeader={this._renderHeader.bind(this)}
                />:
                <Loading />}
            </View>
             
        )
    }
}