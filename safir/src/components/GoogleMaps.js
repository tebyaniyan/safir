import React, {Component} from 'react';

import {
    View,
    WebView,
    StyleSheet
} from 'react-native';

import { getURL } from '../model/server'

class GoogleMaps extends Component {

    render() {
        return (
            <View style={styles.container}>
                <WebView source={{uri: getURL('map.aspx')}} style={{height: 200}} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    }
});

export default GoogleMaps;