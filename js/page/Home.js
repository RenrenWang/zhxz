import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    StatusBar,
    Platform

} from 'react-native'
import _ from 'lodash';
import Swiper from 'react-native-swiper'
import Colors from '../../res/style/colors'
import CommonStyles from '../../res/style/commonStyles'
import { NavigationActions } from 'react-navigation'
const {width, height} = Dimensions.get('window');
import Login  from  './Login';
export default class Home extends React.Component {
    static navigationOptions = {
        tabBarLabel: '主页',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../res/images/homeIcon.png')}
                style={{ tintColor: tintColor, height: 28, width: 28 }}
            />
        ),
    };
    constructor(props) {
        super(props)
        this.state = {
            swiperShow: false,
            user:null,
            imgs:[]
        }
      
    }

    componentDidMount() {
     
    

      storage.load({
            key: 'user',
        }).then(ret => {
                 
            fetch('http://121.40.241.28:7070/zhxz/app/newsAction.action?affType=HI')
.then((response) => response.json())
            .then((responseJson) => {
               this.setState({
                    imgs:responseJson.data
                  })
                     setTimeout(() => {
            this.setState({
                swiperShow: true
            })
        }, 0)
})      
        
          
        }).catch(err => {
              const resetAction = NavigationActions.reset({
                                        index:0,
                                        actions: [
                                            NavigationActions.navigate({ routeName: 'Login' })
                                        ]
                    })
            this.props.navigation.dispatch(resetAction)

        })
       
       
       
    }
    renderColumn() {
        let style = {
            icon: {
                width: 40,
                height: 40
            },
            font: {
                marginTop:5,
                fontSize: 15,
                color: "#fff"
            },
            item: {

                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }
        }
        return (
            <View style={{ marginBottom: 8, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.mianColor }}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={_.throttle(this.OpenToUrlT.bind(this, "TXW", "淘乡味"), 1000, {

                        'trailing': false
                    })}
                    style={[style.item, { borderRightWidth: .5, borderColor: '#fff' }]}
                >

                    <Image style={style.icon} source={require('../../res/images/xclp.png')} />
                    <Text style={style.font}>淘乡味</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={_.throttle(this.OpenToUrlT.bind(this, "CharmVillage", "魅力村庄"), 1000, {

                        'trailing': false
                    })}
                    style={[style.item, { borderRightWidth: 0 }]}
                >

                    <Image style={style.icon} source={require('../../res/images/mlcz.png')} />
                    <Text style={style.font}>魅力村庄</Text>

                </TouchableOpacity>
            </View>
        )
    }

    renderSwiper() {
        let swiperHeight = 160;
        if (this.state.swiperShow) {
            return (

                <Swiper
                    height={swiperHeight}

                    activeDotColor={Colors.mianColor}
                    horizontal={true}


                    removeClippedSubviews={false}
                    dotColor="rgba(255,255,255,0.3)"

                    paginationStyle={{
                        bottom: 10, left: 0, right: 10
                    }}

                >
                 {this.state.imgs.map((item,index)=>{
                  return  <View style={{
                        width,
                        height: swiperHeight,
                        justifyContent: 'center',
                        backgroundColor: 'transparent'
                    }} key={index}>

                        <Image 
                        resizeMode="stretch"
                        
                         style={{ width, height: swiperHeight }} source={{uri:'http://121.40.241.28:7070/zhxz/'+item.lpUri}} />

                    </View>
                 })}
                   

                </Swiper>

            )
        } else {
            return <View style={{ width, height: 200, backgroundColor: "#fff" }}></View>
        }
    }
    OpenToUrl(url, title, type) {

        this.props.navigation.navigate(url, { title, type });
    }
    OpenToUrlT(url, title) {
        this.props.navigation.navigate(url, { title });
    }
    renderGrid() {
        let list = [{
            icon: require('../../res/images/ZwIcon.png'),
            title: '政务公开',
            iconColor: '#2db3e8',
            toUrl: 'OpenPage',
            type: "V"
        },
        {
            icon: require('../../res/images/DwIcon.png'),
            title: '党务公开',
            iconColor: '#06ba8d',
            toUrl: 'OpenPage',
            type: "D"
        },
        {
            icon: require('../../res/images/CwIcon.png'),
            title: '财务公开',
            iconColor: '#f96267',
            toUrl: 'OpenPage',
            type: "C"
        },
        {
            icon: require('../../res/images/noiceIcon.png'),
            title: '通知公告',
            iconColor: '#f2e690',
            type: "T",
            toUrl: "Information"
        }, {
            icon: require('../../res/images/newsIcon.png'),
            title: '热点新闻',
            iconColor: '#f2e690',
            toUrl: 'Information',
            type: "R"
        },
        // ,{
        //     icon:require('../../res/images/helpIcon.png'),
        //     title:'邻里帮',
        //      iconColor:'#0bb791',
        //       toUrl:'OpenPage',
        //        type:"C"
        // },
        {
            icon: require('../../res/images/hmIcon.png'),
            title: '惠民服务',
            iconColor: '#2bb4eb',
            toUrl: 'Information',
            type: "Z"
        },
        {
            icon: require('../../res/images/xcIcon.png'),
            title: '乡村民宿',
            iconColor: '#2bb4eb',
            toUrl: 'XCMS',

        }]
        return (
            <View style={{ marginTop: 8, flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#fff' }}>
                {list.map((item, i) => {
                    return <View key={i} style={{ borderRightWidth: 1, borderBottomWidth: 1, borderColor: Colors.hColor, paddingVertical: 10, width: width / 3 }}>
                        <TouchableOpacity onPress={_.throttle(this.OpenToUrl.bind(this, item.toUrl, item.title, item.type), 1000, {

                            'trailing': false
                        })} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <View>
                                  <Image style={{ height: 35, width: 35, tintColor: item.iconColor }} source={item.icon} />
                            </View>
                            <Text style={{ marginTop: 5 }}>{item.title}</Text>
                        </TouchableOpacity>
                    </View>
                })}

            </View>
        )
    }

 

    // componentDidUpdate() {
       

        
    // }


    render() {

         
        return (
            
          <View style={styles.contaier}>
                <StatusBar
                    backgroundColor={Colors.mianColor}
                    barStyle="light-content"
                    style={{ height: Platform.OS === 'ios' ? 30 : 0 }}
                />
                <View
                    style={{ paddingHorizontal: 10, height: 45, flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.mianColor }}>
                    <TouchableOpacity
                        activeOpacity={.5}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                style={{ height: 30, width: 30, borderColor: '#fff', borderWidth: 2, borderRadius: 15 }}
                                source={require('../../res/images/logo.png')} />
                            <Text style={{ marginLeft: 8, fontSize: 16, color: "#fff" }}>智慧乡镇</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    style={styles.contaier}
                    scrollEnabled={true}>
                    {this.renderColumn()}
                    {this.renderSwiper()}
                    {this.renderGrid()}
                </ScrollView>
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