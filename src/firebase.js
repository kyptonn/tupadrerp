import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import React from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyDu7EVTyz_AUOUJ6w8CWsXFkB6GzNCpgss",
    authDomain: "tupadrerp-df287.firebaseapp.com",
    databaseURL: 'https://tupadrerp-df287-default-rtdb.europe-west1.firebasedatabase.app/',
    projectId: "tupadrerp-df287",
    storageBucket: "tupadrerp-df287.appspot.com",
    messagingSenderId: "195918912886",
    appId: "1:195918912886:web:d376c21951ee8928cc2e57"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const db = firebase.firestore();



export const createUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email } = user;
    const { displayName } = additionalData;

    try {
      await userRef.set({
        displayName,
        email,
        createdAt: new Date(),
        verificado: null,
        avatar: null,
        usuario: user.uid,
        donador: "no",
        terminosConfirmados:"no",
        nombrePersonaje: null,
        coins:0,

        
      });
    } catch (error) {
      console.log('Error in creating user', error);
    }
  }
};

export default firebase;

