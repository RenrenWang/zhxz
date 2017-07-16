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
    Platform,
    TextInput

} from 'react-native'


import { NavigationActions } from 'react-navigation';
import Colors from '../../res/style/colors'


import CommonStyles from '../../res/style/commonStyles'
import NavBar from '../common/NavBar'
import MyListView from '../common/MyListView'

const {width, height} = Dimensions.get('window');
export default class TXWHome extends React.Component {
  static navigationOptions = {
    tabBarLabel: '淘乡味',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
       source={require('../../res/images/txwHomeIcon.png')}
       style={{tintColor: tintColor, height: 22, width: 22 }}
      />
    ),
  };
  constructor(props){
    super(props);
    this.placeholder="搜索";
    this.state={
        text:"",
        defaultText:true
    }
  }
  render() {
       let {goBack, state} = this.props.navigation;
      
    return (
      <View style={styles.contaier}>
           <View style={{backgroundColor:'#eee',padding:10}}>
               <TextInput
                underlineColorAndroid='transparent'
                 style={{textAlign:"center",color:"#999",borderRadius:5,backgroundColor:'#fff',height: 40,borderColor:"#dcdcdc", borderWidth:1}}
                 onChangeText={(text) => this.setState({text})}
                 value={this.state.text}
                  placeholder={this.placeholder}
               />
           </View>
             <MyListView
                    // swipeEnabled={true}
                    // animationEnabled={true}
                    // removeClippedSubviews={false}
                    url={"http://121.40.241.28:7070/zhxz/app/newsAction.action?affType=TF"+(this.state.text!=""?("&specName="+this.state.text):"")+"&isCollentFlag=N"}
                    navigation={this.props.navigation}
                    showImg={false}
                    itemType={2}
           />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    contaier: {
        flex: 1,
        flexDirection: 'column'
    }
})