import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import Colors from "./assets/colors/Colors";

import MainNavigator from "./navigation/MainNavigator";
import React, {useCallback, useEffect, useState} from "react";
import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import AuthContextProvider from "./context/AuthContext";

export default function App() {

    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await Font.loadAsync({
                    'Poppins': require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
                    'Poppins-Bold': require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
                    'Poppins-Black': require("./assets/fonts/Poppins/Poppins-Black.ttf"),
                    'Poppins-Light': require("./assets/fonts/Poppins/Poppins-Light.ttf"),
                    'Poppins-Medium': require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
                });
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    console.log('App.js: ')
    return (
        <AuthContextProvider>
            <View style={styles.container}>
                <StatusBar backgroundColor={Colors.bg}
                           barStyle="dark-content"/>
                <MainNavigator/>
            </View>
        </AuthContextProvider>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: Colors.bg,
    }

});
