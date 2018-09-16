import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, View, TouchableOpacity, TextInput,
    ScrollView, Image
} from 'react-native';
import NavigationComponent from "./widget/NavigationComponent";
import {Strings, Color} from "./constant/Constant";


class NoticeDetail extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: <NavigationComponent title={Strings.tab_msg_detail}
                                         isShowBack={true}
                                         backButtonText={'返回'}
                                         backButtonListener={() => {
                                             navigation.goBack();
                                         }}/>
        }
    };

    constructor(props) {
        super(props);

        let data = this.props.navigation.getParam('data');

        this.state = {
            data: data
        };
    }

    render() {
        const data = this.state.data;
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.msgStyle}>{data.message}</Text>

                <Text numberOfLines={1} style={styles.userNameStyle}>发送人：{data.username}</Text>
                <Text numberOfLines={1} style={styles.timeStyle}>日    期：{data.time}</Text>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 6,
        backgroundColor: Color.white
    },
    msgStyle: {
        fontSize: 14,
        color: Color.textColor,
    },
    userNameStyle: {
        fontSize: 12,
        color: Color.themeColor,
        alignSelf: 'flex-end',
        width: 120,
        marginTop: 20,
    },
    timeStyle: {
        fontSize: 12,
        color: Color.themeColor,
        alignSelf: 'flex-end',
        marginTop: 4,
        width: 120
    }
});


export default NoticeDetail