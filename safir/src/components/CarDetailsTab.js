import React, {Component} from 'react';

import {
    ScrollView,
    StyleSheet,
    FlatList,
    Text,
} from 'react-native';
import {requestWithUserInfo} from "../model/server";

const loadingMessage = 'در حال بارگذاری';

class CarDetailsTab extends Component {
    static navigationOptions = {
        title: 'مشخصات ماشین',
        header: null
    };

    constructor (props) {
        super(props);
        this.state = {
            car: {
                model: loadingMessage,
                number: loadingMessage,
                color: loadingMessage,
                engineNumber: loadingMessage,
                type: loadingMessage,
                OBDSerial: loadingMessage,
            }
        }
    }

    componentWillMount () {
        requestWithUserInfo('/CarDetail', { ID: this.props.screenProps.id }, response => {
            const car = this.state.car;
            const data = response.data;
            car.model = data.Model;
            car.number = data.Plaque;
            car.color = data.Color;
            car.engineNumber = data.EngineNumber;
            car.type = data.Type;
            car.OBDSerial = data.OBD_Serial;
            this.setState({ car })
        })
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.detail}>مدل: <Text style={styles.bold}>{this.state.car.model}</Text></Text>
                <Text style={styles.detail}>شماره: <Text style={styles.bold}>{this.state.car.number}</Text></Text>
                <Text style={styles.detail}>رنگ: <Text style={styles.bold}>{this.state.car.color}</Text></Text>
                <Text style={styles.detail}>شماره موتور: <Text style={styles.bold}>{this.state.car.engineNumber}</Text></Text>
                <Text style={styles.detail}>نوع: <Text style={styles.bold}>{this.state.car.type}</Text></Text>
                <Text> </Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 40
    },
    detail: {
        fontSize: 17,
        margin: 8,
        textAlign: 'right',
        fontFamily: 'iransans',
        fontWeight: 'bold',
        color: '#5fb5be',
        marginRight: 20
    },
    bold: {
        fontWeight: 'normal',
        color: '#444'
    }
});

export default CarDetailsTab;