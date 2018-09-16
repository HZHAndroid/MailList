import React, {Component} from 'react'
import {StyleSheet, View, Text, Button} from 'react-native'
import {createStackNavigator} from 'react-navigation'


class HomeScreen extends React.Component {
    // static navigationOptions = {
    //     title: 'Home',
    // };

    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Details"
                    onPress={() => {
                        /* 1. Navigate to the Details route with params */
                        this.props.navigation.navigate('Details', {
                            itemId: 86,
                            otherParam: 'anything you want here',
                        });
                    }}
                />
            </View>
        );
    }
}

class DetailsScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('otherParam', 'A Nested Details Screen'),
        };
    };

    render() {
        /* 2. Get the param, provide a fallback value if not available */
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        const otherParam = navigation.getParam('otherParam', 'some default value');

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                <Text>itemId: {JSON.stringify(itemId)}</Text>
                <Text>otherParam: {JSON.stringify(otherParam)}</Text>
                <Button
                    title="Go to Details... again"
                    onPress={() =>
                        this.props.navigation.push('Details', {
                            itemId: Math.floor(Math.random() * 100),
                        })}
                />
                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
                <Button
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
                />

                <Button
                    title="Update the title"
                    onPress={() => this.props.navigation.setParams({otherParam: 'Updated!'})}
                />
            </View>
        );
    }
}

export default createStackNavigator({
    Home: {
        screen: HomeScreen,
        // navigationOptions: {
        //     // title: "首页",
        //     headerStyle: {height: 40},
        //     headerTitleStyle: {fontSize: 12, color: 'red'},
        // }
    },
    Details: {
        screen: DetailsScreen,
        navigationOptions: {
            // title: "详情",
            headerStyle: {height: 40},
            headerTitleStyle: {fontSize: 12, color: 'red'},
        }
    }
}, {
    initialRouteName: 'Home',
})