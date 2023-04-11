import React from 'react';
import {StyleSheet, View, Text, StatusBar, SafeAreaView, TouchableOpacity} from 'react-native';
import Colors from "../assets/colors/Colors";
import {Image} from "react-native-elements";
import longPressGestureHandler from "react-native-gesture-handler/src/web_hammer/LongPressGestureHandler";

export default function PositionList({data, cardClick}) {
    return (
            data.map((item) =>
                <TouchableOpacity key={item.id} style={styles.card} onPress={() => cardClick(item)}>
                    <Image source={item.image} style={styles.cardImage}/>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={styles.cardTitle}>Position </Text>
                        <Text style={styles.position}>{item.position}</Text>
                    </View>
                </TouchableOpacity>
            )
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: Colors.cards,
        borderRadius: 20,
        marginBottom: 20,
    },
    cardImage: {
        width: 150,
        height: 100,
        marginRight: 10,
        borderRadius: 10,
    },
    cardTitle: {
        fontFamily: 'Poppins',
        color: Colors.light,
        fontSize: 12,
        fontWeight: 'bold',
    },
    position: {
        fontFamily: 'Poppins',
        color: Colors.light,
        fontSize: 25,
        fontWeight: 'light',
    }
});