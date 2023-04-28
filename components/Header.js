import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Colors from "../assets/colors/Colors";

function Header({navigation}) {
    return (<View style={styles.header}>
            {navigation.canGoBack() && <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color={Colors.highlight}/>
            </TouchableOpacity>}
            <View style={styles.spacer}></View>
            <TouchableOpacity>
                <Ionicons name="notifications-outline" size={24} color={Colors.highlight}/>
            </TouchableOpacity>
        </View>);
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    }, spacer: {
        flex: 1,
    }
});

export default Header;
