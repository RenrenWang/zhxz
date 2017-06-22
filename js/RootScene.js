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
    Image
} from 'react-native';
import Home from './page/Home'
import Suggestion from './page/Suggestion'
import HotLine from './page/HotLine'
import My from './page/My'
import OpenPage from './page/OpenPage'
import OpenD from './page/OpenD'
import Information from './page/Information'
import TXWHome from './page/TXWHome'
import TXWCollect from './page/TXWCollect'
import CharmVillage from './page/CharmVillage'

import NavBar from './common/NavBar'
import Colors from '../res/style/colors'
// import WelcomePage from './page/WelcomePage'

import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';

class setUp extends Component {
    render() {
        return (
            <View>

                <Text>RootScene</Text>
            </View>
        );
    }
}

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

        navigationOptions: ({navigation}) => ({


        })

    },
    HotLine: {
        screen: HotLine,

        navigationOptions: ({navigation}) => ({

         
        })

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

export default RootScene = StackNavigator({
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
    }
}, {
        //Android页面左右切入
        headerMode: 'screen',
        // transitionConfig:()=>({
        //     screenInterpolator:CardStackStyleInterpolator.forHorizontal, 
        // }),
        navigationOptions: {

            header: null,
            gesturesEnabled: true
        },
    });


const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
    },
});

