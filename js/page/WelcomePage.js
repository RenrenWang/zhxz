/**
 * 欢迎页
 * @flow
 * **/
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    InteractionManager,
    Platform,
} from 'react-native'


export default class WelcomePage extends Component {

    componentDidMount() {
        const {navigation} =  this.props.navigation;
     
        this.timer = setTimeout(() => {},500);
        
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
    render() {
        return (
            <View style={styles.container}>
                  {/*<Image style={{flex:1,width:null}} resizeMode='repeat' source={require('../../res/images/LaunchScreen.png')}/>*/}
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})
