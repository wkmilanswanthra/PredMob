import React, {useState, useContext, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView, ActivityIndicator
} from 'react-native';
import Header from "../../components/Header";
import Colors from "../../assets/colors/Colors";
import {Ionicons} from "@expo/vector-icons";
import {authContext} from "../../context/AuthContext";
import {auth} from "../../config/FirebaseConfig";
import {updateEmail, updateProfile} from "firebase/auth";
import {isLoading} from "expo-font";
import {sendRequest} from "../../utils/Request";
import {URLS} from "../../config/urls";

function EditProfile({navigation}) {

    const {loggedIn, setLoggedIn, userInfo, setUserInfo} = useContext(authContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
        setImageURL(userInfo.profileImg);
    }, [])

    const submitData = () => {
        setLoading(true);
        if (name === '' || email === '' || imageURL === '') {
            alert('Please fill all fields');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            setLoading(false);
            return;
        }

        updateEmail(auth.currentUser, email).then( async () => {

            const body = {
                'name': name,
                'email': email,
                'profileImg': imageURL
            }

            const updatedUser = await sendRequest('PUT', body, URLS.UPDATE_USER +'/'+ userInfo.id)

            await setUserInfo({
                ...userInfo,
                name: updatedUser.data.user.name,
                email: updatedUser.data.user.email,
                profileImg: updatedUser.data.user.profileImg,
            });
            console.log(name, email, imageURL);
            setLoading(false);
            navigation.goBack()
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        })


    }

    return (
        <SafeAreaView style={[styles.container, {marginTop: StatusBar.currentHeight}]}>
            <Header style={styles.header} navigation={navigation}/>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Edit profile</Text>
                <Text style={styles.prompt}>Name</Text>
                <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />
                <Text style={styles.prompt}>Email</Text>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />
                <Text style={styles.prompt}>Profile image URL</Text>
                <TextInput
                    placeholder="Profile Image URL"
                    value={imageURL}
                    onChangeText={setImageURL}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.button} onPress={submitData}>
                    {loading && <ActivityIndicator size="small" color={Colors.dark}/>}
                    {!loading && <Text style={styles.buttonText}>Confirm</Text>}
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
    prompt: {
        fontFamily: 'Poppins',
        fontSize: 16,
        marginBottom: 10,
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
    }
});

export default EditProfile;