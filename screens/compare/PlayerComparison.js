import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, StatusBar, SafeAreaView, TouchableOpacity} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import axios from "axios";

import Header from "../../components/Header";
import Colors from "../../assets/colors/Colors";
import {authContext} from "../../context/AuthContext";
import {URLS} from "../../config/urls";

function PlayerComparison({navigation}) {

    const {players} = useContext(authContext)

    const [list, setList] = useState(['No players available'])
    const [player1, setPlayer1] = useState(null);
    const [player2, setPlayer2] = useState(null);

    useEffect(() => {
        let x = []
        for (let i = 0; i < players.length; i++) {
            x.push(players[i].name)
        }
        setList(x)
        console.log(list)
    }, []);

    const handleCompare = () => {
        if ((player1!==null) & (player2!==null) && (player1 !== player2) ) {
            navigation.navigate('playerComparisonSelect', {player1: players[player1-1], player2: players[player2-1]})
        } else {
            alert('Please select two unique players to compare')
        }
    };

    return (
        <SafeAreaView style={[styles.container, {marginTop: StatusBar.currentHeight}]}>
            <Header style={styles.header} navigation={navigation}/>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Player Comparison</Text>
                <Text style={styles.instructions}>Select the two players you want to compare:</Text>
                <View style={styles.dropdownsContainer}>
                    <SelectDropdown
                        buttonStyle={styles.selectButton}
                        defaultButtonText={'Select Player 1'}
                        buttonTextStyle={styles.buttonText}
                        searchPlaceHolder={'Search'}
                        search={true}
                        data={list}
                        onSelect={(selectedItem, index) => {
                            setPlayer1(index+1)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                    <SelectDropdown
                        buttonStyle={styles.selectButton}
                        defaultButtonText={'Select Player 2'}
                        buttonTextStyle={styles.buttonText}
                        searchPlaceHolder={'Search'}
                        search={true}
                        data={list}
                        onSelect={(selectedItem, index) => {
                           setPlayer2(index)
                            console.log(index+1)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                </View>
                <TouchableOpacity style={styles.compareButton} onPress={handleCompare}>
                    <Text style={styles.compareButtonText}>Compare</Text>
                </TouchableOpacity>
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
    contentContainer: {
        width: '100%',
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 30,
        marginBottom: 100,
        color: Colors.light,
        fontFamily: 'Poppins-Bold'
    },
    instructions: {
        fontFamily: 'Poppins',
        color: Colors.light
    },
    dropdownsContainer: {
        marginTop: 25,
        marginBottom: 16,
        paddingHorizontal: 30
    },
    compareButton: {
        width: '80%',
        alignSelf: 'center',
        backgroundColor: Colors.light,
        borderRadius: 15,
        marginTop: 30,
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingVertical: 10
    },
    compareButtonText: {
        color: Colors.dark,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
    },
    selectButton: {
        backgroundColor: Colors.light,
        width: '100%',
        borderRadius: 15,
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderWidth: 3,
        borderColor: Colors.highlight
    },
    buttonText: {
        color: Colors.dark,
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'Poppins',
    },

});

export default PlayerComparison;
