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

export default class ListIttem extends React.PureComponent{
   constructor(props) {
      super(props);

   }
 
  _onPress(id){ 
     return this.props.navigation.navigate("OpenD", {id});
   }
  render(){
    let data=this.props.item;
 //   alert(data.infoTitle);
    return (
     <TouchableOpacity   
    
    onPress={_.throttle(this._onPress.bind(this,data.infoId),1000,{

    'trailing': false
  })}
    style={{flex:1,flexDirection:'row',height:this.props.itemHeight-20,paddingHorizontal:10,paddingVertical:10,backgroundColor:'#fff'}}
   >
      <View  style={{flex:1,flexDirection:'row'}}>
        {/*resizeMode='stretch' */}
          <View style={{flex:1,flexDirection:'column',justifyContent:'space-between'}}>
               <Text numberOfLines={2} style={{color:'#222',fontSize:16}}>{data.infoTitle}</Text>
               {/*<Text numberOfLines={1} style={{color:'#999',fontSize:14}}>{data.infoDescription}</Text>*/}
               <View style={{flexDirection:'row'}}>
                      <Text style={{color:'#999',fontSize:14}}>{Tool.format(data.createDate)}</Text>
                      {data.townTitle&&data.townTitle!=""?<Text style={{marginLeft:10}}>{data.townTitle}</Text>:null}
                      {data.villTitle&&data.villTitle!=""?<Text style={{marginLeft:10}}>{data.villTitle}</Text>:null}
               </View>
             
              
               {/*<View style={{flex:1,marginTop:6,flexDirection:'row'}}>
                     <Text style={{color:'#999'}}>销量：{data.prdNums}</Text>
                     <Text style={{color:'#999',marginLeft:15,textDecorationLine:'line-through'}}>原价：{data.prdOldprice}</Text>
               </View>
               <Text style={{color:'red',fontSize:20}}><Text style={{color:'red',fontSize:14}}>￥</Text>{data.prdZkprice}</Text>*/}
          </View>
         {data.infoAnnex&&this.props.showImg?<Image  source={{uri:'http://121.40.241.28:7070/zhxz/'+data.infoAnnex}} style={{marginLeft:10,width:this.props.itemHeight-15,height:this.props.itemHeigh-30}}/>
          :null}
      </View>
     
      </TouchableOpacity>
    )
  }
}