import React, {Component} from 'react';

import FontAwesome, { Icons } from 'react-native-fontawesome'

import {
    TouchableOpacity,
    StyleSheet
} from 'react-native';

class BackButton extends Component {

    render() {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={this.props.onPress}>
                <FontAwesome style={styles.arrow}>{Icons.chevronLeft}</FontAwesome>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    arrow: {
        marginLeft: 15,
        fontSize: 20
    }
});

export default BackButton;