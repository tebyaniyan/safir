import React, {Component} from 'react';

import FontAwesome, { Icons } from 'react-native-fontawesome';
import navigation from './model/navigation'

import user from './model/user'

import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import BackButton from './components/BackButton'
import {isOffline} from "./model/server";

class ProfileScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'حساب کاربری',
            headerLeft: <BackButton onPress={() => navigation.navigate('Main')}/>,
            headerTitleStyle: {
                alignSelf: 'center',
                fontFamily: 'iransans',
                fontSize: 17,
                left: -24
            }
        }
    };

    logout () {
        user.logout();
    }

    render() {
        const avatarSource = isOffline ? require('../assets/images/user/avatar.jpg') : { uri: this.state.Image };
        return (
            <ScrollView>
                <Image style={styles.userImage} source={avatarSource} />
                <View style={styles.detailsContainer}>
                    <Text style={styles.detail}>نام و نام خانوادگی: <Text style={styles.bold}>{user.data.Name}</Text></Text>
                    <Text style={styles.detail}>کد ملی: <Text style={styles.bold}>{user.data.Melli_Code}</Text></Text>
                    <Text style={styles.detail}>شماره موبایل: <Text style={styles.bold}>{user.data.Mobile}</Text></Text>
                    <Text style={styles.detail}>ایمیل: <Text style={styles.bold}>{user.data.Email}</Text></Text>
                </View>
                <TouchableOpacity activeOpacity={0.8} style={styles.logoutContainer} onPress={this.logout.bind(this)}>
                    <Text style={styles.logoutText}>خروج از حساب</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    userImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 4,
        alignSelf: 'center',
        margin: 15,
        marginTop: 0,
        marginBottom: 0,
        top: 30,
        zIndex: 99
    },
    detailsContainer: {
        backgroundColor: '#fff',
        marginTop: 0,
        padding: 20,
        paddingTop: 40
    },
    detail: {
        fontFamily: 'iransans',
        fontSize: 17,
        marginTop: 2,
        marginBottom: 2,
        color: '#5fb5be'
    },
    bold: {
        fontFamily: 'iransans',
        color: '#333',
        fontWeight: 'bold'
    },
    logoutContainer: {
        backgroundColor: '#ed5900',
        width: '100%',
        padding: 10,
        marginTop: 20,
    },
    logoutText: {
        fontFamily: 'iransans',
        color: 'white',
        fontSize: 17,
        textAlign: 'center'
    }
});

export default ProfileScreen;