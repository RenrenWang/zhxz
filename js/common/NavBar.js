import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
   TouchableOpacity,
  StatusBar,
   Platform
} from 'react-native';
const STATUS_BAR_HEIGHT=30;
import  Colors from '../../res/style/colors'
 /*{this.props.title?
               <View  style={styles.navBarCenter}>
                       <Text style={[styles.tips,styles.navBartitleStyle]}>{this.props.title}</Text>
               </View>:
               <TouchableOpacity style={[styles.navBarCenter,styles.selectbox]}>
                       <Image source={require('../../res/images/select.png')} style={[styles.nabBaricon,styles.selectIcon]}/>
                       <Text style={styles.tips}>{this.state.text}</Text>
                     
               </TouchableOpacity>}*/
export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state =({ text: '搜索商品' });
  }
  render() {
    return (
 <View style={[styles.navBar,{backgroundColor:this.props.navBarbgColor?this.props.navBarbgColor:'#000'}]}>    
    <StatusBar
     backgroundColor={Colors.mianColor}
     barStyle="light-content"
     style={{height:Platform.OS==='ios'?STATUS_BAR_HEIGHT:0}}
   /> 
           {  this.props.navBarLeft?  
              <View style={styles.navBarLeft} >
                 <TouchableOpacity onPress={()=>this.props.navBarLeftAction()}>{/**/}
                        <Image source={require('../../res/images/arrow.png')} style={[styles.nabBaricon,styles.leftIcon]}/>
                 </TouchableOpacity>
              </View>:null
        }
              <View  style={styles.navBarCenter}>
                       <Text style={[styles.tips,styles.navBartitleStyle]}>{this.props.title}</Text>
             </View>
            {
               this.props.navBarRight?  
               <View style={styles.navBarRight}>
                     
                          <Text style={[styles.tips,styles.navBartitleStyle]}>dsdsds</Text>
               </View>:null
            }
        </View>
    );
  }
}

const styles=StyleSheet.create({
    navBar:{
    
       flexDirection:'row',
       alignItems:'center',
       height:50,
      
       paddingHorizontal:10,
       justifyContent:'space-between',
       
    },
    nabBaricon:{
     tintColor:"#fff",
     width:25,
     height:25
    },
    navBarLeft:{
      flexDirection:'row'
    },
    navBarRight:{
     
       flexDirection:'row'
    },
    selectIcon:{
      width:26,
     height:26
    },
    tips:{
     color:"#fff",
     fontSize:14,
     marginLeft:5,
    },
    navBarCenter:{
      position:'absolute',
      height:30,
     
      left:50,
      right:50,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
  
     // borderRadius:15,
    //  paddingHorizontal:15,
  },
  navBartitleStyle:{
    fontSize:18,
   textAlign:'center'
   
  },
  selectbox:{
    borderBottomWidth:1,
    borderColor:"#fff",
  }
})

