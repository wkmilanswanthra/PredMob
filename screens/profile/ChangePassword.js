import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import Header from "../../components/Header";
import Colors from "../../assets/colors/Colors";
import {updatePassword} from "firebase/auth";
import {auth} from "../../config/FirebaseConfig";

function ChangePassword({navigation}) {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    function handlePasswordChange() {
        setLoading(true);
        if (newPassword !== confirmNewPassword) {
            alert('Passwords do not match');
            return;
        }
        if (newPassword.length < 6) {
            alert('Password must be at least 6 characters long');
            return;
        }

        updatePassword(auth.currentUser, newPassword).then(() => {
            alert('Password changed successfully');
            setLoading(false);
            navigation.goBack();
        }).catch((error) => {
            alert('Something went wrong');
            setLoading(false);
        });
    }

    return (
        <SafeAreaView style={[styles.container, {marginTop: StatusBar.currentHeight}]}>
            <Header style={styles.header} navigation={navigation}/>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Change Password</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor={Colors.secondary}
                    placeholder="Current password"
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor={Colors.secondary}
                    placeholder="New password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor={Colors.secondary}
                    placeholder="Confirm new password"
                    value={confirmNewPassword}
                    onChangeText={setConfirmNewPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
                    {loading && <ActivityIndicator size="small" color="#FFFFFF" style={{marginRight: 10}}/>}
                    {!loading && <Text style={styles.buttonText}>Change Password</Text>}
                </TouchableOpacity>
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
        marginBottom: 100,
        color: Colors.light,
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
    buttonText: {
        color: Colors.dark,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
    },
});

export default ChangePassword;