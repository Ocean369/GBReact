import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyB8avaECzXnUAtOsc4UEDkqSLr_UZXFtHU",
    authDomain: "chatauthentication-21bb4.firebaseapp.com",
    databaseURL: "https://chatauthentication-21bb4-default-rtdb.firebaseio.com",
    projectId: "chatauthentication-21bb4",
    storageBucket: "chatauthentication-21bb4.appspot.com",
    messagingSenderId: "650804107336",
    appId: "1:650804107336:web:f3567d85ffdb72ccf0607d"
};

const firebaseDB = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
