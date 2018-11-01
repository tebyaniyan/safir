import React, {Component} from 'react';

import {
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

class QuickShowItem extends Component {

    constructor (props) {
        super(props);
    }

    render() {
        const isLast = this.props.last;
        const isFirst = this.props.first;

        const radius = 12;

        const containerStyle = [styles.container, {
            marginRight: (!isLast ? 2 : 0),
            borderTopLeftRadius: (isFirst ? radius : 0),
            borderBottomLeftRadius: (isFirst ? radius : 0),
            borderTopRightRadius: (isLast ? radius : 0),
            borderBottomRightRadius: (isLast ? radius : 0),
        }];

        const imageSource = {
            badge: require('../../assets/images/icons/badge.png'),
            rank: require('../../assets/images/icons/rank.png'),
            score: require('../../assets/images/icons/star.png'),
        };

        return (
            <TouchableOpacity activeOpacity={0.85} style={containerStyle}>
                <Text style={styles.text}>{this.props.amount}</Text>
                <Image style={styles.icon} source={imageSource[this.props.title]} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#CCC',
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    icon: {
        width: 28,
        height: 28,
        marginRight: 10
    },
    text: {
        fontSize: 17,
        fontFamily: 'iransans',
        fontWeight: 'bold',
        alignSelf: 'center',
        top: 2,
        flexGrow: 1,
        textAlign: 'center',
        marginLeft: 10
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    }
});

export default QuickShowItem;