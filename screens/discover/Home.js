import React from 'react';
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

function Home({navigation}) {

    const bestChoicesRedirect = () => {
        navigation.navigate('BestChoices')
    }

    const underAverageRedirect = () => {
        navigation.navigate('UnderAveragePLayers')
    }

    return (
        <SafeAreaView style={[styles.container, {marginTop: StatusBar.currentHeight}]}>
            <Header style={styles.header} navigation={navigation}/>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Discover</Text>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        placeholderTextColor="#C4C4C4"
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
                    <TouchableOpacity style={styles.card} onPress={underAverageRedirect}>
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
        backgroundColor: Colors.light,
        borderRadius: 15,
        height: 40,
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginBottom: 50,
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
});

export default Home;
