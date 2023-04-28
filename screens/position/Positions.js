import React from 'react';
import {StyleSheet, View, Text, StatusBar, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import Header from "../../components/Header";
import Colors from "../../assets/colors/Colors";
import {Image} from "react-native-elements";
import PositionList from "../../components/PositionList";

function Positions({navigation}) {

    const data = [
        { id: 1, position: 'Goalkeeper', description: 'Football player who is responsible for protecting the team\'s goalpost and stopping the ball from entering.', image: {uri: 'https://img.freepik.com/premium-photo/soccer-goalkeeper-that-makes-a-great-save-and-avoids-a-goal-during-a-match-at-the-stadium_207634-7302.jpg?w=2000'} },
        { id: 2, position: 'Defender', description: 'Football player who plays in the team\'s defensive line, aiming to prevent the opponent from scoring.', image: {uri: 'https://img.freepik.com/premium-photo/cinematic-image-soccer-freestyle-player-making-tricks-with-ball_186382-32006.jpg'} },
        { id: 3, position: 'Midfielder', description: 'Football player who plays in the center of the field, responsible for linking the team\'s defense and attack.', image: {uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU2h6abJgckZvwTr8c364w5aof13vjfDlPOeWmO97bmaeniHoBekwALeQR2c_PjR03RDI&usqp=CAU'} },
        { id: 4, position: 'Forward', description: 'Football player who plays in the attacking line, aiming to score goals and create scoring opportunities.', image: {uri: 'https://img.freepik.com/premium-photo/youth-soccer-lessons-stadium_383647-1948.jpg'} },
    ];

    const cardClick = (item) => {
        console.log(item, 'clicked');
        navigation.navigate('PositionsSingle', {position: item})
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

});

export default Positions;
