import React from 'react';
import {StyleSheet, View, Text, StatusBar, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import Header from "../../components/Header";
import Colors from "../../assets/colors/Colors";

function BestChoicePlayerProfile({navigation, route}) {

    const {player} = route.params;

    const playerProfileRedirect = () =>{
        navigation.navigate('PlayerProfile', {player: player});
    }

    return (
        <SafeAreaView style={[styles.container, {marginTop: StatusBar.currentHeight}]}>
            <Header style={styles.header} navigation={navigation}/>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{`Rank ${player.rank}`}</Text>
                <Image source={{uri: player.photo}} style={styles.profilePic}/>
                <Text style={styles.name}>{player.name}</Text>
                <Text style={styles.team}>{player.team}</Text>
                <View style={styles.currentPositionsContainer}>
                    <Text style={styles.currentPositionsTitle}>Current Position :</Text>
                    <Text style={styles.currentPosition}>{player.position}</Text>
                </View>
                <View style={styles.predictedPositionsContainer}>
                    <Text style={styles.predictedPositionsTitle}>Predicted Position:</Text>
                    <Text style={styles.predictedPosition}>{player.predicted_position}</Text>
                </View>
                <TouchableOpacity style={styles.profileLinkContainer} onPress={playerProfileRedirect}>
                    <Text style={styles.profileLink}>Click to view the player profile</Text>
                </TouchableOpacity>
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
    profilePic: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        borderRadius: 100,
        marginBottom: 80,
        borderWidth: 3,
        borderColor: Colors.highlight,
    },
    name: {
        fontFamily: 'Poppins-Bold',
        color: Colors.light,
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 12,
        paddingHorizontal: 16,
    },
    team: {
        fontFamily: 'Poppins',
        color: Colors.light,
        fontSize: 18,
        paddingHorizontal: 16,

    },
    currentPositionsContainer: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 50,
    },
    currentPositionsTitle: {
        fontFamily: 'Poppins',
        color: Colors.light,
        fontSize: 18,
        marginRight: 8,
    },
    currentPosition: {
        fontFamily: 'Poppins-Bold',
        color: Colors.light,
        fontSize: 18,
        marginRight: 8,
    },
    predictedPositionsContainer: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: Colors.cards,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.light,
    },
    predictedPositionsTitle: {
        alignSelf: 'center',
        fontFamily: 'Poppins',
        color: Colors.light,
        fontSize: 18,
        marginRight: 8,
    },
    predictedPosition: {
        fontFamily: 'Poppins-Bold',
        color: Colors.light,
        fontSize: 18,
        marginRight: 8,
    },
    title: {
        fontFamily: 'Poppins-Bold',
        fontSize: 30,
        fontWeight: 900,
        marginBottom: 50,
        color: Colors.light,
    },
    profileLinkContainer:{
        alignSelf: "center",
        marginTop: 10
    },
    profileLink:{
        fontFamily: 'Poppins',
        fontSize: 14,
        color: Colors.light
    }
});

export default BestChoicePlayerProfile;
