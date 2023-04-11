import React from 'react';
import {StyleSheet, View, Text, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import Header from "../../components/Header";
import Colors from "../../assets/colors/Colors";
import PositionList from "../../components/PositionList";

function UnderAveragePLayers({navigation}) {

    const data = [
        { id: 1, position: 'Goalkeeper', image: {uri: 'https://picsum.photos/200/200'} },
        { id: 2, position: 'Defender', image: {uri: 'https://picsum.photos/200/200'} },
        { id: 3, position: 'Midfielder', image: {uri: 'https://picsum.photos/200/200'} },
        { id: 4, position: 'Forward', image: {uri: 'https://picsum.photos/200/200'} },
        { id: 5, position: 'Forward', image: {uri: 'https://picsum.photos/200/200'} },
        { id: 6, position: 'Forward', image: {uri: 'https://picsum.photos/200/200'} },
    ];

    const cardClick = (item) => {
        navigation.navigate('UnderAveragePlayerIndividual', {position: item})
    }

    return (
        <SafeAreaView style={[styles.container, {marginTop: StatusBar.currentHeight}]}>
            <Header style={styles.header} navigation={navigation}/>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Positions</Text>
                <ScrollView style={styles.scrollView}>
                    <PositionList data={data} cardClick={cardClick}/>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.bg
    },
    contentContainer: {
        flex: 1,
        width: '100%',
        padding: 10,
        paddingTop: 30,
    },
    title: {
        fontSize: 30,
        marginBottom: 50,
        color: Colors.light,
        fontFamily: 'Poppins-Bold'
    },
    scrollView: {
        marginTop: 10,
        marginBottom: 65
    },
});

export default UnderAveragePLayers;
