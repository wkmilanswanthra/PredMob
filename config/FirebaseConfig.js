import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCUx2YbrcA0jHt83WvghncjZTWTJU9s0Zw",
    authDomain: "test-bed-15521.firebaseapp.com",
    projectId: "test-bed-15521",
    storageBucket: "test-bed-15521.appspot.com",
    messagingSenderId: "571008537563",
    appId: "1:571008537563:web:d1e43f2e389a9911978dfe"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});


export {auth, app, provider};
