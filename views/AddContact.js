import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ListView, Image, TouchableOpacity, ToastAndroid} from 'react-native';
import NavigationComponent from "./widget/NavigationComponent";
import {Strings, Config} from "./constant/Constant";


class AddContact extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: <NavigationComponent
                isShowBack={true}
                backButtonText={"返回"}
                title={Strings.add_contact}
                backButtonListener={() => {
                    navigation.goBack()
                }}/>
        }
    };

    render() {
        return (
            <View>
                <Text>添加联系人</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({});

export default AddContact