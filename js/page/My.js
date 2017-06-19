import  React,{Component} from 'react'
import{
    StyleSheet,
    View,
    Text,
    Image
} from  'react-native'
import Colors  from '../../res/style/colors'
export default class My extends React.Component{
     static navigationOptions = {
    tabBarLabel: '我的',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../res/images/myIcon.png')}
       style={{tintColor:tintColor,height:28,width:28}}
      />
     ),
    };
       constructor(props){
           super(props)
       }
       render(){
           return(
               <View>
                    <Text>home</Text>
              </View>
           )
       }
}