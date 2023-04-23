import React, {useContext} from 'react';
import {StyleSheet, View, Text, StatusBar, ScrollView, TouchableOpacity, SafeAreaView} from 'react-native';
import Header from "../../components/Header";
import {Image} from "react-native-elements";
import Colors from "../../assets/colors/Colors";
import {authContext} from "../../context/AuthContext";

function BestChoiceIndividual({navigation, route}) {

    const {data} = useContext(authContext)
    const {position} = route.params;
    // console.log(JSON.parse(data), 'data.position')
    const [players, setPlayers] = React.useState([]);

    const p = [
        {rank: 1, name: 'Player 1', position: 'Forward', image: {uri: 'https://picsum.photos/200/200'}, team: 'Team Name', predictedPosition: 'Predicted Position'},
        {rank: 2, name: 'Player 2', position: 'Midfielder', image: {uri: 'https://picsum.photos/200/200'}, team: 'Team Name', predictedPosition: 'Predicted Position'},
        {rank: 3, name: 'Player 3', position: 'Defender', image: {uri: 'https://picsum.photos/200/200'}, team: 'Team Name', predictedPosition: 'Predicted Position'},
        {rank: 4, name: 'Player 4', position: 'Forward', image: {uri: 'https://picsum.photos/200/200'}, team: 'Team Name', predictedPosition: 'Predicted Position'},
        {rank: 5, name: 'Player 5', position: 'Midfielder', image: {uri: 'https://picsum.photos/200/200'}, team: 'Team Name', predictedPosition: 'Predicted Position'},
        {rank: 6, name: 'Player 6', position: 'Defender', image: {uri: 'https://picsum.photos/200/200'}, team: 'Team Name', predictedPosition: 'Predicted Position'},
    ];


    [p[0], p[1]] = [p[1], p[0]];

    const playerProfileRedirect = (player) => {
        navigation.navigate('BestChoicePlayerProfile', {player: player})
    }

    return (
        <SafeAreaView style={[styles.container, {marginTop: StatusBar.currentHeight}]}>
            <Header style={styles.header} navigation={navigation}/>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Top recommendations for
                    <Text style={{fontFamily: 'Poppins-Bold', fontSize: 30}}>{'\n' + position}</Text>
                </Text>
                <View style={styles.topThreeContainer}>
                    {p.map((player, index) => {
                        if (index < 3) {
                            return (
                                <TouchableOpacity key={index} style={styles.topThree} onPress={()=>playerProfileRedirect(player)}>
                                    <Image source={player.image} style={[
                                        index === 0 ? styles.rankTwoImage : null,
                                        index === 1 ? styles.rankOneImage : null,
                                        index === 2 ? styles.rankThreeImage : null,]
                                    }/>
                                    <View style={styles.topThreeInfoContainer}>
                                        <Text style={styles.topThreeName}>{player.name}</Text>
                                        <Text style={styles.topThreePosition}>{player.position}</Text>
                                    </View>
                                    <View style={styles.topThreeRankContainer}>
                                        <Text style={styles.topThreeRank}>{player.rank}</Text>
                                    </View>
                                    {(index===1)? <View style={styles.rankOneBg}/>: null}
                                </TouchableOpacity>
                            )
                        }
                    })}
                </View>
                <ScrollView style={styles.scrollView}>
                    {p.map((player, index) => {
                        if (index >= 3) {
                            return (
                                <View key={index} style={{flexDirection: 'column'}}>
                                    <TouchableOpacity style={styles.playerContainer} onPress={()=>playerProfileRedirect(player)}>
                                        <View style={styles.rankContainer}>
                                            <Text style={styles.rank}>{player.rank}</Text>
                                        </View>
                                        <Image source={player.image} style={styles.image}/>
                                        <View style={styles.infoContainer}>
                                            <Text style={styles.name}>{player.name}</Text>
                                            <Text style={styles.position}>{player.position}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.separatorLine}/>
                                </View>

                            )
                        }
                    })}
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
    }, title: {
        fontFamily: 'Poppins',
        fontSize: 18,
        fontWeight: 200,
        marginBottom: 30,
        color: Colors.light,
    }, scrollView: {
        borderWidth: 3,
        borderColor: Colors.cards,
        backgroundColor: 'rgba(3,1,1,0.66)',
        flex: 1,
        paddingHorizontal: 10,
        marginBottom: 65,
        borderRadius: 10
    },
    separatorLine: {
        width: '80%',
        alignSelf: 'center',
        opacity: 0.2,
        flex: 1,
        height: 1,
        backgroundColor: Colors.light,
        marginBottom: 15,

    },
    playerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 7.5,
        marginTop: 7.5,
        paddingHorizontal: 10,
    },
    rankOneImage: {
        borderWidth: 3,
        borderColor: 'gold',
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    rankTwoImage: {
        marginTop: 50,
        borderWidth: 3,
        borderColor: 'silver',
        width: 70,
        height: 70,
        borderRadius: 100,
    },
    rankThreeImage: {
        marginTop: 50,
        borderWidth: 3,
        borderColor: '#CD7F32',
        width: 70,
        height: 70,
        borderRadius: 100,
    },
    rankContainer: {
        flex: 1,
        marginRight: 30,
    },
    rank: {
        fontSize: 16,
        borderRadius: 100,
        paddingVertical: 5,
        backgroundColor: Colors.cards,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.warning,
    },
    image: {
        flex: 4,
        width: 50,
        height: 50,
        borderRadius: 100,
        marginRight: 30,
    },
    infoContainer: {
        flex: 4,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light,
        fontFamily: 'Poppins',
        textAlign: "right"
    },
    position: {
        fontSize: 12,
        color: Colors.light,
        fontFamily: 'Poppins',
        textAlign: "right"
    },
    topThreeContainer: {
        flexDirection: "row",
        marginBottom: 10,
        paddingVertical: 20,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: Colors.cards,
        backgroundColor: 'rgba(3,1,1,0.66)',
    },
    topThree: {
        borderRadius: 20,
        flex: 1,
        flexDirection: 'column',
        alignItems: "center",
        paddingVertical: 10,
    },
    topPlayerImage: {
        width: 60,
        height: 60,
        borderRadius: 100,
    },
    topThreeInfoContainer: {
        alignItems: "center",
    },
    topThreeName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        color: Colors.light,
        fontFamily: 'Poppins',
    },
    topThreePosition: {
        fontSize: 12,
        color: Colors.light,
        fontFamily: 'Poppins',
    }, topThreeRankContainer: {
        backgroundColor: Colors.cards,
        borderRadius: 100,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    topThreeRank: {
        color: Colors.warning,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
    },
    rankOneBg: {
        height: '80%',
        width: '100%',
        zIndex: -2,
        bottom: 0,
        position: "absolute",
        backgroundColor: Colors.cards,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        opacity: 0.5,
    }


});

export default BestChoiceIndividual;
