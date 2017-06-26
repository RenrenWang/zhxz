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

const {width, height} = Dimensions.get('window');
import MyListView from '../common/MyListView'
export default class Comment extends React.Component {
    render() {
        let {goBack, state} = this.props.navigation;
        return (
            <View style={{ flexDirection: 'column', backgroundColor: '#fff',flex:1 }}>
                <View style={{ flexDirection: 'column', paddingVertical: 10, paddingHorizontal: 5, justifyContent: 'space-between', borderBottomColor: Colors.dColor, borderBottomWidth: 1 }}>
                    <Text numberOfLines={2} style={{ fontSize: 19, color: "#222" }}>标题标题标题标题标题标题标题标题</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <Text>2017-05-06</Text>
                        <Text>0条评论</Text>
                    </View>
                </View>
                {/*<View style={{flexDirection:'column',padding:10,justifyContent:'space-between', borderBottomColor: Colors.dColor, borderBottomWidth: 1}}>
                              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                  <View style={{flexDirection:'row',alignItems:'center'}}>
                                      <Image  style={{height:35,width:35,tintColor:Colors.c9Color}} source={require('../../res/images/myIcon.png')} />
                                      <Text style={{fontSize:16,marginLeft:15,color:Colors.buleColor}}>用户名</Text>
                                  </View>
                                  <Text style={{fontSize:16,marginLeft:15}}>2017-05-06 13:21</Text>
                              </View>
                              <Text style={{marginTop:20,fontSize:16,color:Colors.defaultFontColor}}>评论内容评论内容评论内容评论内容</Text>
                          </View>*/}
          
                <MyListView
                    // swipeEnabled={true}
                    // animationEnabled={true}
                    // removeClippedSubviews={false}
                    url={"http://121.40.241.28:7070/zhxz/app/newsAction.action?affType=V&pageno=1&townId=1&villId=1"}
                    navigation={this.props.navigation}
                    showImg={false}
                    itemType={4}
                    
                />
            </View>
        )
    }
}