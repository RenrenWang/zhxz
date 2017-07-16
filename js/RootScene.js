/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    AsyncStorage,
    DeviceEventEmitter
} from 'react-native';
import WelcomePage from './page/WelcomePage'
import Home from './page/Home'
import Suggestion from './page/Suggestion'
import HotLine from './page/HotLine'
import My from './page/My'
import OpenPage from './page/OpenPage'
import OpenD from './page/OpenD'
import Information from './page/Information'
import TXWHome from './page/TXWHome'
import TXWCollect from './page/TXWCollect'
import TXWD from './page/TXWD'
import PutUp from './page/PutUp'
import XCMSCollect from './page/XCMSCollect'
import XCMXD from './page/XCMXD'

import CharmVillage from './page/CharmVillage'
import CharmVillageD from './page/CharmVillageD'

import Comment from './page/Comment'
import Login from './page/Login'
import Register from './page/Register'
import ResetPassword from './page/ResetPassword'
import UserInfo from './page/UserInfo'
import About from './page/About'
import NavBar from './common/NavBar'
import Colors from '../res/style/colors'
// import WelcomePage from './page/WelcomePage'
import Storage from 'react-native-storage';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
import { NavigationActions } from 'react-navigation'

global.storage=new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,

  // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  // 如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend: AsyncStorage,
    
  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: 1000 * 3600 * 24*30,
    
  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,
    
  // 如果storage中没有相应数据，或数据已过期，
  // 则会调用相应的sync方法，无缝返回最新数据。
  // sync方法的具体说明会在后文提到
  // 你可以在构造函数这里就写好sync的方法
  // 或是写到另一个文件里，这里require引入
  // 或是在任何时候，直接对storage.sync进行赋值修改
  
})  


const XCMS = TabNavigator({
    PutUp: {
        screen: PutUp,

        navigationOptions: ({navigation}) => ({
     

        })

    },
    XCMSCollect: {
        screen: XCMSCollect,

        navigationOptions: ({navigation}) => ({


        })

    }



},
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',

        lazy: true,
        // initialRouteName: "Home",
        swipeEnabled: false,

        animationEnabled: false,
        tabBarOptions: {

            style: {
                height: 50,
            },
            showIcon: true,
            indicatorStyle: { height: 0 },

            //activeBackgroundColor:"#e64275",
            activeTintColor: Colors.mianColor,
            labelStyle: {
                fontSize: 13
            }
        }
    }


);
const TXW = TabNavigator({
    TXWHome: {
        screen: TXWHome,

        navigationOptions: ({navigation}) => ({
         title: "dsadas",

        })

    },
    TXWCollect: {
        screen: TXWCollect,

        navigationOptions: ({navigation}) => ({


        })

    }



},
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',

        lazy: true,
        // initialRouteName: "Home",
        swipeEnabled: false,

        animationEnabled: false,
        tabBarOptions: {

            style: {
                height: 50,
            },
            showIcon: true,
            indicatorStyle: { height: 0 },

            //activeBackgroundColor:"#e64275",
            activeTintColor: Colors.mianColor,
            labelStyle: {
                fontSize: 13
            }
        }
    }


);

const TabScreen = TabNavigator({
    Home: {
        screen: Home,

        navigationOptions: ({navigation}) => ({


        })

    },
    Suggestion: {
        screen: Suggestion,

   

    },
    HotLine: {
        screen: HotLine,


    },
    My: {
        screen: My,

        navigationOptions: ({navigation}) => ({


        })

    },

},
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',

        lazy: true,
        // initialRouteName: "Home",
        swipeEnabled: true,

        animationEnabled: false,
        tabBarOptions: {
            tabStyle: {
                backgroundColor: "#f00"
            },
            style: {
                height: 50,

            },
            showIcon: true,
            indicatorStyle: { height: 0 },

            //activeBackgroundColor:"#e64275",
            activeTintColor: Colors.mianColor,
            
        }
    }


);

const RootScene = StackNavigator({
    // WelcomePage: {
    //   screen: WelcomePage,
    // },
    TabScreen: {
        screen: TabScreen,
    },
    OpenPage: {
        screen: OpenPage,
    },
    Information: {
        screen: Information,
    },
    TXW: {
        screen: TXW,
       navigationOptions: ({navigation}) => ({
         header:()=><NavBar
                    title={navigation.state.index==0?"淘乡味":"收藏"}
                    navBarbgColor={Colors.mianColor}
                    navBarLeft={true}
                    navBarLeftAction={()=>navigation.goBack()}
                 //  navBarRight={() => this._navBarRight()}
         />,
       }), 
    },

    TXWD: {
      screen: TXWD,
       navigationOptions: ({navigation}) => ({
         header:()=><NavBar
                    title={"淘乡味详情"}
                    navBarbgColor={Colors.mianColor}
                    navBarLeft={true}
                    navBarLeftAction={()=>navigation.goBack()}
                 //  navBarRight={() => this._navBarRight()}
         />,
       }), 
    },
    
    XCMS:{
           screen: XCMS,
       navigationOptions: ({navigation}) => ({
         header:()=><NavBar
                    title={navigation.state.index==0?"乡村民宿":"收藏"}
                    navBarbgColor={Colors.mianColor}
                    navBarLeft={true}
                    navBarLeftAction={()=>navigation.goBack()}
                 //  navBarRight={() => this._navBarRight()}
         />,
       }), 
    },

    CharmVillage:{
         screen: CharmVillage,
        navigationOptions: ({navigation}) => ({
         header:()=><NavBar
                    title={"魅力村庄"}
                    navBarbgColor={Colors.mianColor}
                    navBarLeft={true}
                    navBarLeftAction={()=>navigation.goBack()}
                 //  navBarRight={() => this._navBarRight()}
         />,
       }), 
    },
  
     CharmVillageD:{
         screen: CharmVillageD,
        navigationOptions: ({navigation}) => ({
         header:()=><NavBar
                    title={"魅力村庄详情"}
                    navBarbgColor={Colors.mianColor}
                    navBarLeft={true}
                    navBarLeftAction={()=>navigation.goBack()}
                 //  navBarRight={() => this._navBarRight()}
         />,
       }),
     },
     
XCMXD:{
         screen: XCMXD,
        navigationOptions: ({navigation}) => ({
         header:()=><NavBar
                    title={"乡村民宿详情"}
                    navBarbgColor={Colors.mianColor}
                    navBarLeft={true}
                    navBarLeftAction={()=>navigation.goBack()}
                 //  navBarRight={() => this._navBarRight()}
         />,
       }),
     },
    OpenD:{
         screen: OpenD,
         navigationOptions: ({navigation}) => ({
         header:()=>{
            //  alert(JSON.stringify(navigation));
            let type=null;
             switch(navigation.state.params.type){
                case 'V':
                type="政务公开详情";break;
                case 'D':
                type="党务公开详情";break;
                case "C":
                type="财务公开详情";break;
                case "Z":
                type="招工信息详情";break;
                case "G":
                type="农业技术支持详情";break;
               case "R":
               type="热点新闻详情";break;
                case "T":
               type="通知公告详情";break;
                default:
                type="详情";break;
             }
           return <NavBar
                    title={type}
                    navBarbgColor={Colors.mianColor}
                    navBarLeft={true}
                   
                    navBarLeftAction={()=>navigation.goBack()}
                     />
                }
                 //  navBarRight={() => this._navBarRight()}
        
       }), 
    },
       Comment:{
         screen: Comment,
        navigationOptions: ({navigation}) => ({
         header:()=><NavBar
                    title={"全部评论"}
                    navBarbgColor={Colors.mianColor}
                    navBarLeft={true}
                    navBarLeftAction={()=>navigation.goBack()}
                 //  navBarRight={() => this._navBarRight()}
         />,
       }), 
    },
     Login:{
         screen: Login,
        /*navigationOptions: ({navigation}) => ({
         header:()=><NavBar
                    title={"登录"}
                    navBarbgColor={Colors.mianColor}
                    navBarLeft={false}
                    navBarLeftAction={()=>navigation.goBack()}
                 //  navBarRight={() => this._navBarRight()}
         />,
       }), */
    },
      Register:{
         screen: Register,
        navigationOptions: ({navigation}) => ({
         header:()=><NavBar
                    title={"用户注册"}
                    navBarbgColor={Colors.mianColor}
                    navBarLeft={true}
                    navBarLeftAction={()=>navigation.goBack()}
                 //  navBarRight={() => this._navBarRight()}
         />,
       }), 
    },
    ResetPassword:{
         screen: ResetPassword,
        navigationOptions: ({navigation}) => ({
         header:()=><NavBar
                    title={"修改密码"}
                    navBarbgColor={Colors.mianColor}
                    navBarLeft={true}
                    navBarLeftAction={()=>navigation.goBack()}
                 //  navBarRight={() => this._navBarRight()}
         />,
       }), 
    },
    
     UserInfo:{
      screen: UserInfo,
        navigationOptions: ({navigation}) => ({
         header:()=><NavBar
                    title={"个人中心"}
                    navBarbgColor={Colors.mianColor}
                    navBarLeft={true}
                    navBarLeftAction={()=>navigation.goBack()}
                 //  navBarRight={() => this._navBarRight()}
         />,
       }), 
    },
    About:{
      screen: About,
        navigationOptions: ({navigation}) => ({
         header:()=><NavBar
                    title={"关于我们"}
                    navBarbgColor={Colors.mianColor}
                    navBarLeft={true}
                    navBarLeftAction={()=>navigation.goBack()}
                 //  navBarRight={() => this._navBarRight()}
         />,
       }), 
    },

    
}, {
        //Android页面左右切入
        headerMode: 'screen',
        initialRouteName:'TabScreen',
        // transitionConfig:()=>({
        //     screenInterpolator:CardStackStyleInterpolator.forHorizontal, 
        // }),
        navigationOptions: {

            header: null,
            gesturesEnabled: true
        },
    });





export default  class setUp extends Component {
      constructor(props){
          super(props)
          this.state={
                user:null
              
          }
      }

       componentWillMount(){
          this.subscription = DeviceEventEmitter.addListener('userNameDidChange',(user) => {
                  this.setState({
                        user:user
                  })
            })
      
          storage.load({
            key: 'user',
        }).then(ret => {
          
          this.setState({

               user:ret
               
          })
        }).catch(err => {
            

        })
           
    }
    componentWillUnmount() {
        // 移除
        this.subscription.remove();
        }
    render() {
      
        return (
             <RootScene  screenProps={{user:this.state.user}}/>
        );
    }
}
