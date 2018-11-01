import React, {Component} from 'react';
import user from './model/user'
import navigation from './model/navigation'
import { request } from './model/server'

import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

class LoginScreen extends Component {
    static navigationOptions = {
        title: 'Login',
        header: null
    };

    login () {
        const username = this.refs.username._lastNativeText;
        const password = this.refs.password._lastNativeText;
        user.login(username, password);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                <TextInput ref="username" placeholder="نام کاربری" style={styles.input} />
                <TextInput ref="password" placeholder="گذرواژه" style={styles.input} secureTextEntry={true} />
                <TouchableOpacity activeOpacity={0.6} style={styles.submitContainer} onPress={this.login.bind(this)}>
                    <View style={styles.submit}>
                        <Text style={styles.submitText}>ورود</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 180,
        height: 140,
        marginBottom: 15
    },
    input: {
        marginTop: 5,
        fontSize: 17,
        fontFamily: 'iransans',
        fontWeight: 'normal',
        width: 250,
        textAlign: 'center'
    },
    submitContainer: {
        marginTop: 15,
    },
    submit: {
        width: 250,
        height: 40,
        backgroundColor: '#ed5900',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitText: {
        fontSize: 17,
        fontFamily: 'iransans',
        fontWeight: 'normal',
        textAlign: 'center',
        color: 'white'
    }

});

export default LoginScreen;