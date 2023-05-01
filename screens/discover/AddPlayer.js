import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    TextInput,
    ActivityIndicator
} from 'react-native';
import Colors from "../../assets/colors/Colors";
import Header from "../../components/Header";
import axios from "axios";
import {URLS} from "../../config/urls";
import SelectDropdown from "react-native-select-dropdown";
import DateTimePicker from '@react-native-community/datetimepicker';

function AddPlayer({navigation}) {

    const [page1, setPage1] = useState(true);
    const [open, setOpen] = useState(false)
    const [dob, setDob] = useState("Date of birth")
    const [predictedPosition, setPredictedPosition] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const _scrollView = React.useRef(null);
    const _dob = React.useRef(null);

    const gender = ["male", "female"];
    const position = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];
    const team = [
        "Athletic Club",
        "Atletico de Madrid",
        "Celta de Vigo",
        "Espanyol",
        "Barcelona",
        "Sevilla",
        "Mallorca",
        "Rayo Vallecano",
        "Real Betis",
        "Real Madrid",
        "Real Sociedad",
        "Valencia CF",
        "Real Valladolid",
        "Villarreal",
        "Osasuna",
        "Elche",
        "Getafe",
        "Almeria",
        "Cadiz",
        "Girona",
    ]

    const screen1 = [
        "Name",
        "Nickname",
        "Date_of_birth",
        "Weight",
        "Height",
        "Team",
        "Shirt_number",
        "Position",
    ];
    const screen2 = [
        "Aerial_duels_won",
        "Appearances",
        "Assists_intentional",
        "Attempts_from_set_pieces",
        "Blocks",
        "Catches",
        "Clean_sheets",
        "Duels_won",
        "Goals",
        "Goals_conceded",
        "Interceptions",
        "Key_passes_attempt_assists",
        "Offsides",
        "Open_play_passes",
        "Penalties_saved",
        "Red_cards_2nd_yellow",
        "Saves_made",
        "Shots_on_target_inc_goals",
        "Straight_red_cards",
        "Successful_crosses_open_play",
        "Successful_dribbles",
        "Successful_long_passes",
        "Successful_passes_opposition_half",
        "Successful_passes_own_half",
        "Successful_short_passes",
        "Total_clearances",
        "Total_fouls_conceded",
        "Total_losses_of_possession",
        "Total_passes",
        "Total_tackles",
        "Total_touches_in_opposition_box",
        "Unsuccessful_dribbles",
        "Unsuccessful_long_passes",
        "Unsuccessful_short_passes",
        "Yellow_cards",
    ];


    const [formData, setFormData] = useState({
        Name: "",
        Nickname: "",
        Date_of_birth: "",
        Weight: 0,
        Height: 0,
        Team: "",
        Shirt_number: 0,
        Position: "",
        Aerial_duels_won: 0,
        Appearances: 0,
        Assists_intentional: 0,
        Attempts_from_set_pieces: 0,
        Blocks: 0,
        Catches: 0,
        Clean_sheets: 0,
        Duels_won: 0,
        Goals: 0,
        Goals_conceded: 0,
        Interceptions: 0,
        Key_passes_attempt_assists: 0,
        Offsides: 0,
        Open_play_passes: 0,
        Penalties_saved: 0,
        Red_cards_2nd_yellow: 0,
        Saves_made: 0,
        Shots_on_target_inc_goals: 0,
        Straight_red_cards: 0,
        Successful_crosses_open_play: 0,
        Successful_dribbles: 0,
        Successful_long_passes: 0,
        Successful_passes_opposition_half: 0,
        Successful_passes_own_half: 0,
        Successful_short_passes: 0,
        Total_clearances: 0,
        Total_fouls_conceded: 0,
        Total_losses_of_possession: 0,
        Total_passes: 0,
        Total_tackles: 0,
        Total_touches_in_opposition_box: 0,
        Unsuccessful_dribbles: 0,
        Unsuccessful_long_passes: 0,
        Unsuccessful_short_passes: 0,
        Yellow_cards: 0,
    });

    const handleInputChange = (category, value) => {
        console.log(category,": ",value)
        if ((/^d+$/.test(value))) value = parseInt(value);
        setOpen(false)
        setFormData({...formData, [category]: value});
    };

    const handleSubmit = () => {
        setIsLoading(true);
        console.log(formData);
        axios({
            method: 'post',
            url: URLS.PREDICT,
            data: formData,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function (response) {
            console.log(response.data);
            setPredictedPosition(response.data.prediction);
            setIsLoading(false);
        }).catch(function (error) {
            console.log(error);
            setIsLoading(false);
        });
    };

    const addGender = (category, value) => {
        setFormData({...formData, [category]: value});
    }

    const goToTop = () => {
        _scrollView.current.scrollTo({y: 0});
    }

    console.log(open)

    return (
        <SafeAreaView style={[styles.container, {marginTop: StatusBar.currentHeight}]}>
            <Header style={styles.header} navigation={navigation}/>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Add a player</Text>
                <ScrollView style={styles.scrollView} ref={_scrollView}>
                    {page1 && screen1.map((category, index) => (
                        <>
                            {(category !== "Position" && category !== "Team" && category !== "Date_of_birth") ?
                                <TextInput
                                    key={index}
                                    style={styles.input}
                                    placeholder={category.replace(/_/g, " ")}
                                    placeholderTextColor={"#9f9f9f"}
                                    keyboardType="text"
                                    onChangeText={(value) => handleInputChange(category, value)}
                                />
                                :
                                (
                                    (category !== "Date_of_birth") ?
                                        <SelectDropdown
                                            key={index}
                                            defaultButtonText={category}
                                            buttonStyle={styles.Dropdown}
                                            buttonTextStyle={styles.DropdownText}
                                            data={category === "Position" ? position : team}
                                            onSelect={(selectedItem, index) => {
                                                handleInputChange(category, selectedItem)
                                            }}
                                            buttonTextAfterSelection={(selectedItem, index) => {
                                                return selectedItem
                                            }}
                                            rowTextForSelection={(item, index) => {
                                                return item
                                            }}
                                        />
                                        :
                                        <>
                                            <TouchableOpacity key={index} style={styles.input} onPress={() => {
                                                setOpen(!open)
                                            }}>
                                                <Text>{dob}</Text>
                                            </TouchableOpacity>
                                            {open &&
                                                <DateTimePicker
                                                    testID="dateTimePicker"
                                                    value={new Date()}
                                                    mode={'date'}
                                                    onChange={(e, date) => {
                                                        handleInputChange(category, new Date(e.nativeEvent.timestamp).toISOString().split('T')[0])
                                                        try {
                                                            setDob(date.toDateString())
                                                        } catch (e) {
                                                            console.log(e)
                                                        }
                                                    }}
                                                />
                                            }
                                        </>
                                )
                            }
                        </>
                    ))}

                    {page1 &&
                        <>
                            <SelectDropdown
                                defaultButtonText={'Gender'}
                                buttonStyle={styles.Dropdown}
                                buttonTextStyle={styles.DropdownText}
                                data={gender}
                                onSelect={(selectedItem, index) => {
                                    addGender("gender", selectedItem)
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                            />
                            <TouchableOpacity style={styles.pageButtons} onPress={() => setPage1(false)}>
                                <Text style={styles.buttonText}>Next page</Text>
                            </TouchableOpacity>
                        </>
                    }

                    {!page1 && screen2.map((category) => (
                        <>
                            <TextInput
                                key={category}
                                style={styles.input}
                                placeholder={category.replace(/_/g, " ")}
                                placeholderTextColor={"#9f9f9f"}
                                keyboardType="numeric"
                                onChangeText={(value) => handleInputChange(category, value)}
                            />
                        </>
                    ))}

                    {!page1 &&
                        <>
                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                {isLoading ? <ActivityIndicator color={'#333'} size={"small"}/> :
                                    <Text style={styles.buttonText}>Submit</Text>}
                            </TouchableOpacity>
                            <View style={styles.predictedPositionsContainer}>
                                <Text style={styles.predictedPositionsTitle}>Predicted Position:</Text>
                                <Text style={styles.predictedPosition}>{predictedPosition}</Text>
                            </View>
                            <TouchableOpacity style={styles.pageButtons} onPress={() => setPage1(true)}>
                                <Text style={styles.buttonText}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.goToTop} onPress={goToTop}>
                                <Text style={styles.buttonText}>Go to top</Text>
                            </TouchableOpacity>
                        </>
                    }

                </ScrollView>
            </View>
        </SafeAreaView>
    )
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
    input: {
        backgroundColor: Colors.light,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 20,
        color: Colors.dark,
        fontFamily: 'Poppins',
    },
    button: {
        width: '80%',
        alignSelf: 'center',
        backgroundColor: Colors.light,
        borderRadius: 15,
        marginTop: 30,
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingVertical: 10
    },
    pageButtons: {
        width: '40%',
        alignSelf: 'center',
        backgroundColor: Colors.light,
        borderRadius: 15,
        marginTop: 30,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    buttonText: {
        color: Colors.dark,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
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
    goToTop: {
        width: '80%',
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingVertical: 10
    },
    Dropdown: {
        backgroundColor: Colors.light,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
    },
    DropdownText: {
        color: '#9f9f9f',
        fontFamily: 'Poppins',
        fontSize: 14,
        textAlign: 'left',
        marginLeft: 10,
    }

});

export default AddPlayer;