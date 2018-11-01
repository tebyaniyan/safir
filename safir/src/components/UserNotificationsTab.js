import React, {Component} from 'react';

import {
    ScrollView,
    StyleSheet,
    FlatList,
    Text,
} from 'react-native';

import NotificationListItem from './NotificationListItem'

class UserCarsTab extends Component {
    static navigationOptions = {
        title: 'اعلان های شما',
        header: null
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <ScrollView>
                <FlatList
                    data={[
                        {key: 1, status: 'danger', title: 'این یک اعلان است', date: '20 خرداد 96'},
                        {key: 2, status: 'warning', title: 'این یک اعلان نیست که در آن متی طولانی را تست میکنیم.', date: '20 خرداد 96'},
                        {key: 3, status: 'warning', title: 'این یک اعلان است', date: '20 خرداد 96'},
                        {key: 4, status: 'success', title: 'این یک اعلان است', date: '20 خرداد 96'},
                        {key: 5, status: 'danger', title: 'این یک اعلان است', date: '20 خرداد 96'},
                    ]}
                    renderItem={({item}) =>
                        <NotificationListItem
                            key={item.key}
                            status={item.status}
                            date={item.date}
                            title={item.title} />
                    }
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({});

export default UserCarsTab;