// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAeZybnPH3eMiYQ5jZF0CgQPLaLrrNV-10",
    authDomain: "cymatones-a1a73.firebaseapp.com",
    projectId: "cymatones-a1a73",
    storageBucket: "cymatones-a1a73.appspot.com",
    messagingSenderId: "335163698403",
    appId: "1:335163698403:web:146c2a7e32c6db52f429d6",
    measurementId: "G-XHJN7NGCDC"
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();


function logout(){
    localStorage.removeItem('id');

    window.location.href = `./index.html`;
}
