import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput
} from 'react-native'
import Colors from '../../res/style/colors'
import NavBar from '../common/NavBar'
import MyListView from '../common/MyListView'
export default class Suggestion extends React.Component {
    static navigationOptions = {
        tabBarLabel: '意见反馈',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../res/images/suggestionIcon.png')}
                style={{ tintColor: tintColor, height: 23, width: 23 }}
            />
        ),
    };
    constructor(props) {
        super(props)
        this.title = "意见反馈";
        this.placeholder = "请输入您的问题或建议"
        this.state = {
            text: "",
        }
    }
    render() {
        let {goBack, state} = this.props.navigation;
        return (
            <View style={{ flexDirection: 'column', flex: 1  }}>
                <NavBar
                    title={this.title}
                    navBarbgColor={Colors.mianColor}
                    navBarLeftAction={() => goBack()}
                //  navBarRight={() => this._navBarRight()}
                />
                <View style={{ flexDirection: 'column',flex: 1 }}>
                    <Text
                        style={{ marginVertical: 10, paddingHorizontal: 5, fontSize: 16, color: Colors.defaultFontColor }}>
                        您的意见是我们进步的动力，有问题反馈过来，我们将全力为你解答、持续改进系统。
                    </Text>
                    <View style={{ position: 'relative', height: 150 }}>
                        <TextInput
                            underlineColorAndroid='transparent'
                            style={{ textAlignVertical: 'top', color: "#999", backgroundColor: '#fff', fontSize: 16, height: 150, borderColor: "#dcdcdc", borderWidth: 1 }}
                            onChangeText={(text) => this.setState({ text })}
                            value={this.state.text}
                            maxLength={50}
                            multiline={true}
                            placeholder={this.placeholder}
                        />
                        <Text style={{ fontSize: 16, color: "#999", position: 'absolute', right: 3, bottom: 3 }}>(0-50字)</Text>
                    </View>
                    <View style={{ flexDirection: 'column', marginTop: 15, flex: 1 }}>
                        <View
                            style={{ paddingHorizontal: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50, backgroundColor: "#fff", borderBottomWidth: 1, borderTopWidth: 1, borderColor: Colors.dColor, }}
                        >
                            <Text style={{ fontSize: 16, color: Colors.defaultFontColor }}>反馈信息</Text>

                            <Text style={{ fontSize: 16, color: Colors.buleColor }}>我的</Text>
                        </View>

                        <MyListView
                            // swipeEnabled={true}
                            // animationEnabled={true}
                            // removeClippedSubviews={false}
                            url={"http://121.40.241.28:7070/zhxz/app/newsAction.action?affType=V&pageno=1&townId=1&villId=1"}
                            navigation={this.props.navigation}
                            showImg={false}
                            itemType={4}
                               
                        />
                    </View>
                </View>
            </View>
        )
    }
}