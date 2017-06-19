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

import Colors  from '../res/style/colors'
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



const TabScreen = TabNavigator({
    Home: {
        screen: Home,

        navigationOptions: ({navigation}) => ({


        })

    },
    Suggestion:{
        screen: Suggestion,

        navigationOptions: ({navigation}) => ({


        })

    },
       HotLine:{
        screen: HotLine,

        navigationOptions: ({navigation}) => ({


        })

    },
       My:{
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
        swipeEnabled: false,
   
        animationEnabled: true,
        tabBarOptions: {
            
            style: {
                  height:50,
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

export default RootScene = StackNavigator({
    // WelcomePage: {
    //   screen: WelcomePage,
    // },
    TabScreen: {
        screen: TabScreen,
    },
    OpenPage:{
         screen: OpenPage,
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

