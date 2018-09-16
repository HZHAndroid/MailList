import React, {Component} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {createStackNavigator} from 'react-navigation'


class HomeScreen extends Component{
    render() {
        return (
            <View style={styles.container}>
                <Text>Home Screen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default createStackNavigator({
    Home: {
        screen: HomeScreen
    }
})