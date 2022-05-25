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


exports.getIndividuo = async function (cpf) {
    try {
        const url = liveonCredentials['url'] + '/v2/individual/' + cpf;
        const headers = {
            'Content-Type': 'application/json',
            'Subscription-key': liveonCredentials['subscriptionKey'],
            'Authorization': 'Basic ' + liveonCredentials['Authorization'],
        }
        const resp = await axios.get(url, {
            headers: headers
        })
            .then(function (response) {
                //console.log('data = ' + JSON.stringify(response.data));
                return response.data;
            })
            .catch(function (error) {
                console.log('error.response.data: ' + JSON.stringify(error.response.data));
                console.log('error.config: ' + JSON.stringify(error.config));
                //console.log(error);
            });
        return resp;
    } catch (_error) {
        console.log("getIndividuo " + _error);
        return _error;
    }
}



exports.createFullIndividuo = async function (client, cpf) {
    let user = null;
    try {
        let liveonid = await createCPFIndividuo(cpf);
        console.log(liveonid);

        user = await firebasedb.queryByCPF(client, cpf);
        user['liveon']['individual_id'] = liveonid;
        firebasedb.update(user);
        console.log(user);

        await emailIndividual(user);
        await phoneIndividual(user);
        await addressIndividual(user);
        await rendaIndividual(user);
    } catch (_error) {
        console.log(_error);
        return _error;
    }
    return user;
}


async function createCPFIndividuo(cpf) {
    if (cpf != '') {
        try {
            const url = liveonCredentials['url'] + '/v2/register/individual';
            const headers = {
                'Content-Type': 'application/json',
                'Subscription-key': liveonCredentials['subscriptionKey']
            }
            const data = JSON.stringify({
                "document": cpf
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
            return resp["individual_id"];
        } catch (_error) {
            console.log("createIndividual " + _error);
            return JSON.parse(_error);
        }
    }
}

async function emailIndividual(userdata) {
    try {
        const url = liveonCredentials['url'] + '/v2/register/individual/step1';
        const headers = {
            'Content-Type': 'application/json',
            'Subscription-key': liveonCredentials['subscriptionKey']
        }
        const data = JSON.stringify({
            "individual_id": userdata['liveon']['individual_id'],
            "full_name": userdata['nome'],
            "username": userdata['cpf'],
            "email": userdata['email']
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

async function phoneIndividual(userdata) {
    try {
        let phone = userdata['telefone'];
        let phoneNumber = phone.substring(4);
        phoneNumber = (phoneNumber.length < 9) ? '9' + phoneNumber : phoneNumber;

        const url = liveonCredentials['url'] + '/v2/register/individual/step2';
        const headers = {
            'Content-Type': 'application/json',
            'Subscription-key': liveonCredentials['subscriptionKey']
        }
        const data = JSON.stringify({
            "individual_id": userdata['liveon']['individual_id'],
            "phone_prefix": phone.substring(2, 4),
            "phone_number": phoneNumber
        });
        console.log(data);
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
        console.log("phoneIndividual " + _error);
        return _error;
    }
}



async function addressIndividual(userdata) {
    try {
        const url = liveonCredentials['url'] + '/v2/register/individual/step3';
        const headers = {
            'Content-Type': 'application/json',
            'Subscription-key': liveonCredentials['subscriptionKey']
        }
        const data = JSON.stringify({
            "individual_id": userdata['liveon']['individual_id'],
            "postal_code": userdata['endereco']['cep'],
            "address_type_id": "1",
            "street": userdata['endereco']['logradouro'],
            "number": (userdata['endereco']['numero']).replace(/[^\d]+/g, '').substring(0, 4),
            "neighborhood": userdata['endereco']['bairro'],
            "complement": (userdata['endereco']['complemento']).substring(0, 30),
            "state": userdata['endereco']['uf'],
            "city": userdata['endereco']['localidade'],
            "country": "Brasil"
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
        console.log("addressIndividual " + _error);
        return _error;
    }
}


async function rendaIndividual(userdata) {
    try {
        const url = liveonCredentials['url'] + '/v2/register/individual/step4';
        const headers = {
            'Content-Type': 'application/json',
            'Subscription-key': liveonCredentials['subscriptionKey']
        }
        const data = JSON.stringify({
            "individual_id": userdata['liveon']['individual_id'],
            "profession_id": "1",
            "income_value": 100000
        });
        console.log(data);
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
        console.log("rendaIndividual " + _error);
        return _error;
    }
}


exports.sendDocInfo = async function (client, cpf, docs) {
    let user = null;
    try {
        user = await firebasedb.queryByCPF(client, cpf);
        const id = user['liveon']['individual_id'];
        const nome = user['nome'];

        const url = liveonCredentials['url'] + '/v2/register/individual/step5';
        const headers = {
            'Content-Type': 'application/json',
            'Subscription-key': liveonCredentials['subscriptionKey']
        }
        var data = JSON.stringify({
            "individual_id": id,
            "document_number": docs.rg,
            "document_state": docs.uf,
            "issuance_date": docs.emissao,
            "document_name": nome,
            "mother_name": docs.mae,
            "gender": docs.gender,
            "birth_date": docs.nascimento,
            "marital_status": "Solteiro (a)",
            "nationality": "Brasileiro",
            "pep": true,
            "pep_since": "2000-05-05"
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
        console.log("DOcs info " + _error);
        return JSON.parse(_error);
    }
}