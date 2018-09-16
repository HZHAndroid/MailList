// 导航组件
import React, {Component} from 'react'
import {StyleSheet, Dimensions, Text, Image, View, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'

import {Color, Strings} from '../constant/Constant'

const {width} = Dimensions.get('window');


type Props = {
    titleBarHeight?: PropTypes.number,


    isShowBack?: PropTypes.boolean,
    isShowRight?: PropTypes.boolean,

    title: PropTypes.string,
    backButtonText?: PropTypes.string,
    rightButtonText?: PropTypes.string,

    backButtonListener?: PropTypes.func,
    rightButtonListener?: PropTypes.func,
};

export default class NavigationComponent extends Component<Props> {
    static defaultProps = {
        titleBarHeight: 40,
        title: Strings.navigation_default_title,
        backButtonText: Strings.navigation_default_back_button_title,
        rightButtonText: Strings.navigation_default_Right_button_title,

        isShowBack: false,
        isShowRight: false,
    };

    constructor(props) {
        super(props);

        this._backClick = this._backClick.bind(this);
        this._rightBttonClick = this._rightBttonClick.bind(this);
    }

    render() {
        const {titleBarHeight} = this.props;

        const backIconWH = titleBarHeight * 0.4;

        let backV;
        let rightV;

        if (this.props.isShowBack) {
            backV = <TouchableOpacity activeOpacity={0.5} onPress={this._backClick}>
                <View style={styles.backView}>
                    <Image source={require('../../imgs/icon_back.png')} style={[styles.backImg, {
                        height: backIconWH,
                        width: backIconWH
                    }]}/>
                    <Text style={[styles.leftButton, {height: titleBarHeight, lineHeight: titleBarHeight}]}
                          numberOfLines={1}>{this.props.backButtonText}</Text>
                </View>
            </TouchableOpacity>;
        }


        if (this.props.isShowRight) {
            rightV = <TouchableOpacity activeOpacity={0.5} onPress={this._rightBttonClick}>
                <Text style={[styles.rightButton, {
                    height: titleBarHeight,
                    lineHeight: titleBarHeight
                }]}>{this.props.rightButtonText}</Text>
            </TouchableOpacity>
        }

        return (
            <View style={[styles.container, {height: titleBarHeight}]}>

                {backV}

                <Text style={styles.title} numberOfLines={1}>{this.props.title}</Text>
                <View style={{flex: 1}}></View>

                {rightV}
            </View>
        );
    }

    // 返回
    _backClick() {
        if (this.props.backButtonListener) {
            this.props.backButtonListener();
        }
    }

    // 右边按钮
    _rightBttonClick() {
        if (this.props.rightButtonListener) {
            this.props.rightButtonListener();
        }
    }
}

const styles = StyleSheet.create({
        container: {
            width: width,
            backgroundColor: Color.themeColor,
            flexDirection: 'row',
            alignItems: 'center',
        },
        backView: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 10,
        },
        backImg: {
        },
        leftButton: {
            fontSize: 12,
            width: width * 0.17,
            textAlign: 'left',
            marginLeft: 2,
            color: Color.navigationTextColor,
        },
        title: {
            position: 'absolute',
            textAlign: 'center',
            left: width * 0.3,
            right: width * 0.3,
            fontSize: 14,
            color: Color.navigationTextColor,
        },
        rightButton: {
            fontSize: 12,
            width: width * 0.17,
            textAlign: 'right',
            marginRight: 10,
            color: Color.navigationTextColor,
        }
    })
;