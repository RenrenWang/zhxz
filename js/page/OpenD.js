import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import Colors from '../../res/style/colors'
import Tool from '../util/Tool';
import Loading from '../common/Loading';
export default class OpenD extends React.Component {

    constructor(props) {
        super(props)
        this.cancelable = null;
        this.state = {
            dataState: true,
            data: [],
            files: [],
            isLoading:true,
            isError:false,
            msg:"网络加载失败，请稍后重试..."

        }
    }


    componentDidMount() {

        this.getData();

    }
    componentWillUnmount() {
        if( this.cancelable)
        this.cancelable.cancel();
    }

    getData() {



        this.cancelable = Tool.makeCancelable(fetch('http://121.40.241.28:7070/zhxz/app/newsAction.action?affType=SF&infoId=' + this.props.navigation.state.params.id));


        this.cancelable.promise.then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.result == "fail") {


                } else if (responseJson.result == "success") {
                    console.log("------------" + JSON.stringify(responseJson));
                    this.setState({
                        data: responseJson.data[0],
                        files: responseJson.attachData,
                        isLoading:false
                    })
                }

            })
            .catch((error) => {
               this.setState({
                   isError:true
               })

            });

    }
    render() {
        let {goBack, state} = this.props.navigation;

        let data = (this.state.data);
     
        return(
             <View style={{flex: 1}}>
 {!this.state.isLoading&&!this.state.isError?
            <View style={{flexDirection: 'column', flex: 1,justifyContent:'center',backgroundColor:"#fff"}}>
               <ScrollView
                    horizontal={false}
                    style={{ flexDirection: 'column', flex: 1 }}>

                    <View style={{ flexDirection: 'column', padding: 5, justifyContent: 'space-between', borderBottomColor: Colors.dColor, borderBottomWidth: 1 }}>
                        <Text numberOfLines={2} style={{ fontSize: 19, color: "#222" }}>{data.infoTitle}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <Text>{Tool.format(data.createDate)}</Text>
                        </View>
                    </View>
                    <View style={{ padding: 5, marginTop: 10 }}>
                        <Text style={{ fontSize: 16, lineHeight:25,color:Colors.defaultFontColor}}>{data.infoDescription}</Text>
                        <View style={{paddingVertical:10,marginTop:15}}>

                            {this.state.files.map((item, index) => {
                            return item.lidType == "A" ? <Text style={{ color: '#1e90ff',fontSize: 16 }} key={index}>{Tool.fileName(item.lidFileuri)}</Text> :
                                <Imege key={index} style={{ flex: 1, height: 300 }} source={{ uri: 'http://121.40.241.28:7070/zhxz/' + item.lidFileuri }} />
                           })}
                        </View>
                    </View>

                </ScrollView >
                <View style={{alignItems:'center',backgroundColor:"#f3Color",flexDirection:'row',justifyContent:'center',height:50,backgroundColor:"#fff",borderTopWidth:1,borderTopColor:Colors.dColor}}>
                      <TouchableOpacity
                        style={styles.footerItem}
                       >
                        <Image  style={styles.icon} source={require('../../res/images/commentIcon.png')}/>  
                      </TouchableOpacity>
                       <TouchableOpacity
                        style={styles.footerItem}
                       >
                        <Image  style={styles.icon} source={require('../../res/images/sharIcon.png')}/>  
                     </TouchableOpacity>
                     <TouchableOpacity
                        style={styles.footerItem}
                       >
                        <Image  style={styles.icon} source={require('../../res/images/fontSizeIcon.png')}/>  
                     </TouchableOpacity>
                </View>
            </View>    
                :<Loading/>}
            </View>)
           
        
    }
}
const styles=StyleSheet.create({
    footerItem:{

        flex:1,
        justifyContent:'center',
        alignItems:'center'
       
    },
    icon:{
        height:25,
        width:25,
        justifyContent:'center',
        tintColor:Colors.c9Color
    }
})