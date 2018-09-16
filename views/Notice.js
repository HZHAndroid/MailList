import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, View, TouchableOpacity, TextInput,
    ListView, Image
} from 'react-native';
import {createStackNavigator} from "react-navigation";


import BaseTabComponent from "./BaseTabComponent";
import NavigationComponent from "./widget/NavigationComponent";
import NoticeDetail from "./NoticeDetail";


import {Color, Config, Strings} from "./constant/Constant";
import ScreenUtil from './utils/ScreenUtil'

// 导入数据
const list = require('../data/message');
// 首字母宽度高度
const firstCharWH = ScreenUtil.size.width * 0.1;


type Props = {};

class Notice extends BaseTabComponent<Props> {
    static navigationOptions = {
        header: <NavigationComponent title={Strings.tab_notice_label}/>
    };

    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds,
            isShowClearBtn: false,
            searchValue: '',
        };

        this.registerListener();

        this.onClick = this.onClick.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.dealData = this.dealData.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.clearBtnListener = this.clearBtnListener.bind(this);
        this.itemClick = this.itemClick.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchInputViewStyle}>
                    <TextInput
                        value={this.state.searchValue}
                        style={styles.searchInputStyle}
                        placeholder='搜索'
                        placeholderTextColor={Color.textGrayColor}
                        onChangeText={this.onChangeText}
                    />
                    <TouchableOpacity activeOpacity={0.5} onPress={this.clearBtnListener}>
                        <Image source={require('../imgs/icon_close.png')}
                               style={[styles.closeStyle, {display: this.state.isShowClearBtn ? 'flex' : 'none'}]}/>
                    </TouchableOpacity>
                </View>
                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}/>
            </View>
        );
    }

    componentDidMount() {
        this.dealData();
    }

    componentWillUnmount() {
        this.unRegisterListener();
    }

    onClick() {
        // this.props.navigation.navigate('noticeDetail')
    }

    renderRow(rowData, sectionID, rowID, highlightRow) {

        let username = rowData.username;
        let message = rowData.message;
        let time = rowData.time;
        let firstChar;

        if (username && username.length > 0) {
            firstChar = username.substr(0, 1);
        } else {
            username = '';
            firstChar = '';
        }

        if (!message) {
            message = '';
        }

        if (!time) {
            time = '';
        }

        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                this.itemClick(rowData)
            }}>
                <View style={styles.cellViewStyle}>
                    <Text style={styles.firstCharStyle} numberOfLines={1}>{firstChar}</Text>
                    <View style={styles.cellCenterStyle}>
                        <Text numberOfLines={2} style={styles.messageStyle}>{message}</Text>
                        <Text numberOfLines={1} style={styles.timeStyle}>{time}</Text>
                    </View>
                    <Text numberOfLines={1} style={styles.userNameStyle}>{username}</Text>
                    <Image source={require('../imgs/icon_right_arrow.png')}
                           style={{height: 15, width: 15, tintColor: Color.textGrayColor, marginLeft: 5}}/>
                </View>
            </TouchableOpacity>
        )
    }

    // 处理数据
    dealData() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(list)
        })
    }

    // 文本变更
    onChangeText(text) {
        let isShowClearBtn;

        let tempArr;
        if (text.length > 0) {
            isShowClearBtn = true;
            if (list && list.length > 0) {
                tempArr = [];
                for (let item of list) {
                    const message = item.message;
                    const username = item.username;
                    if (message && message.length > 0) {
                        if (message.indexOf(text) !== -1) {
                            tempArr.push(item);
                            continue;
                        }
                    }
                    if (username && username.length > 0) {
                        if (username.indexOf(text) !== -1) {
                            tempArr.push(item);
                        }
                    }
                }
            }
        } else {
            isShowClearBtn = false;
            tempArr = list;
        }
        this.setState({
            isShowClearBtn: isShowClearBtn,
            searchValue: text,
            dataSource: this.state.dataSource.cloneWithRows(tempArr)
        })
    }

    // 清空按钮
    clearBtnListener() {
        this.setState({
            isShowClearBtn: false,
            searchValue: '',
            dataSource: this.state.dataSource.cloneWithRows(list)
        })
    }

    itemClick(rowData) {
        this.props.navigation.navigate('noticeDetail', {
            data: rowData
        })
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchInputViewStyle: {
        flexDirection: 'row',
        height: 35,
        backgroundColor: Color.white,
        borderColor: 'gray',
        borderWidth: ScreenUtil.pixel,
        alignItems: 'center',
        margin: 10,
        borderRadius: 5,
    },
    searchInputStyle: {
        flex: 1,
        height: 35,
        fontSize: 12,
        textAlign: 'center',
        paddingRight: 10,
        paddingLeft: 10,
    },
    closeStyle: {
        height: 20,
        width: 20,
        tintColor: Color.textGrayColor,
        marginRight: 10,
    },
    cellViewStyle: {
        flexDirection: 'row',
        backgroundColor: Color.white,
        padding: 10,
        borderBottomColor: Color.textGrayColor,
        borderBottomWidth: ScreenUtil.pixel,
        alignItems: 'center'
    },
    firstCharStyle: {
        width: firstCharWH,
        height: firstCharWH,
        lineHeight: firstCharWH,
        textAlign: 'center',
        backgroundColor: Color.orange,
        color: Color.white,
        borderRadius: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    cellCenterStyle: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
    },
    messageStyle: {
        fontSize: 13,
        color: Color.textColor,
    },
    timeStyle: {
        fontSize: 12,
        color: Color.textGrayColor,
        marginTop: 2,
    },
    userNameStyle: {
        fontSize: 10,
        borderColor: Color.orange,
        borderWidth: ScreenUtil.pixel,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 5,
        textAlign: 'center',
        color: Color.orange
    }
});

export default createStackNavigator({
    notice: {
        screen: Notice
    },
    noticeDetail: {
        screen: NoticeDetail,
        navigationOptions: ({navigation}) => ({
            // header: null,
            tabBarVisible: false,
        })

    }
})