import React, { PureComponent } from 'react';
import {

    StyleSheet,
    Text,
    View,

    Image,
    Dimensions,


    TouchableOpacity,
    TouchableHighlight,
    Platform,

} from 'react-native';
import _ from 'lodash';
const {width, height} = Dimensions.get('window');
import Tool from '../util/Tool';
import Colors from '../../res/style/colors'
export default class ListIttem extends React.PureComponent {
    constructor(props) {
        super(props);

    }
    render() {
        let data=this.props.item;
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 8, backgroundColor: "#fff" }}>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Text numberOfLines={1} style={{ color: Colors.defaultFontColor, fontSize: 16 }}>{data.conName}</Text>
                    <Text numberOfLines={1} style={{ color: Colors.c9Color, fontSize: 16 }}>{data.conTel}</Text>
                    <Text numberOfLines={1} style={{ color: Colors.c9Color, fontSize: 16 }}>{data.conAddr}</Text>
                </View>
                <Image
                    source={require('../../res/images/phoneIcon.png')}
                    style={{ tintColor: Colors.mianColor, height: 25, width: 25 }}
                />
            </View>
        )
    }

}