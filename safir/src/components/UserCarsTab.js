import React, {Component} from 'react';

import {
    ScrollView,
    StyleSheet,
    FlatList,
    Text,
} from 'react-native';

import CarListItem from './CarListItem'
import {request} from "../model/server";
import user from "../model/user";

class UserCarsTab extends Component {
    static navigationOptions = {
        title: 'ماشین های شما',
        header: null
    };

    constructor (props) {
        super(props);
        this.state = {
            cars: []
        }
    }

    componentWillMount () {
        request('/CarList', { username: user.auth.username, password: user.auth.password }, response => {
            for (let car of response.data) {
                car.key = car.ID;
            }
            this.setState({ cars: response.data });
        })
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView>
                <FlatList
                    data={this.state.cars}
                    renderItem={({item}) =>
                        <CarListItem
                            key={item.key}
                            id={item.key}
                            title={item.Title}
                            number={item.Number || '31ج152 | ایران 68'} />
                    }
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({});

export default UserCarsTab;