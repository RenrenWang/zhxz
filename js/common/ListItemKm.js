import React, {PureComponent } from 'react';
import {

  StyleSheet,
  Text,
  View,

  Image,
  Dimensions,


  TouchableOpacity,
  TouchableHighlight,
   Platform,

} from 'react-native';
import _ from 'lodash';
const {width,height} = Dimensions.get('window');
import Tool from '../util/Tool';
import  Colors from '../../res/style/colors'
export  default  class ListItemImg extends  React.Component{
    constructor(props){
        super(props);
        
    }
     render(){
        let item=this.props.item
         return(
             <View
             style={{marginBottom:15,flexDirection:'column',height:this.props.itemHeight?this.props.itemHeight:210,borderBottomColor:"#dcdcdc"}}
             >
             <TouchableOpacity>
                   <Image  style={{width,height:this.props.itemHeight-45}} source={{uri:"http://121.40.241.28:7070/zhxz"+item.villAnnex}}/>
             </TouchableOpacity>
             <View style={{height:45,flexDirection:'row',justifyContent:'space-between',flex:1,backgroundColor:'#fff',paddingHorizontal:10,alignItems:'center'}}>
                  <Text style={{fontSize:16,color:"#000"}}>{item.villTitle}</Text>
                  <View style={{flexDirection:'row'}}>
                      <Text style={{fontSize:16,color:'#999'}}>{item.villSeat}</Text>
                      {/*<Image   style={{height:22,width:22,tintColor:"#999"}}  source={require('../../res/images/collectIcon.png')} />*/}
                  </View>
             </View>
             </View>
         )
     }
}