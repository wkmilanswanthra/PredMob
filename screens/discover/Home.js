import React, {useState, useEffect, useContext} from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    StatusBar,
    TextInput,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Colors from "../../assets/colors/Colors";
import Header from "../../components/Header";
import {auth} from "../../config/FirebaseConfig";
import SelectDropdown from "react-native-select-dropdown";
import {authContext} from "../../context/AuthContext";
import axios from "axios";
import {URLS} from "../../config/urls";
import {Ionicons} from "@expo/vector-icons";

function Home({navigation}) {

    const {players} = useContext(authContext)
    // console.log(players)
    const [playersList , setPlayersList] = useState([{
        name: 'No players available'
    }])
    useEffect(() => {
        let x = []
        for (let i = 0; i < players.length; i++) {
            x.push(players[i].name)
        }
        setPlayersList(x)
    },[])

    const bestChoicesRedirect = () => {
        navigation.navigate('BestChoices')
    }

    const underAverageRedirect = () => {
        navigation.navigate('UnderAveragePLayers')
    }

    const addPlayerRedirect = () => {
        navigation.navigate('AddPlayer')
    }

    return (
        <SafeAreaView style={[styles.container, {marginTop: StatusBar.currentHeight}]}>
            <Header style={styles.header} navigation={navigation}/>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Discover</Text>
                <View style={styles.searchContainer}>
                    <SelectDropdown
                        buttonStyle={styles.selectButton}
                        defaultButtonText={'Search Player'}
                        buttonTextStyle={styles.buttonText}
                        searchPlaceHolder={'Search players'}
                        search={true}
                        data={playersList}
                        renderSearchInputRightIcon={() => {
                            return (<Ionicons name={'search'} style={styles.icon} size={25} color={'#333'}></Ionicons>)
                        }}
                        onSelect={(selectedItem, index) => {
                            if(selectedItem==='No players available')return
                            navigation.navigate('PlayerProfile', {player: players[index]})
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                </View>
                <ScrollView style={styles.scrollView}>
                    <TouchableOpacity style={styles.card} onPress={bestChoicesRedirect}>
                        <Image
                            source={require('../../assets/images/card_1.png')}
                            style={styles.cardImage}
                        />
                        <Text style={styles.cardTitle}>Best Choices</Text>
                        <Text style={styles.cardDescription}>
                            Select the best footballer for the respective position using the latest Machine Learning
                            algorithms.
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card} onPress={underAverageRedirect}>
                        <Image
                            source={require('../../assets/images/card-2.jpg')}
                            style={styles.cardImage}
                        />
                        <Text style={styles.cardTitle}>Under Average Players</Text>
                        <Text style={styles.cardDescription}>
                            Browse a list of players who have underperformed this season.
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.card, {backgroundColor: '#6C5ECF'}]} onPress={addPlayerRedirect}>
                        <Image
                            source={require('../../assets/images/card-3.jpg')}
                            style={styles.cardImage}
                        />
                        <Text style={styles.cardTitle}>Add a player</Text>
                        <Text style={styles.cardDescription}>
                            Adda a new player and get the predictions for the next season.
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
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
        maxWidth: '100%',
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 10,
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
    searchContainer: {
        borderRadius: 15,
        justifyContent: 'center',
        marginBottom: 20,
    },
    searchInput: {
        fontSize: 15,
        color: Colors.dark,
    },
    card: {
        backgroundColor: Colors.cards,
        borderRadius: 15,
        marginBottom: 20,
        width: '100%',
        padding: 15,
    },
    cardImage: {
        maxWidth: '100%',
        width: '100%',
        height: 100,
        borderRadius: 15,
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: Colors.light,
        fontFamily: 'Poppins'
    },
    cardDescription: {
        color: Colors.light,
        fontSize: 12,
        fontFamily: 'Poppins'
    },
    selectButton: {
        backgroundColor: Colors.light,
        width: '100%',
        borderRadius: 15,
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    buttonText: {
        color: Colors.dark,
        textAlign: 'left',
        fontSize: 15,
        fontFamily: 'Poppins',
    },
});

export default Home;
