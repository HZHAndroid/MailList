import React, {Component} from 'react'
import {StyleSheet, View, Text, Button} from 'react-native'
import {createStackNavigator} from 'react-navigation'


class HomeScreen extends Component {
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
            </View>
        );
    }

    componentDidMount() {
        console.log(this.props.navigation)
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


class DetailsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                <Button
                    title="Go to Details... again"
                    onPress={() => this.props.navigation.push('Details')}
                />
                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
                <Button
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
                />
            </View>
        );
    }
}


export default createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            title: "首页",
            headerStyle: {height: 40},
            headerTitleStyle: {fontSize: 12, color: 'red'},
        }
    },
    Details: {
        screen: DetailsScreen,
        navigationOptions: {
            title: "详情",
            headerStyle: {height: 40},
            headerTitleStyle: {fontSize: 12, color: 'red'},
        }
    }
}, {
    initialRouteName: 'Home',
})