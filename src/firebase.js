const firebaseadmin = require('firebase-admin');

// https://firebase.google.com/docs/firestore/quickstart#node.js

let db = null;

function initDB(client) {
    if (db == null) {
        let firebaseServiceAccount = require('./config/crebitbot-firebase-adminsdk-4qjk4-36da259bb2.json');
        if (client == 'PaxPay') {
            firebaseServiceAccount = require('./config/paxpay-38072-firebase-adminsdk-wru9t-a213b9e9af.json');
        } else if (client == 'RR4X') {
            firebaseServiceAccount = require('./config/rr4x-b8540-firebase-adminsdk-uk4w4-baf1388b20.json');
        } else if (client == '72Bank') {
            firebaseServiceAccount = require('./config/bank-ff5c7-firebase-adminsdk-7k3d2-588cda62c5.json');
        }

        firebaseadmin.initializeApp({
            credential: firebaseadmin.credential.cert(firebaseServiceAccount)
        });
        db = firebaseadmin.firestore();
    }
}



exports.queryByPhone = async function (client, phone) {
    initDB(client);
    if (phone != '') {
        const phone2 = phone.substring(2);
        let userdata = null;
        try {
            const queryRef = await db.collection('users')
                .where('telefone', 'in', [phone, phone2])
                .get();
            if (!queryRef.empty) {
                queryRef.forEach((user) => {
                    userdata = user.data();
                    userdata['id'] = user.id;
                });
            }
        } catch (_error) {
            console.log(_error);
        }
        return userdata;
    }
}

exports.queryByCPF = async function (client, cpf) {
    initDB(client);
    if (cpf != '') {
        let data = null;
        try {
            const queryRef = await db.collection('users')
                .where('cpf', '=', cpf)
                .get();
            if (!queryRef.empty) {
                queryRef.forEach((user) => {
                    data = user.data();
                    id = data.id;
                });
            }
        } catch (_error) {
            console.log(_error);
        }
        return data;
    }
}


exports.save = async function (user) {
    try {
        user['cadastradoEm'] = firebaseadmin.firestore.Timestamp.fromDate(new Date());
        const newUser = await db.collection('users').add(user);
        user['id'] = newUser.id;
        return user;
    } catch (_error) {
        console.log("Erro: " + _error);
    }
}


exports.update = async function (userdata) {
    try {
        const userRegister = await db.collection('users').doc(userdata['id']).set(userdata);
        return userRegister;
    } catch (_error) {
        console.log("Erro Firebase Update: " + _error);
    }
}