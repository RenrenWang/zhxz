import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
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
            list: []
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
           
                   this.setState({
                                list:data.data
                  })
            })

    }
    selectFilter(i) {
        if (i == "all") {
            this.setState({
                all: true
            })
        } else {
            this.setState({
                showFNumber: i,
                all: false,
                showSub: i == this.state.showFNumber ? !this.state.showSub : true,

            })
        }




    }
    selectSub(pId, sId) {

        this.setState({

            showSub: false,
            sId,
            pId

        });
        console.log("pId--->" + pId);
        console.log("sId--->" + sId);
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
        let sublist = [];
        this.state.list.map((item, i) => {
            sublist.push(<FilterSub sub={item['sub']} key={i} index={i} active={this.selectSub.bind(this)} show={this.state.showFNumber == i} />)
        })

        return (
            <View style={{ flexDirection: "column", position: 'relative' }}>
                <View style={{ zIndex: 2, height: 50, flexDirection: "row", alignItems: 'center', backgroundColor: '#fff', borderBottomWidth: 2, borderBottomColor: Colors.hColor }}>
                    {/*<TouchableOpacity onPress={() => this.selectFilter("all")} style={{ flex: 1, flexDirection: "column", justifyContent: 'center' }}>
                        <Text style={{ color: this.state.all ? Colors.mianColor : "#222", textAlign: 'center', fontSize: 14 }} >全部</Text>
                       {this.state.pId==i?<Text style={{textAlign:'center',fontSize:12}}>{item['sub'][this.state.sId]['name']}</Text>:null}  
                    </TouchableOpacity>*/}

                    {
                        this.state.list.map((item, i) => {
                            return (
                                <TouchableOpacity onPress={() => this.selectFilter(i)} key={i} style={{ flex: 1, flexDirection: "column", justifyContent: 'center' }}>
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
                    {sublist}
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
                {this.renderFilter()}

                <MyListView
                    // swipeEnabled={true}
                    // animationEnabled={true}
                    // removeClippedSubviews={false}
                    url={"http://121.40.241.28:7070/zhxz/app/newsAction.action?affType=" + state.params.type}
                    navigation={this.props.navigation}
                />
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
        this.props.active(this.props.index, i);
    }
    render() {
        return (
            this.props.show ? <View style={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: Colors.hColor }}>
                {
                    this.props.sub ? this.props.sub.map((item, index) => {
                        return <TouchableOpacity onPress={() => this.selectSub(index)} key={index} style={{ paddingVertical: 10, width: width / 5, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: index == this.state.showSubNumber ? Colors.mianColor : "#222", textAlign: 'center', fontSize: 12 }}>{item.name}</Text>
                        </TouchableOpacity>
                    }) : null

                }
            </View> : null
        )
    }
}

const styles = StyleSheet.create({
    contaier: {
        flex: 1,
        flexDirection: 'column'
    }
})