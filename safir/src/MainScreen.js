import React, {Component} from 'react';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import {
    View,
    ScrollView,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import QuickShowItem from './components/QuickShowItem'
import UserDataTabNavigator from './components/UserDataTabNavigator'

import user from './model/user'
import navigation from './model/navigation'
import {isOffline} from "./model/server";

class MainScreen extends Component {
    static navigationOptions = {
        title: 'Home',
        header: null
    };

    constructor (props) {
        super(props);
        this.state = {
            user: {}
        };
        navigation.main = this.props.navigation;
    }

    componentWillMount () {
        // Auth check
        if (!user.loggedIn) {
            navigation.main.navigate('Login')
        } else {
            this.setState({ user: user.data })
        }
    }

    goToProfile () {
        navigation.main.navigate('Profile')
    }

    render() {
        const navigate = navigation.main.navigate;
        const avatarSource = isOffline ? require('../assets/images/user/avatar.jpg') : { uri: this.state.Image };
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.headerImage} source={require('../assets/images/tehran.jpg')} />
                    <TouchableOpacity activeOpacity={0.8} style={styles.userImageContainer} onPress={this.goToProfile.bind(this)}>
                        <Image style={styles.userImage} source={avatarSource} onPress={this.goToProfile.bind(this)} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity activeOpacity={0.8} onPress={this.goToProfile.bind(this)}>
                        <Text style={styles.detailsContainer}>
                            <Text style={styles.detailsName}>{this.state.user.Name} </Text>
                            <FontAwesome style={styles.arrowLeft}>{Icons.chevronLeft}</FontAwesome>
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.quickShow}>
                    <QuickShowItem navigate={navigate} amount={120} first title="badge" />
                    <QuickShowItem navigate={navigate} amount={1125} title="rank" />
                    <QuickShowItem navigate={navigate} amount={250} last title="score" />
                </View>
                <View style={styles.tabsContainer}>
                    <UserDataTabNavigator navigate={navigate} resizeToContent={true} style={styles.tabs} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        flexDirection: 'column'
    },

    // Header styles
    header: {
        width: '100%',
        height: 160
    },
    headerImage: {
        width: '100%',
        height: 160
    },
    userImageContainer: {
        position: 'absolute',
        left: '50%',
        bottom: -35,
        zIndex: 99,
        transform: [{ translateX: -70 }]
    },
    userImage: {
        width: 130,
        height: 130,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 2,
    },

    // Profile details styles
    detailsContainer: {
        marginTop: 50,
        textAlign: 'center',
        flexWrap: 'wrap',
        flexDirection: 'column'
    },
    detailsName: {
        fontFamily: 'iransans',
        fontWeight: 'bold',
        fontSize: 20
    },
    quickShow: {
        borderWidth: 1,
        borderColor: '#CCC',
        width: '85%',
        height: 50,
        alignSelf: 'center',
        marginTop: 15,
        borderRadius: 12,
        flexDirection: 'row',
        backgroundColor: '#BBB',
        overflow: 'hidden'
    },

    // Tabs
    tabsContainer: {
        height: 250,
        marginTop: 20
    },
    tabs: {
        flex: 1
    }
});

export default MainScreen;