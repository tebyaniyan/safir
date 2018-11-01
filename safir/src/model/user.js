import { AsyncStorage, ToastAndroid } from 'react-native'
import { request } from "./server"
import navigation from './navigation'

class User {
    constructor () {
        this.auth = {
            username: '',
            password: '',
            loggedIn: false
        };
        this.data = {};
        this.tryToRemember();
    }
    async tryToRemember () {
        try {
            const username = await AsyncStorage.getItem('@username');
            const password = await AsyncStorage.getItem('@password');
            this.login(username, password, true)
        } catch (e) {
            console.error(`Async set item error: ${e}`)
        }
    }
    getUserData () {
        return new Promise((resolve, reject) => request('/Profile', {
            username: this.auth.username,
            password: this.auth.password
        }, response => {
            user.data = response.data;
            resolve(response.data);
        }))
    }
    async setUserPass (username, password, cb) {
        this.auth.username = username;
        this.auth.password = password;
        this.auth.loggedIn = true;
        this.getUserData().then(res => cb(res.data)).catch(e => console.error('Error in getting user data', e));
        try {
            await AsyncStorage.setItem('@username', username);
            await AsyncStorage.setItem('@password', password);
        } catch (e) {
            console.error(`Async set item error: ${e}`)
        }
    }
    login (username, password, silent) {
        request('login', {username: username, password: password}, response => {
            if (response.data.Result) {
                this.setUserPass(username, password, data => {
                    navigation.main.navigate('Main')
                });
            } else {
                if (!silent) {
                    ToastAndroid.showWithGravity('نام کاربری یا گذرواژه اشتباه است. لطفا دوباره تلاش کنید', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                }
            }
        })
    }
    async logout () {
        this.auth.username = '';
        this.auth.password = '';
        this.auth.loggedIn = false;
        try {
            await AsyncStorage.setItem('@username', '');
            await AsyncStorage.setItem('@password', '');
        } catch (e) {
            console.error(`Logout error (Async Storage): ${e}`)
        }
        navigation.main.navigate('Login')
    }
    get loggedIn () {
        return this.auth.loggedIn;
    }
}

const user = new User();

export default user;