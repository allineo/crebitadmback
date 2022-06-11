var axios = require('axios');

// 3.83.58.159    // /usr/share/nginx/html 
// https://maas-baas.readme.io 
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


exports.approveIndividuo = async function (cpf, id) {
    try {
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


exports.acessoindividuo = async function (cpf, id) {
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

exports.unblockIndividuo = async function () {
    try {
        let accountid = '61463bc7214f6200506391a2';
        const admintoken = await getAdminToken();
        const url = liveonCredentials['url'] + '/portal/account/' + accountid + '/block';
        const headers = {
            'Content-Type': 'application/json',
            'Subscription-key': liveonCredentials['subscriptionKey'],
            'Authorization': 'Bearer ' + admintoken
        }
        const data = JSON.stringify({
            "blocked": false,
            "password": "a2ea3898678a4bf5",
        });

        const resp = await axios.put(url, data, {
            headers: headers
        })
            .then(function (response) {
                //console.log(response);
                return response.data;
            })
            .catch(function (error) {
                console.log('error.response.data: ' + JSON.stringify(error.response.data));
                console.log('error.config: ' + JSON.stringify(error.config));
                //console.log(error);
            });
        return resp;
    } catch (_error) {
        console.log("unblockIndividuo " + _error);
    }
}


exports.showAccount = async function () {
    try {
        let accountid = '6291477323583800627ee7b9';
        const admintoken = await getAdminToken();
        const url = liveonCredentials['url'] + '/portal/account/' + accountid;
        const headers = {
            'Content-Type': 'application/json',
            'Subscription-key': liveonCredentials['subscriptionKey'],
            'Authorization': 'Bearer ' + admintoken
        }
        const resp = await axios.get(url, {
            headers: headers
        })
            .then(function (response) {
                //console.log(response);
                return response.data;
            })
            .catch(function (error) {
                console.log('error.response.data: ' + JSON.stringify(error.response.data));
                console.log('error.config: ' + JSON.stringify(error.config));
                //console.log(error);
            });
        return resp;
    } catch (_error) {
        console.log("showaccount " + _error);
    }
}

/*{"success":true,"id":"61463bc7214f6200506391a2","account_number":"46663",
"email":"alline.oliveira@gmail.com","individual_id":"614220bf011fb90050503717","company_id":"",
"full_name":"Alline de Oliveira e Silva","document":"65904249187","account_type":"pf",
"status":"approved","status_description":"","canceled_date":"","blocked":false,
"username":"65904249187","balance":"19.8","balance_cents":1980,
"last_access":"2022-05-27T21:54:42.315Z",
"avatar_url":"https://crebit-prod-lotus-api.baas.solutions/files/defaultAvatar.png",
"alias_account":{"account_digit":"","account_number":"6226758175","account_status":"ACTIVE",
"account_type":"CC","bank_number":"655","branch_digit":"","branch_number":"1111",
"created_date":"2021-09-23T12:00:07.279Z"},"external_blocked":false,
"created_at":"2021-09-18T19:19:35.020Z","updated_at":"2022-05-27T21:54:42.315Z"} */



exports.unblockCard = async function () {
    try {
        const cardid = '40738';
        const admintoken = await getAdminToken();
        const url = liveonCredentials['url'] + '/portal/card/' + cardid + '/block';
        const headers = {
            'Content-Type': 'application/json',
            'Subscription-key': liveonCredentials['subscriptionKey'],
            'Authorization': 'Bearer ' + admintoken
        }
        const data = JSON.stringify({
            "password": "a2ea3898678a4bf5",
        });

        const resp = await axios.post(url, data, {
            headers: headers
        })
            .then(function (response) {
                //console.log(response);
                return response.data;
            })
            .catch(function (error) {
                console.log('error.response.data: ' + JSON.stringify(error.response.data));
                console.log('error.config: ' + JSON.stringify(error.config));
                //console.log(error);
            });
        return resp;
    } catch (_error) {
        console.log("unblockCard " + _error);
    }
}


exports.listCNPJ = async function () {
    try {
        const admintoken = await getAdminToken();
        const url = liveonCredentials['url'] + '/portal/companies';
        const headers = {
            'Content-Type': 'application/json',
            'Subscription-key': liveonCredentials['subscriptionKey'],
            'Authorization': 'Bearer ' + admintoken
        }
        const resp = await axios.get(url, {
            headers: headers
        })
            .then(function (response) {
                //console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log('error.response.data: ' + JSON.stringify(error.response.data));
                console.log('error.config: ' + JSON.stringify(error.config));
                //console.log(error);
            });
        return resp;
    } catch (_error) {
        console.log("listCNPJ " + _error);
        return JSON.parse(_error);
    }
}

exports.getCNPJ = async function (id) {
    try {
        const admintoken = await getAdminToken();
        const url = liveonCredentials['url'] + '/portal/company/' + id;
        const headers = {
            'Content-Type': 'application/json',
            'Subscription-key': liveonCredentials['subscriptionKey'],
            'Authorization': 'Bearer ' + admintoken
        }
        const resp = await axios.get(url, {
            headers: headers
        })
            .then(function (response) {
                //console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log('error.response.data: ' + JSON.stringify(error.response.data));
                console.log('error.config: ' + JSON.stringify(error.config));
                //console.log(error);
            });
        return resp;
    } catch (_error) {
        console.log("getCNPJ " + _error);
        return JSON.parse(_error);
    }
}


exports.approveCNPJ = async function (id) {
    try {
        const admintoken = await getAdminToken();
        //console.log(admintoken);
        const url = liveonCredentials['url'] + '/company/account';
        
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Subscription-key': liveonCredentials['subscriptionKey'],
            'Authorization': 'Bearer ' + admintoken
        }
        const data = JSON.stringify({
            "company_id": id,
            "password": "a2ea3898678a4bf5",
            "status": "approved"
        });
        const resp = await axios.post(url, data, {
            headers: headers
        })
            .then(function (response) {
                console.log(response);
                return response.data;
            })
            .catch(function (error) {
                console.log('error.response.data: ' + JSON.stringify(error.response.data));
                console.log('error.config: ' + JSON.stringify(error.config));
                //console.log(error);
            });
        return resp;
    } catch (_error) {
        console.log("approveCNPJ " + _error);
    }
}