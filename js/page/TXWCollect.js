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
      <ScrollableTabView
			 // renderTabBar={() => <ScrollableTabBar/>}
             tabBarBackgroundColor="#fff"
			  tabBarActiveTextColor={Colors.mianColor}
			   tabBarInactiveTextColor="#000"
			   tabBarUnderlineStyle={{backgroundColor:Colors.mianColor,height:3}}
			   tabBarTextStyle={{fontSize:16}}
		   >
            
                    <SectionContent navigation={this.props.navigation} tabLabel="所有" />
                    <SectionContent navigation={this.props.navigation} tabLabel="村品" /> 
                    <SectionContent navigation={this.props.navigation} tabLabel="专场" />
           </ScrollableTabView>
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
                    url={"http://121.40.241.28:7070/zhxz/app/newsAction.action?affType=VL&pageno=1"}
                    navigation={this.props.navigation}
                    showImg={false}
                    itemType={2}
           />
        )
    }
}