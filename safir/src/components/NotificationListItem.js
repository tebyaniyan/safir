import React, {Component} from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

const colors = {
    success: 'green',
    warning: 'orange',
    danger: 'red'
};

const statusInPersian = {
    success: 'خبر خوب!',
    warning: 'هشدار',
    danger: 'اعلام خطر!'
};

class NotificationListItem extends Component {

    render() {
        const color = colors[this.props.status];
        const containerStyle = [styles.container, { borderRightColor: color }];
        const statusStyle = [styles.status, { color: color }];
        return (
            <TouchableOpacity activeOpacity={0.8} style={containerStyle}>
                <View style={styles.header}>
                    <Text style={styles.date}>{this.props.date}</Text>
                    <Text style={statusStyle}>{statusInPersian[this.props.status]}</Text>
                </View>
                <Text style={styles.title}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '94%',
        marginLeft: '3%',
        marginTop: 13,
        borderRightWidth: 10,
        borderRightColor: 'red',
        alignItems: 'center',
        padding: 20,
        paddingTop: 15,
        paddingBottom: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    status: {
        fontFamily: 'iransans',
        fontSize: 13
    },
    date: {
        fontFamily: 'iransans',
        fontSize: 13
    },
    title: {
        fontFamily: 'iransans',
        fontSize: 15,
        color: '#333',
        textAlign: 'right',
        width: '100%',
        marginTop: 8,
        marginBottom: 2
    },
});

export default NotificationListItem;