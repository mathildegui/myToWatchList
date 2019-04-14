import React, {Component} from 'react';
import Navigation from './router'
import { Provider } from 'react-redux'
import Store from './screens/store/configureStore'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import { ThemeProvider } from 'react-native-elements';

const theme = {
    colors: {
        primary: '#2DCC83',
    },
};

export default class App extends Component {
    render () {
        let persistor = persistStore(Store)
        return (
            <ThemeProvider theme={theme}>
                <Provider store={Store}>
                    <PersistGate persistor={persistor}>
                        <Navigation/>
                    </PersistGate>
                </Provider>
            </ThemeProvider>
        )
    }
}