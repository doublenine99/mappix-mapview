/*
 * @Author: your name
 * @Date: 2020-04-11 23:22:13
 * @LastEditTime: 2020-04-12 16:04:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mapviewReact\firebase.js
 */
import { initializeApp, firestore } from 'firebase'
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCAEjGbgSdwDu_tReT3nvSCNWjRtAC_AiI",
    authDomain: "mappix-71637.firebaseapp.com",
    databaseURL: "https://mappix-71637.firebaseio.com",
    projectId: "mappix-71637",
    storageBucket: "mappix-71637.appspot.com",
    messagingSenderId: "355030487767",
    appId: "1:355030487767:web:c5b5e17eec7d0322875692",
    measurementId: "G-GY9Q62YCBG"
  };
initializeApp(firebaseConfig)

const db = firestore();

// // export const koiSushiMenu = db.collection("koisushiMenu");
// // export const koiSushiRestaurant = db.collection("restaurants").doc("koisushi");
export const user_db = db.collection("users");
export const storage = firebase.storage();




