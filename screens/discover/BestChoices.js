import React from 'react';
import {StyleSheet, View, Text, SafeAreaView, StatusBar, ScrollView, TouchableOpacity} from 'react-native';
import Header from "../../components/Header";
import Colors from "../../assets/colors/Colors";
import {Image} from "react-native-elements";


function BestChoice({navigation}) {

    const data = [
        { id: 1, position: 'Goalkeeper', image: {uri: 'https://picsum.photos/200/200'} },
        { id: 2, position: 'Defender', image: {uri: 'https://picsum.photos/200/200'} },
        { id: 3, position: 'Midfielder', image: {uri: 'https://picsum.photos/200/200'} },
        { id: 4, position: 'Forward', image: {uri: 'https://picsum.photos/200/200'} },
        { id: 5, position: 'Forward', image: {uri: 'https://picsum.photos/200/200'} },
        { id: 6, position: 'Forward', image: {uri: 'https://picsum.photos/200/200'} },
    ];

    const cardClick = (item) => {
        console.log(item, 'clicked');
        navigation.navigate('BestChoice', {position: item.position})
    }

    return (
        <SafeAreaView style={[styles.container, {marginTop: StatusBar.currentHeight}]}>
            <Header style={styles.header} navigation={navigation}/>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Best choice</Text>
                <ScrollView style={styles.scrollView}>
                    {data.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.card} onPress={()=>cardClick(item)}>
                            <Image source={item.image} style={styles.cardImage} />
                            <View style={{flexDirection: 'column'}}>
                                <Text style={styles.cardTitle}>Position </Text>
                                <Text style={styles.position}>{item.position}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
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
    scrollView: {
        marginTop: 10,
        marginBottom: 65
    },
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

export default BestChoice;
