import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator} from 'react-native';
import {Feather, Ionicons} from '@expo/vector-icons';
import {CheckBox} from 'react-native-elements';
import Colors from "../../assets/colors/Colors";
import {authContext} from "../../context/AuthContext";
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth, provider} from "../../config/FirebaseConfig";


export default function LoginScreen({navigation}) {

    const {loggedIn, setLoggedIn, userInfo, setUserInfo} = React.useContext(authContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (auth.currentUser) {
            setLoggedIn(true)
            console.log('LoginScreen.js: ' + auth.currentUser.uid)
        }
    }, [])

    const handleLogin = () => {
        setLoading(true)

        if (email === '' || password === '') {
            alert('Please fill in all fields');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            setLoading(false);
            return;
        }
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            setUserInfo({
                ...userInfo,
                id: userCredential.user.uid,
                name: email.split('@')[0],
                email: userCredential.user.email,
                profileImg: 'https://robohash.org/' + email + '?set=set1&bgset=bg2&size=200x200'
            })
        }).then(() => {
            setLoggedIn(true)
        }).catch((error) => {
            if (error.code === 'auth/user-not-found') {
                alert('User not found!');
            } else if (error.code === 'auth/wrong-password') {
                alert('Invalid Credentials!');
            } else if (error.code === 'auth/invalid-email') {
                alert('Invalid Credentials!');
            } else {
                alert('Something went wrong!');
            }
            console.log(error);
            setLoading(false);
        }).finally(() => {
            setLoading(false);
        })


    };

    const signUpRedirect = () => {
        navigation.navigate('SignUp')
    };

    const resetPassRedirect = () => {
        navigation.navigate('ResetPassword')
    };

    async function signInWithGoogle() {
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hello, Welcome!</Text>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={Colors.secondary}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor={Colors.secondary}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                        style={styles.toggleButton}
                        onPress={() => setShowPassword((prev) => !prev)}
                    >
                        <Feather
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={24}
                            color="#C4C4C4"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.rememberMeContainer}>
                <CheckBox
                    title="Remember me"
                    checked={rememberMe}
                    checkedIcon={<Image source={require('../../assets/images/checkbox_checked.png')}/>}
                    uncheckedIcon={<Image source={require('../../assets/images/checkbox_unchecked.png')}/>}
                    onPress={() => setRememberMe((prev) => !prev)}
                    containerStyle={styles.checkbox}
                    fontFamily={'Poppins'}
                    checkedColor={Colors.light}
                    textStyle={styles.rememberMeText}
                />
                <TouchableOpacity onPress={resetPassRedirect}>
                    <Text style={styles.forgotPassword}>Forgot password?</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                {loading && <ActivityIndicator size="small" color={Colors.dark}/>}
                {!loading && <Text style={styles.buttonText}>Login</Text>}
            </TouchableOpacity>
            <View style={styles.separatorContainer}>
                <View style={styles.separatorLine}/>
                <Text style={styles.separatorText}>Or continue with</Text>
                <View style={styles.separatorLine}/>
            </View>
            <TouchableOpacity style={styles.googleBtn} onPress={signInWithGoogle}>
                <Text style={styles.buttonText}>Sign in with Google</Text>
                <View style={styles.iconContainer}>
                    <Ionicons name="logo-google" size={20} color="#000"/>
                </View>
            </TouchableOpacity>
            <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Don't have an account? </Text>
                <TouchableOpacity onPress={signUpRedirect}>
                    <Text style={styles.signUpLink}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bg,
        paddingHorizontal: 24,
        paddingVertical: 32,
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 80,
        color: Colors.light,
        fontFamily: 'Poppins-Bold',
    },
    inputLabel: {
        color: Colors.dark,
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
    toggleButton: {
        position: 'absolute',
        right: 5,
        top: 12,
        padding: 8,
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    rememberMeText: {
        color: Colors.light,
        fontFamily: 'Poppins',
    },
    checkbox: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    forgotPassword: {
        marginRight: 8,
        color: Colors.light,
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
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Poppins',
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.light,
    },
    separatorText: {
        fontSize: 15,
        marginHorizontal: 16,
        color: Colors.light,
        fontFamily: 'Poppins'
    },
    signUpContainer: {
        position: 'absolute',
        bottom: 80,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signUpText: {
        color: Colors.light,
        marginRight: 8,
        fontFamily: 'Poppins'
    },
    signUpLink: {
        color: Colors.light,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Bold'
    },
    googleBtn: {
        width: '100%',
        backgroundColor: Colors.light,
        borderRadius: 15,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        marginLeft: 16,
    }

});