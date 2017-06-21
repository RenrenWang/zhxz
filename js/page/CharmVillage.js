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
export default  class CharmVillage extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            
      <ScrollableTabView
			 // renderTabBar={() => <ScrollableTabBar/>}
             tabBarBackgroundColor="#fff"
			  tabBarActiveTextColor={Colors.mianColor}
			   tabBarInactiveTextColor="#000"
			   tabBarUnderlineStyle={{backgroundColor:Colors.mianColor,height:3}}
			   tabBarTextStyle={{fontSize:16}}
		   >
            
            <SectionContent navigation={this.props.navigation} tabLabel="附近"  url={"http://121.40.241.28:7070/zhxz/app/newsAction.action?affType=VL"}/>
            <SectionContent navigation={this.props.navigation} tabLabel="人气"  url={"http://121.40.241.28:7070/zhxz/app/newsAction.action?affType=VQ"}/> 
                    
           </ScrollableTabView>
  
        )
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
                    url={this.props.url}
                    navigation={this.props.navigation}
                    showImg={false}
                    itemType={3}
           />
        )
    }
}