import React, {Component} from 'react'
import {StyleSheet, View, Text,Image,Button} from 'react-native'
import {createStackNavigator} from 'react-navigation'


class LogoTitle extends React.Component {
    render() {
        return (
            <Image
                source={require('../imgs/ic_launcher.png')}
                style={{ width: 30, height: 30 }}
            />
        );
    }
}

class HomeScreen extends Component{

    static navigationOptions = {
        // headerTitle instead of title
        headerTitle: <LogoTitle />,
        headerRight: (
            <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#000"
            />
        ),
    };

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