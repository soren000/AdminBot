const firebase = require('firebase');
const firebaseConfig = require('../private/firebaseConfig');

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

module.exports = { firebase, database };