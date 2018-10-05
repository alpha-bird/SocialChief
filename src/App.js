import React, { Component } from 'react';
import { View, Text} from 'react-native';
import { Provider } from 'react-redux';

import RootNavigator from './RootNavigator';
import configureStore from './configureStore';

const store = configureStore();

class MainApp extends Component {
    render() {
        return (
            <Provider store={store}>
                <RootNavigator />
            </Provider>
        );
    }
}

export default MainApp;