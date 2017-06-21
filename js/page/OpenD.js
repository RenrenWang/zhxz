import  React,{Component} from 'react'
import{
    StyleSheet,
    View,
    Text,
    Image
} from  'react-native'
import Colors  from '../../res/style/colors'
import Tool from '../util/Tool';
export default class OpenD extends React.Component{
 
       constructor(props){
           super(props)
            this.cancelable=null;
            this.state={
                dataState:true,
                data:[],
                    files:[]
                
            }
       }


  componentDidMount(){

             this.getData();

   }
     componentWillUnmount(){
  
      this.cancelable.cancel();
  }

     getData() {
  
  
        
       this.cancelable=Tool.makeCancelable(fetch('http://121.40.241.28:7070/zhxz/app/newsAction.action?affType=SF&infoId='+this.props.navigation.state.params.id));
     
 
       this.cancelable.promise.then((response) => response.json())
        .then((responseJson) => {
                 
            if(responseJson.result=="fail"){
                    
                    
            }else if(responseJson.result=="success"){
             console.log("------------"+JSON.stringify(responseJson));
                this.setState({
                    data:responseJson.data[0],
                    files:responseJson.attachData
                })
            }
                
        })
      .catch((error) => {
         console.log(error);
       
      });
  
  }
       render(){
       let {goBack, state} = this.props.navigation;
         
        let data=(this.state.data);
        // alert(JSON.stringify(this.state.files));
        // console.log(JSON.stringify(data));
           return(
             <View style={{flexDirection:'column',flex:1}}>
                  <View style={{flexDirection:'column',padding:5,justifyContent:'space-between',borderBottomColor:Colors.dColor,borderBottomWidth:2}}>
                        <Text  numberOfLines={2}  style={{fontSize:17,color:"#222"}}>{data.infoTitle}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                            <Text>{Tool.format(data.createDate)}</Text> 
                        </View>
                  </View>
                 <View style={{paddingHorizontal:5,marginTop:10}}>
                         <Text style={{fontSize:16}}>{data.infoDescription}</Text>
                         {this.state.files.map((item,index)=>{
                           return  item.lidType=="A"?<Text>{Tool.fileName(item.lidFileuri)}</Text>:
                             <Imege  style={{flex:1,height:300}} source={{uri:'http://121.40.241.28:7070/zhxz/'+item.lidFileuri}}/>
                         })}
                 </View>
             </View>
           )
       }
}