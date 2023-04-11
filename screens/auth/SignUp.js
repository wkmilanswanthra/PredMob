import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import {Feather, Ionicons} from '@expo/vector-icons';
import Colors from "../../assets/colors/Colors";
import {authContext} from "../../context/AuthContext";
import {createUserWithEmailAndPassword,} from "firebase/auth";
import {auth} from "../../config/FirebaseConfig";

export default function SignUpScreen({navigation}) {

    const {loggedIn, setLoggedIn, userInfo, setUserInfo} = React.useContext(authContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignUp = () => {
        setLoading(true);

        if ((name === '') || (email === '') || (password === '')) {
            alert('Please fill all fields');
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

        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            setUserInfo({...userInfo,
                id: userCredential.user.uid,
                name: name,
                email: userCredential.user.email,
                profileImg: 'https://robohash.org/'+email+'?set=set1&bgset=bg2&size=200x200'
            });
        }).then((userCredential) => {
            setLoggedIn(true);
            console.log(userInfo)
        }).catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                alert('That email address is already in use!');
            }else {
                alert('Something went wrong!');
            }
            console.log(error)
            setLoading(false);
        }).finally(() => {
            setLoading(false);
        });
    };

    const loginRedirect = () => {
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign up</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor={Colors.secondary}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={Colors.secondary}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <View style={styles.passwordInputContainer}>
                    <TextInput
                        style={[styles.input, styles.passwordInput]}
                        placeholder="Password"
                        placeholderTextColor={Colors.secondary}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                        style={styles.passwordToggleButton}
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
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                {loading && <ActivityIndicator size="small" color={Colors.dark}/>}
                {!loading &&  <Text style={styles.buttonText}>Sign up</Text>}

            </TouchableOpacity>
            <View style={styles.separatorContainer}>
                <View style={styles.separatorLine}/>
                <Text style={styles.separatorText}>Or continue with</Text>
                <View style={styles.separatorLine}/>
            </View>
            <TouchableOpacity style={[styles.button, styles.googleBtn]}>
                <Text style={styles.buttonText}>Sign up with Google</Text>
                <Ionicons style={{marginLeft: 10}} name="logo-google" size={20} color="#000"/>
            </TouchableOpacity>
            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={loginRedirect}>
                    <Text style={styles.loginLink}>Log in</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bg,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 80,
        color: Colors.light

    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        backgroundColor: Colors.light,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 20,
        color: Colors.dark,
        fontFamily: 'Poppins',
    }, passwordInput: {
        flex: 1
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordToggleButton: {
        position: 'absolute',
        right: 5,
        top: 10,
        padding: 8,
    },
    button: {
        width: '100%',
        backgroundColor: Colors.light,
        borderRadius: 15,
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingVertical: 10,
        alignItems: "center"
    },
    buttonText: {
        color: Colors.dark,
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
    googleBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginContainer: {
        position: 'absolute',
        bottom: 80,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: "center"
    },
    loginText: {
        color: Colors.light,
        marginRight: 8,
        fontFamily: 'Poppins'
    },
    loginLink: {
        color: Colors.light,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Bold'
    },
});