import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ListView, Image, TouchableOpacity, ToastAndroid} from 'react-native';

import NavigationComponent from "./widget/NavigationComponent";
import {createStackNavigator} from "react-navigation";
import BaseTabComponent from "./BaseTabComponent";
import AddContact from "./AddContact";


import {Strings, Color} from "./constant/Constant";
import ScreenUtil from './utils/ScreenUtil'

// 导入菜单数据
const menuList = require('../data/setting');

type Props = {};

class Manage extends BaseTabComponent<Props> {
    static navigationOptions = {
        header: <NavigationComponent title={Strings.tab_manage_label}/>
    };

    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: ds.cloneWithRows(menuList)
        };

        this.registerListener();

        this.dealData = this.dealData.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
    }

    render() {
        return (
            <ListView enableEmptySections={true}
                      dataSource={this.state.dataSource}
                      renderRow={this.renderRow}/>
        );
    }

    componentWillUnmount() {
        this.unRegisterListener();
    }

    componentDidMount() {
        this.dealData();
    }

    dealData() {

    }

    renderRow(rowData, sectionID, rowID, highlightRow) {

        const title = rowData.title;
        const isShowRightArrow = rowData.isShowRightArrow;
        const isShowTopPlaceView = rowData.isShowTopPlaceView;
        const isShowBottomLine = rowData.isShowBottomLine;
        const color = rowData.color;

        let rightArrow;
        let topPlaceView = isShowTopPlaceView ? <View style={{height: 30}}/> : undefined;
        let bottomLineStyle;

        if (isShowRightArrow) {
            rightArrow = <Image source={require('../imgs/icon_right_arrow.png')} style={styles.rightViewStyle}/>;
        } else {
            rightArrow = <View style={styles.rightViewStyle}/>;
        }

        if (!isShowBottomLine) {
            bottomLineStyle = {
                borderBottomWidth: 0
            }
        }


        return (
            <View>
                {topPlaceView}
                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                    this.onItemClick(rowData, sectionID, rowID, highlightRow);
                }}>
                    <View style={[styles.cellInfoStyle, bottomLineStyle]}>
                        <Text style={[styles.pointStyle, {color: color}]}>●</Text>
                        <Text style={{marginLeft: -2, width: 20, height: 2, backgroundColor: color}}/>
                        <Text style={styles.titleStyle}>{title}</Text>
                        {rightArrow}
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    onItemClick(rowData, sectionID, rowID, highlightRow) {
        if (rowID == 1) {
            this.props.navigation.navigate('addContact');
        } else {
            const title = "<" + rowData.title + ">" + "正在开发中...";
            if (Platform.OS === 'android') {
                ToastAndroid.show(title, ToastAndroid.SHORT);
            } else {
                alert(title);
            }
        }
    }
}


const styles = StyleSheet.create({
    cellInfoStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.white,
        height: 40,
        borderBottomColor: Color.textGrayColor,
        borderBottomWidth: ScreenUtil.pixel,
        paddingLeft: 10,
        paddingRight: 10,
    },
    rightViewStyle: {
        height: 15,
        width: 15,
        tintColor: Color.textGrayColor,
    },
    pointStyle: {
        fontSize: 18
    },
    titleStyle: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
        color: Color.textColor,
    }
});

export default createStackNavigator({
    manage: {
        screen: Manage
    },
    addContact: {
        screen: AddContact,
        navigationOptions: {
            tabBarVisible: false
        }
    }
})