var axios = require('axios');
const firebasedb = require('./firebase');


// 3.83.58.159  
// Collection Postman: https://www.getpostman.com/collections/fe186c20177c57fb8041
// https://www.getpostman.com/collections/8642d8b8301dd4bbdd2d

let liveonCredentials = {
    "url": "https://lotus-prod-apim.baas.solutions/crebit",
    "subscriptionKey": "16d9f23318a14fe38555008356a59854",
    "Authorization": "MFY2MzlPNVF5b0lpNDNINGh0RFhIQWVUNDMrUzh2OGxNdDY1bGJ4RjVzUT06U1Z0YmZ6QmxZV1Y3dkU0WTRDRU5jaE16OXFYOE11M3Z6enpNWmxUNzNZclI0b0NrM0VsdzltM0h2Nm12RmxYVllHRFVEWW5FeXY2UVBNTUJZSWY0V2c9PQ==",
};

async function getAdminToken() {
    try {
        const url = liveonCredentials['url'] + '/admin/auth';
        const headers = {
            'Content-Type': 'application/json',
            'Subscription-key': liveonCredentials['subscriptionKey'],
            'Authorization': 'Basic ' + liveonCredentials['Authorization']
        }
        const data = JSON.stringify({
            "email": "alline.oliveira@gmail.com",
            "password": "a2ea3898678a4bf5"
        });
        const resp = await axios.post(url, data, {
            headers: headers
        })
            .then(function (response) {
                //console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log('error.response.data admintoken: ' + JSON.stringify(error.response.data));
                console.log('error.config: ' + JSON.stringify(error.config));
                //console.log(error);
            });

        return resp['token'];
    } catch (_error) {
        console.log("getToken " + _error);
    }
}


exports.approveIndividuo = async function (client, cpf) {
    let user = null;
    try {
        user = await firebasedb.queryByCPF(client, cpf);
        const id = user['liveon']['individual_id'];

        const admintoken = await getAdminToken();
        //console.log(admintoken);
        const url = liveonCredentials['url'] + '/portal/individual/account';
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Subscription-key': liveonCredentials['subscriptionKey'],
            'Authorization': 'Bearer ' + admintoken
        }
        const data = JSON.stringify({
            "individual_id": id,
            "password": "a2ea3898678a4bf5",
            "status": "approved"
        });

        const resp = await axios.put(url, data, {
            headers: headers
        })
            .then(function (response) {
                //console.log(response);
                console.log(response.data);
                acessoindividuo(cpf, id);
                return response.data;
            })
            .catch(function (error) {
                console.log('error.response.data: ' + JSON.stringify(error.response.data));
                console.log('error.config: ' + JSON.stringify(error.config));
                //console.log(error);
            });
        return resp; 
    } catch (_error) {
        console.log("approveIndividuo " + _error);
    }
}


async function acessoindividuo(cpf, id) {
    try {
        const url = liveonCredentials['url'] + '/v2/register/individual/step9';
        const headers = {
            'Content-Type': 'application/json',
            'Subscription-key': liveonCredentials['subscriptionKey']
        }
        const access = cpf.substring(3, 9).split("").reverse().join("");
        const data = JSON.stringify({
            "individual_id": id,
            "password": access,
            "confirm_password": access
        });
        const resp = await axios.post(url, data, {
            headers: headers
        })
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log('error.response.data: ' + JSON.stringify(error.response.data));
                console.log('error.config: ' + JSON.stringify(error.config));
                //console.log(error);
            });
    } catch (_error) {
        console.log("emailIndividual " + _error);
        return _error;
    }
}