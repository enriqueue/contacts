require('dotenv').config();
const { Router } = require('express');

const router = Router();
const admin = require('firebase-admin');

const serviceAccount = require("../../contacts-62873-firebase-adminsdk-pm6ce-a83344a844.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_CNN
});

const db = admin.database();

router.get('/', (req, res) => {
    db.ref('contacts').once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('index', { contacts: data });
    });
});

router.post('/new-contact', (req, res) => {
    console.log(req.body);
    const newContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone
    }
    db.ref('contacts').push(newContact);
    res.redirect('/');
});

router.get('/delete-contact/:id', (req, res) => {
    db.ref('contacts/' + req.params.id ).remove();
    res.redirect('/');
});

module.exports = router;