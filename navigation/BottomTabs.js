import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, StyleSheet, Platform} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'

import HomeNavigator from './HomeNavigator';
import ProfileNavigator from './ProfileNavigator';
import PositionsNavigator from './PositionsNavigator';
import ComparisonNavigator from './ComparisonNavigator';
import Colors from "../assets/colors/Colors";
import {ActivityIndicator} from "react-native";
import {useContext, useEffect, useState} from "react";
import {authContext} from "../context/AuthContext";
import axios from "axios";
import {URLS} from "../config/urls";

const Tab = createBottomTabNavigator();

function BottomTabs() {
    const {setBestChoiceData, setAltData, setPlayers} = useContext(authContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const bestChoice = await axios.get(URLS.GET_DATA, {timeout: 10000});
                const altData = await axios.get(URLS.GET_ALT_DATA,{timeout: 10000});
                const players = await axios.get(URLS.COMPARISON,{timeout: 10000});
                setBestChoiceData(bestChoice.data);
                setAltData(altData.data);
                players && setPlayers(players.data.players[0]);
                setIsLoading(false);
            } catch (e) {
                console.log(e);
            }
        }

        fetchData();
    }, []);
    return (
        <>
            {isLoading ? <ActivityIndicator
                    size="large"
                    color={Colors.highlight}
                    style={{position: 'absolute', top: '50%', left: '50%'}}
                /> :
                <Tab.Navigator
                    screenOptions={({route}) => ({
                        headerShown: false,
                        tabBarStyle: styles.tabBarStyle,
                        tabBarLabelStyle: {fontFamily: 'Poppins'},
                        tabBarInactiveTintColor: Colors.light,
                        tabBarActiveTintColor: Colors.highlight,
                        tabBarIcon: ({color, size, focused}) => {
                            let iconName;
                            if (route.name === "Discover") {
                                iconName = focused ? 'ios-planet' : 'ios-planet-outline';
                            } else if (route.name === "Positions") {
                                iconName = focused ? 'ios-compass' : 'ios-compass-outline';
                            } else if (route.name === "Compare") {
                                iconName = focused ? 'ios-stats-chart-sharp' : 'ios-stats-chart-outline';
                            } else if (route.name === "Profile") {
                                iconName = focused ? 'ios-person-circle-sharp' : 'ios-person-circle-outline';
                            }
                            return <Icon color={color} name={iconName} size={!focused ? 20 : 25}/>
                        }
                    })}
                >
                    <Tab.Screen name="Discover" component={HomeNavigator}/>
                    <Tab.Screen name="Positions" component={PositionsNavigator}/>
                    <Tab.Screen name="Compare" component={ComparisonNavigator}/>
                    <Tab.Screen name="Profile" component={ProfileNavigator}/>
                </Tab.Navigator>}
                </>
            );
            }

            const styles = StyleSheet.create({
            tabBarStyle: {
            height: Platform.OS==='ios'? 90:65,
            position: 'absolute',
            borderTopWidth: 0,
            bottom: 0,
            backgroundColor: Colors.bottomBar,
            paddingTop: 10,
            paddingBottom: Platform.OS==='ios'? 35:10,
            shadowColor: 'rgba(0,0,0, .2)',
            shadowOffset: {height: -1, width: 0},
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 1,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
        }
        })

            export default BottomTabs;