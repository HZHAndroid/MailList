import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, WebView} from 'react-native';
import NavigationComponent from "./widget/NavigationComponent";
import {Strings} from "./constant/Constant";
import {createStackNavigator} from "react-navigation";
import BaseTabComponent from "./BaseTabComponent";

type Props = {};

class About extends BaseTabComponent<Props> {
    static navigationOptions = {
        header: <NavigationComponent title={Strings.tab_about_label}/>
    };

    constructor(props) {
        super(props);

        this.registerListener();
    }

    render() {
        return (
            <View style={styles.container}>
                <WebView
                    source={{uri: 'https://www.baidu.com/'}}
                />
            </View>
        );
    }

    componentWillUnmount() {
        this.unRegisterListener();
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default createStackNavigator({
    about: {
        screen: About
    }
})