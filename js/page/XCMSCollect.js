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

import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import MyListView from '../common/MyListView'
import Colors from '../../res/style/colors'
import CommonStyles from '../../res/style/commonStyles'
const {width, height} = Dimensions.get('window');
export default class TXWCollect extends React.Component {
  static navigationOptions = {
    tabBarLabel: '收藏',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../res/images/collectIcon.png')}
       style={{tintColor: tintColor, height: 28, width: 28 }}
      />
    ),
  };

  render() {
    return (
        
                  
                    <SectionContent navigation={this.props.navigation} />
         
    );
  }
}

class SectionContent extends React.Component{
    constructor(props){
        super(props)

    }
    render(){
        return (
           <MyListView
                    // swipeEnabled={true}
                    // animationEnabled={true}
                    // removeClippedSubviews={false}
                    url={"http://121.40.241.28:7070/zhxz/app/newsAction.action?affType=TF&pinfoId=1&isCollentFlag=Y"}
                    navigation={this.props.navigation}
                    showImg={false}
                    itemType={2}
           />
        )
    }
}