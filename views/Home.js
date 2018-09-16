import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, View, Image, Button,
    ListView, Dimensions, TouchableOpacity
} from 'react-native';
import {createStackNavigator} from 'react-navigation'
import NavigationComponent from "./widget/NavigationComponent";

import HomeList from "./HomeList";


import {Color, Config, Strings} from './constant/Constant'
import BaseTabComponent from "./BaseTabComponent";

const {width} = Dimensions.get('window');

var dataArr = require('../data/home_data');


const cols = 4;
const cellHSpacing = width * 0.04;
const cellVSpacing = width * 0.03;
const cellHW = (width - cellHSpacing * (cols + 1)) / cols;

type Props = {};

class Home extends BaseTabComponent<Props> {

    // 配置tabbar的item的标题和图标
    // static navigationOptions = {
    //     tabBarLabel: '好友',
    //     tabBarIcon: ({focused}) => {
    //         if (focused) {
    //             return (
    //                 <Image style={styles.tabBarIcon} source={require('../imgs/icon_tag_manage.png')}/>
    //             );
    //         }
    //         return (
    //             <Image style={styles.tabBarIcon} source={require('../imgs/icon_tag_manage.png')}/>
    //         );
    //     },
    // };

    static navigationOptions = {
        headerStyle: {
            // height: 30,
        },
        header: <NavigationComponent title={Strings.tab_home_label}/>,
        headerTitle: ''
    };


    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(dataArr),
        };

        this.renderRow = this.renderRow.bind(this);
        this.itemClick = this.itemClick.bind(this);

        this.onCallBackResult = this.onCallBackResult.bind(this);

        this.registerListener();
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    contentContainerStyle={{
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}/>
            </View>
        );
    }

    componentWillUnmount() {
        this.unRegisterListener();
    }

    renderRow(rowData, sectionID, rowID, highlightRow) {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                this.itemClick(rowData);
            }}>
                <View style={[styles.cellViewStyle, {backgroundColor: rowData.backgroundColor}]}>
                    <Text style={styles.cellViewTitleStyle}>{rowData.title}</Text>
                    <Text style={styles.cellViewSubTitleStyle}>{rowData.subTitle}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    itemClick(rowData) {
        this.props.navigation.navigate('homeList', {
            tag: rowData.tag,
            callBack: this.onCallBackResult
        })
    }

    // 传递给下一个页面的回调用
    onCallBackResult(data) {

    }

    onVisible(isVisible) {
        // alert(isVisible)

        if (isVisible) {

        }
    }


    handleBackPress() {
        super.handleBackPress();
        return true;
    }

}

export default createStackNavigator({
    home: {
        screen: Home
    },
    homeList: {
        screen: HomeList,
        navigationOptions: ({navigation}) => ({
            // header: null,
            tabBarVisible: false,
        })

    }
})

const styles = StyleSheet.create({
    // tabBarIcon: {
    //     height: 20,
    //     width: 20,
    //     tintColor: '#ff00ff',
    // }
    container: {
        flex: 1,
    },
    cellViewStyle: {
        backgroundColor: "#fff",
        height: cellHW,
        width: cellHW,
        marginLeft: cellHSpacing,
        marginTop: cellVSpacing,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
        borderRadius: 10,
    },
    cellViewTitleStyle: {
        fontSize: 14,
        color: Color.white
    },
    cellViewSubTitleStyle: {
        fontSize: 10,
        marginTop: 2,
        color: Color.white
    }
});