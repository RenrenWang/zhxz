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
        let data=this.props.item;
       
         return(
             <View
             style={{marginTop:this.props.index==0?0:15,flexDirection:'column',height:this.props.itemHeight?this.props.itemHeight:210,borderBottomColor:Colors.dColor,borderBottomWidth:1}}
             >
             <TouchableOpacity>
                   <Image  style={{width,height:this.props.itemHeight}} source={{uri:'http://121.40.241.28:7070/zhxz/'+data.villMsuri}}/>
             </TouchableOpacity>
            
             </View>
         )
     }
}