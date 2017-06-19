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

  _onPress(id,name){ console.log(JSON.stringify(this.props.navigation));
     return this.props.navigation.navigate("ProductDetail", {id});
   }
  render(){
    let data=this.props.item;
 //   alert(data.infoTitle);
    return (
     <TouchableOpacity   
    
    onPress={_.throttle(this._onPress.bind(this,data.infoId),1000,{

    'trailing': false
  })}
    style={{flex:1,flexDirection:'row',height:this.props.itemHeight-10,paddingHorizontal:10,paddingVertical:5,backgroundColor:'#fff'}}
   >
      <View  style={{flex:1,flexDirection:'row'}}>
        {/*resizeMode='stretch' */}
          {/*<Image  source={{uri:'http://118.178.224.224:6080/appsrv'+data.infoAnnex}} style={{width:this.props.itemHeight-10,height:this.props.itemHeigh-10}}/>*/}
          <View style={{flex:1,flexDirection:'column',justifyContent:'space-between'}}>
               <Text numberOfLines={2} style={{color:'#222',fontSize:16}}>{data.infoTitle}</Text>
               <Text numberOfLines={1} style={{color:'#999',fontSize:14}}>{data.infoDescription}</Text>
                <Text style={{color:'#999',fontSize:14}}>{Tool.format(data.createDate)}</Text>
               {/*<View style={{flex:1,marginTop:6,flexDirection:'row'}}>
                     <Text style={{color:'#999'}}>销量：{data.prdNums}</Text>
                     <Text style={{color:'#999',marginLeft:15,textDecorationLine:'line-through'}}>原价：{data.prdOldprice}</Text>
               </View>
               <Text style={{color:'red',fontSize:20}}><Text style={{color:'red',fontSize:14}}>￥</Text>{data.prdZkprice}</Text>*/}
          </View>
      </View>
     
      </TouchableOpacity>
    )
  }
}