import React from 'react';
import {StyleSheet, View, Text, StatusBar, SafeAreaView, Image, ScrollView} from 'react-native';
import Header from "../../components/Header";
import Colors from "../../assets/colors/Colors";

function PlayerProfile({navigation, route}) {

const {player} = route.params;

    return (
        <SafeAreaView style={[styles.container, {marginTop: StatusBar.currentHeight}]}>
            <Header style={styles.header} navigation={navigation}/>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{player.name}</Text>
                <Image source={{ uri: 'https://picsum.photos/200/200' }} style={styles.image} />
                <ScrollView style={{marginBottom: 65}}>
                    <Text style={styles.text}>Team</Text>
                    <Text style={styles.details}>{player.team}</Text>
                    <Text style={styles.text}>Position</Text>
                    <Text style={styles.details}>{player.position}</Text>
                    <Text style={styles.text}>Age</Text>
                    <Text style={styles.details}>{player.age}</Text>
                    <Text style={styles.text}>Nationality</Text>
                    <Text style={styles.details}>{player.nationality}</Text>
                    <Text style={styles.text}>Height</Text>
                    <Text style={styles.details}>{player.height}</Text>
                    <Text style={styles.text}>Weight</Text>
                    <Text style={styles.details}>{player.weight}</Text>
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
        fontFamily: 'Poppins-Bold',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 50,
        color: Colors.light,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 30,
        alignSelf: 'center',
        borderColor: Colors.highlight,
        borderWidth: 2,
    },
    text: {
        fontFamily: 'Poppins',
        color: Colors.light,
        fontSize: 13,
    },
    details: {
        fontFamily: 'Poppins',
        color: Colors.light,
        fontSize: 22,
        marginBottom: 10,
        alignSelf: 'center',
    }
});

export default PlayerProfile;
