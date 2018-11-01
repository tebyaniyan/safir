import React, {Component} from 'react';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import {
    TabNavigator,
} from 'react-navigation';

import CarDetailsTab from './CarDetailsTab'
import CarNotificationsTab from './CarNotificationsTab'
import CarControlTab from './CarControlTab'

const CarDataTabNavigator = TabNavigator({
    Notifications: {
        screen: CarNotificationsTab,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <FontAwesome style={{ color: tintColor, fontSize: 20 }}>{Icons.bellO}</FontAwesome>
        },
    },
    Details: {
        screen: CarDetailsTab,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <FontAwesome style={{ color: tintColor, fontSize: 20 }}>{Icons.car}</FontAwesome>
        },
    },
    Control: {
        screen: CarControlTab,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <FontAwesome style={{ color: tintColor, fontSize: 20 }}>{Icons.dashboard}</FontAwesome>
        },
    }
}, {
    lazy: true,
    headerMode: 'none',
    tabBarOptions: {
        activeTintColor: '#5fb5be',
        inactiveTintColor: '#999',
        showIcon: true,
        showLabel: false,
        pressColor: '#5fb5be',
        style: {
            backgroundColor: '#f5f5f5',
        },
        indicatorStyle: {
            borderBottomColor: '#5fb5be',
            borderBottomWidth: 3,
        },
    },
});

export default CarDataTabNavigator;