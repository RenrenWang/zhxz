import  React,{Component} from 'react'
import{
    StyleSheet,
    View,
    Text,
    Image
} from  'react-native'
import Colors  from '../../res/style/colors'
import NavBar from '../common/NavBar'
export default class HotLine extends React.Component{
     static navigationOptions = {
    tabBarLabel: '服务热线',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../res/images/phoneIcon.png')}
       style={{tintColor:tintColor,height:28,width:28}}
      />
     ),
    };
       constructor(props){
           super(props)
       }
       render(){
           return(
               <View style={{flexDirection:'column'}}>
                  <NavBar
                    title={"服务热线"}
                    navBarbgColor={Colors.mianColor}
                    navBarLeftAction={() =>goBack()}
                  //  navBarRight={() => this._navBarRight()}
                 />
              
              </View>
           )
       }
}