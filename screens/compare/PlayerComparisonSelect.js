import React from 'react';
import {StyleSheet, View, Text, StatusBar, SafeAreaView, Image} from 'react-native';
import Header from "../../components/Header";
import Colors from "../../assets/colors/Colors";

function PLayerComparisonSelect({navigation, route}) {

    const {player1, player2} = route.params;

    return (
        <SafeAreaView style={[styles.container, {marginTop: StatusBar.currentHeight}]}>
            <Header style={styles.header} navigation={navigation}/>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Player Comparison</Text>
                <View style={styles.playersContainer}>
                    <View style={styles.playerContainer}>
                        <Image style={styles.playerImage} source={{ uri: player1.photo }} />
                        <Text style={styles.playerName} numberOfLines={1}>{player1.name}</Text>
                        <Text style={styles.playerStatsTitle}>Position</Text>
                        <Text style={styles.playerStats} numberOfLines={1}>{player1.position}</Text>
                        <Text style={styles.playerStatsTitle}>Age</Text>
                        <Text style={styles.playerStats} numberOfLines={1}>{Math.floor((new Date() - new Date(player1.date_of_birth)) / 31557600000)}</Text>
                        <Text style={styles.playerStatsTitle}>Height</Text>
                        <Text style={styles.playerStats} numberOfLines={1}>{player1.height} cm</Text>
                        <Text style={styles.playerStatsTitle}>Weight</Text>
                        <Text style={styles.playerStats} numberOfLines={1}>{player1.weight} kg</Text>
                        <Text style={styles.playerStatsTitle}>Goals</Text>
                        <Text style={styles.playerStats} numberOfLines={1}>{player1.goals}</Text>
                    </View>
                    <View style={styles.separator}/>
                    <View style={styles.playerContainer}>
                        <Image style={styles.playerImage} source={{  uri: player2.photo }} />
                        <Text style={styles.playerName} numberOfLines={1}>{player2.name}</Text>
                        <Text style={styles.playerStatsTitle}>Position</Text>
                        <Text style={styles.playerStats} numberOfLines={1}>{player2.position}</Text>
                        <Text style={styles.playerStatsTitle}>Age</Text>
                        <Text style={styles.playerStats} numberOfLines={1}>{Math.floor((new Date() - new Date(player2.date_of_birth)) / 31557600000)}</Text>
                        <Text style={styles.playerStatsTitle}>Height</Text>
                        <Text style={styles.playerStats} numberOfLines={1}>{player2.height} cm</Text>
                        <Text style={styles.playerStatsTitle}>Weight</Text>
                        <Text style={styles.playerStats} numberOfLines={1}>{player2.weight} kg</Text>
                        <Text style={styles.playerStatsTitle}>Goals</Text>
                        <Text style={styles.playerStats} numberOfLines={1}>{player2.goals}</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.bg
    },
    title: {
        fontSize: 30,
        marginBottom: 30,
        color: Colors.light,
        fontFamily: 'Poppins-Bold'
    },
    contentContainer: {
        maxWidth: '100%',
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 10,
    },
    playersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    playerContainer: {
        width: '45%',
    },
    playerImage: {
        alignSelf: 'center',
        width: 120,
        height: 120,
        borderWidth: 3,
        borderColor: Colors.highlight,
        borderRadius: 75,
        marginBottom: 30,
    },
    playerName: {
        alignSelf: 'center',
        fontFamily: 'Poppins',
        color: Colors.light,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    playerStatsTitle: {
        fontFamily: 'Poppins',
        color: Colors.light,
        fontSize: 12,
    }, playerStats: {
        alignSelf: "center",
        fontFamily: 'Poppins-Light',
        color: Colors.light,
        fontSize: 22,
        marginBottom: 10,
    },
    separator: {
        width: 1,
        height: '80%',
        transform: [{translateY: 100}],
        backgroundColor: Colors.light,
        opacity: 0.2,
    }

});

export default PLayerComparisonSelect;
