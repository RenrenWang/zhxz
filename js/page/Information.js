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
import Swiper from 'react-native-swiper'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Colors from '../../res/style/colors'
import NavBar from '../common/NavBar'

import MyListView from '../common/MyListView'
const {width, height} = Dimensions.get('window');

export default class Information extends React.Component {

    constructor(props){
      super(props);
       this.state={
           swiperIndex:0
       }
    }
    _onMomentumScrollEnd(e, state) {
     // alert(JSON.stringify(state.index));
     this.setState({
         swiperIndex:state.index
     })
    }

     _renderPagination(index, total, context){
       return <View style={{ position: 'absolute',
      bottom: 0,
      right: 0}}>
      <Text style={{fontSize:16,color:"#fff",textAlign:'right',height:30,marginHorizontal:10}}>{index+1}/{total}</Text>
      </View>
     }
     _renderHeader() {
        let swiperHeight=160;
        if (this.props.navigation.state.params.type=="R") {
            return (
               <View style={{flex:1,position:'relative'}}> 
                <Swiper
                    height={200}
                    showsPagination={true}
                  //  activeDotColor={Colors.mianColor}
                    horizontal={true}
                    renderPagination={this._renderPagination.bind(this)}
                    onMomentumScrollEnd ={this._onMomentumScrollEnd.bind(this)}
                    removeClippedSubviews={false}
                   // dotColor="rgba(255,255,255,0.3)"

                    paginationStyle={{
                           bottom:0, right: 10,
                          
                         }}
                   
                >

                    <View style={{
                        width,
                        height: 200,
                        justifyContent: 'center',
                       
                    }} key="banner_1">

                        <Image resizeMode="stretch" style={{ width, height: 200 }} source={require('./timg.jpg')} />

                    </View>
                    <View style={{width, height: 200,justifyContent: 'center',backgroundColor: 'transparent'}} 
                     key="banner_1"
                     title={<Text numberOfLines={1}>Big lie behind Nine’s new show</Text>}
                    >

                        <Image resizeMode="stretch" style={{ width, height: 200 }} source={require('./timg.jpg')} />

                    </View>
               
                </Swiper>
                <View style={{position:'absolute',bottom:3,width,zIndex:999,height:30,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:10,backgroundColor:'transparent'}}>
                    <Text numberOfLines={1} style={{marginRight:10,fontSize:16,color:"#fff"}}>今日头条今日头条今日头条</Text>
                  
                </View>
           </View>
            )
        } else {
            return null;
        }
    }
    render(){
           let {goBack, state} = this.props.navigation;
        return(
            <View style={styles.contaier}>
                 <NavBar
                    title={state.params.title}
                    navBarbgColor={Colors.mianColor}
                    navBarLeft={true}
                    navBarLeftAction={() => goBack()}
                 //  navBarRight={() => this._navBarRight()}
                 />
                {state.params.type=="Z"?<ScrollableTabView
							   
                               
                                 tabBarBackgroundColor="#fff"
								 tabBarActiveTextColor={Colors.mianColor}
								 tabBarInactiveTextColor="#000"
								 tabBarUnderlineStyle={{backgroundColor:Colors.mianColor,height:2}}
								 tabBarTextStyle={{fontSize:16}}
								>
            
                    <SectionContent navigation={this.props.navigation} tabLabel="招工信息" type="Z"/>
                    <SectionContent navigation={this.props.navigation} tabLabel="农业技术支持" type="G"/> 
           </ScrollableTabView>:<MyListView
                    // swipeEnabled={true}
                    // animationEnabled={true}
                    removeClippedSubviews={false}
                    renderHeader={this._renderHeader.bind(this)} 
                    url={"http://121.40.241.28:7070/zhxz/app/newsAction.action?affType=" + state.params.type}
                    navigation={this.props.navigation}
                    showImg={true}
                />
                
                }
                 
                
            </View>
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
                   removeClippedSubviews={false}
                
                    url={"http://121.40.241.28:7070/zhxz/app/newsAction.action?affType=" +this.props.type}
                    navigation={this.props.navigation}
                    showImg={true}
            />
        )
    }
}
const styles = StyleSheet.create({
    contaier: {
        flex: 1,
        flexDirection: 'column'
    }
})