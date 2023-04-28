import React, {useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {authContext} from "../context/AuthContext";

import BottomTabs from "./BottomTabs";
import AuthNavigator from "./AuthNavigator";

function MainNavigator() {
    const {loggedIn, setLoggedIn, userInfo, setUserInfo} = useContext(authContext);

    return (
            <NavigationContainer style={styles.container}>
                {loggedIn ? <BottomTabs/> : <AuthNavigator/>}
            </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default MainNavigator;
