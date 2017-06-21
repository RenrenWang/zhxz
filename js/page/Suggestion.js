import  React,{Component} from 'react'
import{
    StyleSheet,
    View,
    Text,
    Image
} from  'react-native'
import Colors  from '../../res/style/colors'
import NavBar from '../common/NavBar'
export default class Suggestion extends React.Component{
     static navigationOptions = {
    tabBarLabel: '意见反馈',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../res/images/suggestionIcon.png')}
       style={{tintColor:tintColor,height:23,width:23}}
      />
     ),
    };
       constructor(props){
           super(props)
           this.title="意见反馈";  
       }
       render(){
              let {goBack,state}=this.props.navigation;
           return(
               <View>
                     <NavBar
                    title={this.title}
                    navBarbgColor={Colors.mianColor}
                    navBarLeftAction={() =>goBack()}
                  //  navBarRight={() => this._navBarRight()}


                />
              </View>
           )
       }
}