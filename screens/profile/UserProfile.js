import React, {useContext} from 'react';
import {StyleSheet, View, Text, StatusBar, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import Colors from "../../assets/colors/Colors";
import Header from "../../components/Header";
import {Ionicons} from "@expo/vector-icons";
import {authContext} from "../../context/AuthContext";
import {auth} from "../../config/FirebaseConfig";

function UserProfile({navigation}) {

    const {loggedIn, setLoggedIn, userInfo, setUserInfo} = useContext(authContext);


    const handleEditProfile = () => {
        navigation.navigate('EditProfile');
    };

    const handleChangePassword = () => {
        navigation.navigate('ChangePassword');
    };

    const handleContactUs = () => {
        navigation.navigate('ContactUs');
    };

    const handleLogout = () => {
        if (loggedIn) {
            auth.signOut().then(async () => {
                console.log('User signed out!');
                await setUserInfo({id: '', name: '', email: '', profileImg: '', authMethod: ''});
                setLoggedIn(false);
            }).catch((error) => {
                console.log(error);
            });
        }
    };

    return (
        <SafeAreaView style={[styles.container, {marginTop: StatusBar.currentHeight}]}>
            <Header style={styles.header} navigation={navigation}/>
            <View style={styles.contentContainer}>
                <Image source={{uri: userInfo.profileImg}} style={styles.profileImage}/>
                <Text style={styles.greetingText}>Hello, {userInfo && userInfo.name}!</Text>
                <View style={styles.optionsContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleEditProfile} disabled={userInfo.authMethod==='google'}>
                        <Ionicons name={'create-outline'} style={styles.icon} size={25}></Ionicons>
                        <Text style={styles.buttonText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleChangePassword} disabled={userInfo.authMethod==='google'}>
                        <Ionicons name={'create-outline'} style={styles.icon} size={25}></Ionicons>
                        <Text style={styles.buttonText}>Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleContactUs}>
                        <Ionicons name={'information-circle-outline'} style={styles.icon} size={25}></Ionicons>
                        <Text style={styles.buttonText}>Contact Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {
                        backgroundColor: Colors.danger,
                        borderBottomRightRadius: 20,
                        borderBottomLeftRadius: 20
                    }]} onPress={handleLogout}>
                        <Ionicons name={'log-out-outline'} style={styles.icon} size={25}></Ionicons>
                        <Text style={styles.buttonText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
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
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 75,
        marginBottom: 20,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: Colors.highlight,
    },
    greetingText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 50,
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        color: Colors.light,
    },
    button: {
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    icon: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center',
        marginRight: 20,
    },
    optionsContainer: {
        alignSelf: 'center',
        width: '90%',
        borderRadius: 20,
        backgroundColor: Colors.bottomBar,
    }

});

export default UserProfile;
