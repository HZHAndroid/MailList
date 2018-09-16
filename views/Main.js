import {createBottomTabNavigator} from 'react-navigation';
import {StyleSheet, Image, Text, View} from 'react-native'

import Home from "./Home";
import Notice from "./Notice";
import Manage from "./Manage";
import About from "./About";
import React from "react";


import {Color, Strings, Config} from './constant/Constant';

const Main = createBottomTabNavigator({
    home: {screen: Home},
    notice: {screen: Notice},
    manage: {screen: Manage},
    about: {screen: About},
}, {
    tabBarOptions: {
        //当前选中的tab bar的文本颜色和图标颜色
        activeTintColor: '#4BC1D2',
        //当前未选中的tab bar的文本颜色和图标颜色
        inactiveTintColor: '#000',
        //是否显示tab bar的图标，默认是false
        showIcon: true,
        //showLabel - 是否显示tab bar的文本，默认是true
        showLabel: true,
        //是否将文本转换为大小，默认是true
        upperCaseLabel: false,
        //material design中的波纹颜色(仅支持Android >= 5.0)
        pressColor: '#788493',
        //按下tab bar时的不透明度(仅支持iOS和Android < 5.0).
        pressOpacity: 0.8,
        //tab bar的样式
        style: {
            backgroundColor: '#fff',
            paddingBottom: 1,
            borderTopWidth: 0.2,
            paddingTop: 1,
            borderTopColor: '#ccc',
        },
        //tab bar的文本样式
        labelStyle: {
            fontSize: 11,
            margin: 1
        },
        //tab 页指示符的样式 (tab页下面的一条线).
        indicatorStyle: {height: 0},
    },
    //tab bar的位置, 可选值： 'top' or 'bottom'
    tabBarPosition: 'bottom',
    //是否允许滑动切换tab页
    swipeEnabled: false,
    //是否在切换tab页时使用动画
    animationEnabled: false,
    //是否懒加载
    lazy: true,
    //返回按钮是否会导致tab切换到初始tab页？ 如果是，则设置为initialRoute，否则为none。 缺省为initialRoute。
    backBehavior: 'none',

    // 配置tabbar的标题和图标
    navigationOptions: ({navigation}) => ({
        tabBarVisible: Config.tabBarVisible,// 显示或隐藏标签栏的真或假，如果未设置则默认为true。
        tabBarIcon: ({focused, tintColor}) => {
            const {routeName} = navigation.state;
            let iconPath;
            let color = focused ? Color.tabColorLight : Color.tabColorNormal;

            if (routeName === 'home') {
                iconPath = require('../imgs/icon_tag_phone.png');
            } else if (routeName === 'notice') {
                iconPath = require('../imgs/icon_tag_notice.png');
            } else if (routeName === 'manage') {
                iconPath = require('../imgs/icon_tag_manage.png');
            } else if (routeName === 'about') {
                iconPath = require('../imgs/icon_tag_about.png');
            }

            return <Image style={[styles.tabBarIcon, {tintColor: color}]} source={iconPath}/>;
        },

        tabBarLabel: ({focused, tintColor}) => {
            const {routeName} = navigation.state;
            let labelName = '';

            let color = focused ? Color.tabColorLight : Color.tabColorNormal;

            if (routeName === Strings.tab_home) {
                labelName = Strings.tab_home_label;
            } else if (routeName === Strings.tab_notice) {
                labelName = Strings.tab_notice_label;
            } else if (routeName === Strings.tab_manage) {
                labelName = Strings.tab_manage_label;
            } else if (routeName === Strings.tab_about) {
                labelName = Strings.tab_about_label;
            }

            return <Text style={[styles.tabBarLabel, {color: color}]} numberOfLines={1}>{labelName}</Text>;
        }
    })
});

export default Main


const styles = StyleSheet.create({
    tabBarIcon: {
        height: 25,
        width: 25
    },
    tabBarLabel: {
        textAlign: 'center',
        fontSize: 12,

    }
});