import React, {Component} from 'react'
import {StyleSheet, View, Text,Image,Button} from 'react-native'
import {createStackNavigator} from 'react-navigation'


class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {
            headerLeft: (
                <Button
                    onPress={() => navigation.navigate('MyModal')}
                    title="Info"
                    color="#fff"
                />
            ),
            /* the rest of this config is unchanged */
        };
    };

    /* render function, etc */

    render() {
        return (
            <View/>
        );
    }
}

class ModalScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 30 }}>This is a modal!</Text>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Dismiss"
                />
            </View>
        );
    }
}

const MainStack = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
        },

    },
    {
        /* Same configuration as before */
    }
);

export  default createStackNavigator(
    {
        Main: {
            screen: MainStack,
        },
        MyModal: {
            screen: ModalScreen,
        },
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);