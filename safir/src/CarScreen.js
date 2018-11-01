import React, {Component} from 'react';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import navigation from './model/navigation'

import {
    View,
    ScrollView,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import CarDataTabNavigator from './components/CarDataTabNavigator'
import BackButton from './components/BackButton'
import GoogleMaps from './components/GoogleMaps'

const currentCar = {};

class CarScreen extends Component {
    static navigationOptions = ({navigation}) => {
        currentCar.id = navigation.state.params.id;
        currentCar.title = navigation.state.params.title;
        return {
            title: navigation.state.params.title,
            headerLeft: <BackButton onPress={() => navigation.navigate('Main')}/>,
            headerTitleStyle: {
                alignSelf: 'center',
                fontFamily: 'iransans',
                fontSize: 17,
                left: -24
            }
        }
    };

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <GoogleMaps />
                <View style={styles.tabsContainer}>
                    <CarDataTabNavigator screenProps={currentCar} style={styles.tabs} />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

    // App
    container: {
        alignItems: 'stretch',
        flexDirection: 'column',
    },
    // Tabs
    tabsContainer: {
        height: 300,
    },
    tabs: {
        flex: 1
    }
});

export default CarScreen;