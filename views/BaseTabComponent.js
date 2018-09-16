import React, {Component} from 'react';
import {Platform, BackHandler, ToastAndroid, Alert} from 'react-native'
import {Config} from "./constant/Constant";
import Home from "./Home";



/**
 * 基础的 tabbar标签组件
 */
class BaseTabComponent extends Component {
    willFocusSubscription: any;
    willBlurSubscription: any;

    isNeedUnRegisterListener: boolean;

    lastBackPressed: number;

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    // 注册监听
    registerListener() {

        this.isNeedUnRegisterListener = true;

        const isVisible = this.onVisible.bind(this);

        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            payload => {
                // console.debug('didFocus', payload);
                isVisible(true);
                Config.tabBarVisible = true;
            }
        );

        this.willBlurSubscription = this.props.navigation.addListener(
            'willBlur',
            payload => {
                // console.debug('didFocus', payload);
                isVisible(false);
                Config.tabBarVisible = false;
            }
        );
    }

    // 注销监听
    unRegisterListener() {
        if (!this.isNeedUnRegisterListener) {
            return;
        }

        if (this.willFocusSubscription) {
            this.willFocusSubscription.remove();
        }

        if (this.willBlurSubscription) {
            this.willBlurSubscription.remove();
        }
    }

    onVisible(visible) {

    }


    handleBackPress = () => {
        console.log(this)
        if (Platform.OS === 'android') {
            // this.goBack(); // works best when the goBack is async

            if (this.lastBackPressed && Date.now() - this.lastBackPressed < 2000) {
                BackHandler.exitApp();
            } else {
                this.lastBackPressed = Date.now();
                ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
            }
        } else {
            if (this.lastBackPressed && Date.now() - this.lastBackPressed < 2000) {
                Alert.alert(
                    '是否退出应用程序!',
                    '',
                    [
                        {
                            text: '确定',
                            onPress: () => {
                                BackHandler.exitApp();
                            }
                        },
                        {text: '取消', onPress: () => console.log('取消'), style: 'cancel'},
                    ],
                    {cancelable: false}
                );
            } else {
                this.lastBackPressed = Date.now();
                ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
            }

        }
        return true;
    }
}


export default BaseTabComponent