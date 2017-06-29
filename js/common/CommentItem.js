import React,{Component} from 'react'
import {
  View,
  Text,
  Image
}from 'react-native'
import Colors  from '../../res/style/colors'
import Tool from '../util/Tool';
export default class CommentItem extends  React.Component {
   constructor(props){
       super(props)
   }

  render(){
     let  data=this.props.item
     let commentType=data.pinfoName?true:false;
        return <View style={{flexDirection:'column',height:this.props.itemHeight, backgroundColor:"#fff",flexDirection:'column', padding: 10, justifyContent: 'space-between', borderBottomColor: Colors.dColor, borderBottomWidth: 0 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ height: 35, width: 35, tintColor: Colors.mianColor }} source={require('../../res/images/myIcon.png')} />
                    <Text style={{ fontSize: 16, marginLeft: 15, color: Colors.buleColor }}>{commentType?data.pinfoName:data.fbPerson}</Text>
                </View>
                <Text style={{ fontSize: 16, marginLeft: 15 }}>{Tool.format(data.createDate)}</Text>
            </View>
            <Text style={{  fontSize: 16, color: Colors.defaultFontColor }}>{commentType?data.commText:data.fbText}</Text>
        </View>
    }
}