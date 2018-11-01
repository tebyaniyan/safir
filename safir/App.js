import React from 'react';

import { StackNavigator } from 'react-navigation';

import LoginScreen from './src/LoginScreen'
import MainScreen from "./src/MainScreen";
import CarScreen from "./src/CarScreen";
import ProfileScreen from "./src/ProfileScreen";

export default StackNavigator({
    Main: { screen: MainScreen },
    Profile: { screen: ProfileScreen },
    Car: { screen: CarScreen },
    Login: { screen: LoginScreen },
});