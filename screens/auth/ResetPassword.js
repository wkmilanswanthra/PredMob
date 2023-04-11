import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import Colors from "../../assets/colors/Colors";
import {Ionicons} from "@expo/vector-icons";
import {sendPasswordResetEmail} from "firebase/auth";
import {auth} from "../../config/FirebaseConfig";

export default function ResetPasswordScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleResetPassword = () => {
        setLoading(true);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            setLoading(false);
            return;
        }

        sendPasswordResetEmail(auth, email).then(() => {
            console.log('Email sent');
            setIsEmailSent(true);
            setLoading(false);
        }).catch((error) => {
            alert('Something went wrong');
            console.log(error);
            setLoading(false);
        })
    };

    const goBack = () => {
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>
            {!isEmailSent ? (
                <>
                    <Text style={styles.instructions}>
                        Please enter your email address to reset your password.
                    </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor={Colors.secondary}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                        {loading && <ActivityIndicator size="small" color={Colors.dark} />}
                        {!loading && <Text style={styles.buttonText}>Reset Password</Text>}
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <Text style={styles.emailSentMessage}>
                        Password reset link has been sent to your email address.
                        Please follow the instructions in the email to reset your password.
                    </Text>
                    <Ionicons style={styles.Icon} name={'shield-checkmark'} size={100} color={Colors.success}></Ionicons>
                </>
            )}
            <TouchableOpacity style={styles.goBackButton}>
                <Text style={styles.goBackButtonText} onPress={goBack}>Go back</Text>
            </TouchableOpacity>
        </View>
    );
}

// styles object

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: Colors.bg
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'Poppins',
        color: Colors.light
    },
    instructions: {
        fontFamily: 'Poppins',
        color: Colors.light,
        fontSize: 15,
        marginBottom: 50,
    },
    input: {
        backgroundColor: Colors.light,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 50,
        color: Colors.dark,
        fontFamily: 'Poppins',
    },
    button: {
        width: '100%',
        backgroundColor: Colors.light,
        borderRadius: 15,
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingVertical: 10
    },
    buttonText: {
        color: Colors.dark,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    goBackButton: {
        position: 'absolute',
        top: 80,
        left: 20,
    },
    goBackButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light,
    },
    emailSentMessage: {
        fontSize: 15,
        fontFamily: 'Poppins',
        color: Colors.light,
        marginBottom: 20,
    },
    Icon: {
        margin: 80,
        alignSelf: 'center',
    }
});