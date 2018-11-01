import React, {Component} from 'react';

import {
    ScrollView,
    StyleSheet,
    View,
    Modal,
    TextInput,
    TouchableOpacity,
    Text,
    ToastAndroid
} from 'react-native';

import user from '../model/user'
import {requestWithUserInfo} from "../model/server";

class CarDetailsTab extends Component {
    static navigationOptions = {
        title: 'کنترل پنل ماشین',
        header: null
    };

    constructor (props) {
        super(props);
        this.state = {
            modalVisible: false,
            carIsOn: true,
        };
        this.message = 'آیا از درخواست خاموش کردن ماشین خود مطمئنید؟ این کار میتواند بسیار خطرناک باشد!'
    }

    checkModal () {
        const enteredPassword = this.refs.checkPass._lastNativeText;
        if (user.auth.password === enteredPassword) {
            this.carOff();
            ToastAndroid.showWithGravity('ماشین خاموش شد', ToastAndroid.LONG, ToastAndroid.BOTTOM);
            this.setState({ modalVisible: false, carIsOn: false })
        } else {
            ToastAndroid.showWithGravity('گذرواژه اشتباه است.', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        }
    }

    carOff () {
        requestWithUserInfo('/CutOff', { ID: 1 }, response => {})
    }

    carOn () {
        requestWithUserInfo('/CutOn', { ID: 1 }, response => {});
        this.setState({ carIsOn: true });
        ToastAndroid.showWithGravity('ماشین روشن شد', ToastAndroid.LONG, ToastAndroid.BOTTOM);
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <TouchableOpacity activeOpacity={0.8} style={[styles.button, { display: !this.state.carIsOn ? 'none' : 'flex' }]} onPress={() => this.setState({ modalVisible: true })}>
                    <Text style={styles.buttonText}>خاموش کردن ماشین</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={[styles.button, { display: !this.state.carIsOn ? 'flex' : 'none', backgroundColor: '#5fb5be'}]} onPress={this.carOn.bind(this)}>
                    <Text style={styles.buttonText}>راه اندازی مجدد</Text>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {}}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modal}>
                            <Text style={styles.modalText}>{this.message}</Text>
                            <TextInput placeholder="گذرواژه خود را وارد کنید" secureTextEntry={true} style={styles.modalInput} ref="checkPass" />
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity style={styles.modalButton} onPress={() => this.setState({ modalVisible: false })}><Text style={styles.modalButtonText}>منصرف شدم</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.modalButton} onPress={this.checkModal.bind(this)}><Text style={styles.modalButtonText}>خاموش کن!</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 40
    },
    button: {
        backgroundColor: '#ed5900',
        width: '80%',
        alignSelf: 'center',
        padding: 8,
        marginTop: 10,
    },
    buttonText: {
        fontFamily: 'iransans',
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    modalContainer: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#da3636',
    },
    modal: {
        margin: 40
    },
    modalText: {
        fontFamily: 'iransans',
        color: 'white',
        fontSize: 17,
    },
    modalInput: {
        fontFamily: 'iransans',
        color: 'white',
        fontSize: 17,
        textAlign: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    modalButton: {
        padding: 10,
        flexGrow: 1
    },
    modalButtonText: {
        fontFamily: 'iransans',
        color: 'white',
        fontSize: 17,
        textAlign: 'center'
    }
});

export default CarDetailsTab;