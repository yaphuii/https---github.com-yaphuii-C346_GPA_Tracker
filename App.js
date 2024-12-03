import React from 'react';
import { View, StatusBar } from 'react-native';
import Navigation from './Navigation.js';

const App = () => {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" />
            <Navigation />
        </View>
    );
};

export default App;

