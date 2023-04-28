import React from 'react';
import {View, Text, StyleSheet, StatusBar, SafeAreaView, Image, TouchableOpacity, ScrollView} from 'react-native';
import Header from "../../components/Header";
import Colors from "../../assets/colors/Colors";
import {Ionicons} from "@expo/vector-icons";
import * as Linking from 'expo-linking';

function ContactUs({navigation}) {

    const clickContact = () => {
        Linking.openURL('sms://+94774484560');
    }

    const clickEmail = () => {
        Linking.openURL('mailto://chamikarakariyapperuma@gmail.com');
    }

    const clickGithub = () => {
        Linking.openURL('https://github.com/chamikarak');
    }

    const clickLinkedIn = () => {
        Linking.openURL('http://www.linkedin.com/in/chamikarakariyapperuma');
    }

    const clickPortfolio = () => {
        Linking.openURL('https://chamikarak.github.io/Portfolio/');
    }

    return (
        <SafeAreaView style={[styles.container, {marginTop: StatusBar.currentHeight}]}>
            <Header style={styles.header} navigation={navigation}/>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Contact us</Text>
                <Image
                    source={{uri: 'https://chamikarak.github.io/Portfolio/images/myphoto.jpg'}}
                    style={styles.image}
                />
                <Text style={styles.name}>Chamikara Kariyapperuma</Text>
                <ScrollView style={{marginBottom: 65}}><TouchableOpacity style={styles.contactBtn}
                                                                         onPress={clickContact}>
                    <Text style={styles.buttonText}>Contact</Text>
                    <View style={styles.iconContainer}>
                        <Ionicons name="call" size={20} color="#000"/>
                    </View>
                </TouchableOpacity>
                    <TouchableOpacity style={styles.contactBtn} onPress={clickEmail}>
                        <Text style={styles.buttonText}>Email</Text>
                        <View style={styles.iconContainer}>
                            <Ionicons name="mail" size={20} color="#000"/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactBtn} onPress={clickGithub}>
                        <Text style={styles.buttonText}>Github</Text>
                        <View style={styles.iconContainer}>
                            <Ionicons name="logo-github" size={20} color="#000"/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactBtn} onPress={clickPortfolio}>
                        <Text style={styles.buttonText}>Portfolio</Text>
                        <View style={styles.iconContainer}>
                            <Ionicons name="code-slash-outline" size={20} color="#000"/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactBtn} onPress={clickLinkedIn}>
                        <Text style={styles.buttonText}>LinkIn</Text>
                        <View style={styles.iconContainer}>
                            <Ionicons name="logo-linkedin" size={20} color="#000"/>
                        </View>
                    </TouchableOpacity></ScrollView>
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
        width: 120,
        height: 120,
        borderRadius: 75,
        marginBottom: 30,
        borderWidth: 2,
        borderColor: Colors.highlight,
        alignSelf: 'center',
    },
    name: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.light,
        fontFamily: 'Poppins-Bold',
        marginBottom: 20,
    },
    description: {
        textAlign: 'justify',
        fontSize: 13,
        lineHeight: 24,
        color: Colors.light,
        paddingHorizontal: 10,
        fontFamily: 'Poppins',
        marginBottom: 30,

    },
    buttonText: {
        color: Colors.dark,
        textAlign: 'center',
        fontSize: 12,
        fontFamily: 'Poppins',
    },
    contactBtn: {
        alignSelf: 'center',
        backgroundColor: Colors.light,
        borderRadius: 20,
        paddingHorizontal: 30,
        paddingVertical: 10,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        marginLeft: 16,
    }
});

export default ContactUs;