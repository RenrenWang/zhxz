import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Colors from '../../res/style/colors'
import NavBar from '../common/NavBar'

import MyListView from '../common/MyListView'
const {width, height} = Dimensions.get('window');
export default class OpenPage extends React.Component {
    constructor(props) {
        super(props);
        // this.state.list = [

        // {
        //     name: "西岗镇", sub: [{ name: "村庄1" },
        //     { name: "村庄1" },
        //     { name: "村庄1" },
        //     { name: "村庄1" },
        //     { name: "村庄1" },
        //     { name: "村庄1" },
        //     { name: "村庄1" },
        //     { name: "村庄1" },
        //     { name: "村庄1" }]
        // },
        // {
        //     name: "西岗镇", sub: [{ name: "村庄2" },
        //     { name: "村庄1" },
        //     { name: "村庄1" },
        //     { name: "村庄1" },
        //     { name: "村庄1" }]
        // },
        // {
        //     name: "西岗镇", sub: [{ name: "村庄3" },
        //     { name: "村庄1" },
        //     { name: "村庄1" },
        //     { name: "村庄1" },
        //     { name: "村庄1" }]
        // },
        // {
        //     name: "西岗镇", sub: [{ name: "村庄4" },
        //     { name: "村庄1" },
        //     { name: "村庄1" },
        //     { name: "村庄1" },
        //     { name: "村庄1" }]
        // },
        // {
        //     name: "西岗镇", sub: [{ name: "村庄5" },
        //     { name: "村庄1" },
        //     { name: "村庄1" },
        //     { name: "村庄1" },
        //     { name: "村庄1" }]
        // },
        // {
        //     name: "西岗镇", sub: [{ name: "村庄6" },
        //     { name: "村庄1" },
        //     { name: "村庄1" },
        //     { name: "村庄1" },
        //     { name: "村庄1" }]
        // }
        // ];
        this.state = {
            showFNumber: 0,

            showSub: false,
            pId: 0,
            sId: 0,
            all: true,
            list: [],
            villList: [],
            _townId:0
        }
        this.selectFilter = this.selectFilter.bind(this)
    }

    getJSON(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.result = "success")
                        resolve(responseJson);
                    else if (responseJson.result = "fail")
                        reject(responseJson.msg)
                })
                .catch((error) => {
                    reject(error);
                });

        });
    }
    componentDidMount() {
        // data.data.map((item, i) => {
        //           list.push(item);
        //         this.getJSON('http://121.40.241.28:7070/zhxz/app/baseDataAction.action?&dataType=VILL&townId=' + item.townId)
        //             .then((data) => {
        //                 data.data.map((subItem, subI) => {
        //                     list[i]['sub'].push(subItem);
        //                 })

        //                 this.setState({
        //                     list
        //                 })
        //             })

        //     })
        this.getJSON('http://121.40.241.28:7070/zhxz/app/baseDataAction.action?dataType=TOWN')
            .then((data) => {
              //  alert(JSON.stringify(data));
                this.setState({
                    list: data.data
                })
            })



    }

    getVillList(townId) {

        this.getJSON('http://121.40.241.28:7070/zhxz/app/baseDataAction.action?dataType=VILL&townId=' + townId)
            .then((data2) => {

                if (data2.data && data2.data.length > 0) {
                    this.setState({
                        villList: data2.data
                    })

                } else {
                    this.setState({
                        villList: []
                    })
                }


            })



    }
    selectFilter(townId, i) {
        if (i == "all") {
            this.setState({
                all: true,
               _townId:0,
               sId:0,
                showSub:false
            })
        } else {
            this.getVillList(townId);
            this.setState({
              
                showFNumber: i,
                all: false,
                sId:0,
                showSub: i == this.state.showFNumber ? !this.state.showSub : true,

            })
        }

    }
    selectSub(sId) {

        this.setState({

            showSub: false,
            sId
          

        });
      
    }

    /*renderFilterSub(){
         return <FilterSub sub={this.state.list[this.state.showFNumber]['sub']}/>;
        return  <View style={{flexDirection:'row',justifyContent:'center',flexWrap:'wrap',backgroundColor:"#fff",borderTopWidth:1,borderColor:Colors.hColor}}>
                     {
                         
                        this.state.list[this.state.showFNumber]['sub'].map((item,index)=>{
                            return <TouchableOpacity  onPress={()=>this.selectSub(index)} key={index} style={{paddingVertical:10,width:width/5,alignItems:'center',justifyContent:'center'}}>
                                     <Text style={{color:index==this.state.showSubNumber?Colors.mianColor:"#222",textAlign:'center',fontSize:14}}>{item.name}</Text>
                                 </TouchableOpacity>
                         })
                     }
              </View>
     }*/

    renderFilter() {
        // let sublist = [];
        // this.state.list.map((item, i) => {
        //     sublist.push(<FilterSub sub={item['sub']} key={i} index={i} active={this.selectSub.bind(this)} show={this.state.showFNumber == i} />)
        // })
        console.log(JSON.stringify(this.state.villList));
        return (
            <View style={{ flexDirection: "column", position: 'relative' }}>
                <View style={{ zIndex: 2, height: 50, flexDirection: "row", alignItems: 'center', backgroundColor: '#fff', borderBottomWidth: 2, borderBottomColor: Colors.hColor }}>
                    <TouchableOpacity onPress={() => this.selectFilter("all")} style={{ flex: 1, flexDirection: "column", justifyContent: 'center' }}>
                        <Text style={{ color: this.state.all ? Colors.mianColor : "#222", textAlign: 'center', fontSize: 14 }} >全部</Text>
                  
                    </TouchableOpacity>

                    {
                        this.state.list.map((item, i) => {
                            return (
                                <TouchableOpacity onPress={() => this.selectFilter(item.townId, i)} key={i} style={{ flex: 1, flexDirection: "column", justifyContent: 'center' }}>
                                    <Text style={{ color: (i == this.state.showFNumber) ? Colors.mianColor : "#222", textAlign: 'center', fontSize: 14 }} >{item.townTitle}</Text>
                                    {/*{this.state.pId==i?<Text style={{textAlign:'center',fontSize:12}}>{item['sub'][this.state.sId]['name']}</Text>:null}*/}
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>


                <View style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 1, height: 15 },
                    shadowOpacity: 0.4,
                    shadowRadius: 1,
                    elevation: 2, flexDirection: "column", position: 'absolute', zIndex: 1, top: 50, transform: [{ translateY: !this.state.all && this.state.showSub ? 0 : -999 }]
                }}>
                    <FilterSub sub={this.state.villList}  active={this.selectSub.bind(this)} />
                </View>


            </View>
        )
    }
    render() {
        console.log(this.state.list);
        let {goBack, state} = this.props.navigation;
        return (
           <View style={styles.contaier}>
                <NavBar
                    title={state.params.title}
                    navBarbgColor={Colors.mianColor}
                    navBarLeft={true}
                    navBarLeftAction={() => goBack()}
                //  navBarRight={() => this._navBarRight()}
                />
               
               
               {/*{this.renderFilter()} */}
             
               <SelectBox/>
                <MyListView
                    // swipeEnabled={true}
                    // animationEnabled={true}
                    // removeClippedSubviews={false}
                    url={"http://121.40.241.28:7070/zhxz/app/newsAction.action?affType=" + state.params.type + (this.state._townId != 0 ? "&townId=" + this.state._townId : "") + (this.state.sId != 0 ? "&villId=" + this.state.sId : "")}
                    navigation={this.props.navigation}
                    showImg={false}
                />
            </View>
        )
    }
}

class  SelectBox extends  React.Component{
    constructor(props) {
        super(props);
         this.state = {
            _isShow: false
        }
    }
    showModel(){
       this.setState({
           _isShow:!this.state._isShow
       })
    }
    render(){
         let mheight=this.state._isShow?height:0;
        return(
          <View style={{position:'relative'}}>
               <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:45,borderBottomWidth:1,borderColor:Colors.hColor,backgroundColor:"#fff"}}>
                   <TouchableOpacity 
                      onPress={this.showModel.bind(this)}  
                      style={{flex:1,flexDirection:'row',height:45,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:Colors.hColor}}>
                   
                            <Text  style={{color:"#999",fontSize:16}}>选择乡镇</Text>
                            <Image style={{tintColor:"#999",height:22,width:22,marginLeft:10}} source={require('../../res/images/alow.png')}/>
                    
                   </TouchableOpacity>
                  <TouchableOpacity 
                      onPress={this.showModel.bind(this)}  
                      style={{flex:1,flexDirection:'row',height:45,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:Colors.hColor}}>
                   
                            <Text  style={{color:"#999",fontSize:16}}>选择乡镇</Text>
                            <Image style={{tintColor:"#999",height:22,width:22,marginLeft:10}} source={require('../../res/images/alow.png')}/>
                    
                   </TouchableOpacity>
              </View>
              <View style={{flex:1,position:'absolute',zIndex:10,backgroundColor:'#ff0',width,top:45,height:mheight}}></View>
          </View>
        )
    }
}
class FilterSub extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showSubNumber: 0,
        }
    }

    selectSub(i) {

        this.setState({


            showSubNumber: i

        })
        this.props.active(i);
    }
    render() {
        //color: index == this.state.showSubNumber ? Colors.mianColor : "#222",
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: Colors.hColor }}>
                {
                    this.props.sub ? this.props.sub.map((item, index) => {
                        return <TouchableOpacity onPress={() => this.selectSub(item.villId)} key={index} style={{ paddingVertical: 10, width: width / 5, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{  textAlign: 'center', fontSize: 12 }}>{item.villTitle}</Text>
                        </TouchableOpacity>
                    }) : null

                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contaier: {
        flex: 1,
        flexDirection: 'column'
    }
})