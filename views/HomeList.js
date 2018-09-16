import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, View, Image, Button,
    ListView, Dimensions, TouchableOpacity
} from 'react-native';

import PropTypes from 'prop-types'

import NavigationComponent from "./widget/NavigationComponent";
import {Color, Config, Strings} from './constant/Constant'
import ScreenUtil from './utils/ScreenUtil'


// 所有的数据列表
const list = require('../data/user');

const firstCharWH = ScreenUtil.size.width * 0.1;

type Props = {};

class HomeList extends Component<Props> {

    // 为导航控件设置监听的方法一
    // static navigationOptions = ({navigation}) => {
    //     return {
    //         header: <NavigationComponent title=''
    //                                      isShowBack={true}
    //                                      backButtonText={Strings.tab_home_label}
    //                                      backButtonListener={() => {
    //                                          navigation.goBack()
    //                                      }}/>,
    //         headerTitle: ''
    //     };
    // };

    static defaultProps = {};

    // 为导航控件设置监听的方法一，通过传参的方式
    static navigationOptions = ({navigation}) => {
        const header = navigation.getParam('header');
        return {
            header: header,
            headerTitle: ''
        };
    };


    constructor(props) {
        super(props);

        const tag = this.props.navigation.getParam('tag', '');

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            tag: tag,
            dataSource: ds,
        };

        this.initTitleBar = this.initTitleBar.bind(this);
        this._back = this._back.bind(this);
        this._dealData = this._dealData.bind(this);
        this.renderRow = this.renderRow.bind(this);

        this.initTitleBar();
    }

    render() {
        Config.tabBarVisible = false;
        return (
            <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}/>
        )
    }

    // 处理数据，获取网络请求数据
    componentDidMount() {
        this._dealData();
    }

    // 初始化标题栏
    initTitleBar() {
        const header = <NavigationComponent title=''
                                            isShowBack={true}
                                            backButtonText={Strings.tab_home_label}
                                            backButtonListener={this._back}/>;
        this.props.navigation.setParams({
            header: header
        });
    }

    // 返回监听
    _back() {
       const callBack = this.props.navigation.getParam("callBack");
       if (callBack){
           callBack('nihao');
       }
        this.props.navigation.goBack();
    }

    // 处理数据
    _dealData() {
        const tag = this.state.tag;

        let tempArr;

        if (tag && tag !== '') {
            if (list && list.length > 0) {
                tempArr = [];
                for (let item of list) {
                    if (item.tag === tag) {
                        tempArr.push(item);
                    }
                }
            }
        } else {
            tempArr.push(list);
        }

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(tempArr),
        });
    }

    renderRow(rowData, sectionID, rowID, highlightRow) {
        let username = rowData.username;
        let partment = rowData.partment;
        let tel = rowData.tel;
        let email = rowData.email;

        let nameFirstChar;
        if (username && username.length > 0) {
            nameFirstChar = username.substr(0, 1);
        } else {
            username = '';
            nameFirstChar = '';
        }
        return (
            <View style={styles.cellViewStyle}>
                <Text style={styles.firstCharStyle}>{nameFirstChar}</Text>
                <View style={styles.cellViewRightStyle}>
                    <View style={styles.cellNameViewStyle}>
                        <Text numberOfLines={1} style={styles.cellNameStyle}>{username}</Text>
                        <Text numberOfLines={1} style={styles.cellPhoneStyle}>{tel}</Text>
                    </View>
                    <View style={styles.cellPartmentViewStyle}>
                        <Text numberOfLines={1} style={styles.cellPartStyle}>{partment}</Text>
                        <Text numberOfLines={1} style={styles.cellEmailStyle}>{email}</Text>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    cellViewStyle: {
        flexDirection: 'row',
        backgroundColor: Color.white,
        padding: 10,
        borderBottomWidth: ScreenUtil.pixel,
        borderBottomColor: Color.lineColor
    },
    firstCharStyle: {
        width: firstCharWH,
        height: firstCharWH,
        lineHeight: firstCharWH,
        backgroundColor: Color.themeColor,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: Color.white,
        borderRadius: 8,
    },
    cellViewRightStyle: {
        marginLeft: 10,
        flex: 1,
    },
    cellNameViewStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    cellPartmentViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    cellNameStyle: {
        fontSize: 14,
        color: Color.textColor,
        flex: 1,

    },
    cellPhoneStyle: {
        fontSize: 12,
        color: Color.blue
    },
    cellPartStyle: {
        fontSize: 10,
        color: Color.textGrayColor,
        flex: 1,
    },
    cellEmailStyle: {
        fontSize: 12,
        color: Color.blue
    }
});

export default HomeList