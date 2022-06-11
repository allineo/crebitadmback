var axios = require('axios');
const firebasedb = require('./firebase');


// 3.83.58.159    // /usr/share/nginx/html 
// https://maas-baas.readme.io 
// https://www.getpostman.com/collections/8642d8b8301dd4bbdd2d

let liveonCredentials = {
    "url": "https://lotus-prod-apim.baas.solutions/crebit",
    "subscriptionKey": "16d9f23318a14fe38555008356a59854",
};


exports.createCNPJ = async function (data) {
    try {
        const url = liveonCredentials['url'] + '/company/register';
        const headers = {
            'Content-Type': 'application/json',
            'Subscription-key': liveonCredentials['subscriptionKey']
        }
        const resp = await axios.post(url, data, {
            headers: headers
        })
            .then(function (response) {
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log('error.response.data: ' + JSON.stringify(error.response.data));
                console.log('error.config: ' + JSON.stringify(error.config));
                //console.log(error);
            });
        return resp;
    } catch (_error) {
        console.log("createCNPJ " + _error);
        return JSON.parse(_error);
    }
}
/*{
    "companyType": "Sociedade Empresária Limitada (LTDA)",
    "companySubject": "8211-3/00 Serviços combinados de escritório e apoio administrativo",
    "companyNature": "206-2 Sociedade Empresária Limitada",
    "companyName": "Another Company",
    "companyEmail": "test@email.com",
    "documentNumber": "84832466000143",
    "exemptStateRegistration": true,
    "openingDate": "1985-06-20T00:00:00.000Z",
    "monthlyInvoicing": 10000000,
    "zip": "12345678",
    "street": "Another Example Street",
    "number": "2",
    "neighborhood": "Test",
    "city": "São Paulo",
    "state": "SP",
    "country": "Brasil",
    "countryCode": 55,
    "area": 01,
    "phone": 123456789,
    "promotional_code": "ABCDE12345"
  }*/

  

exports.createCNPJoperator = async function (dados) {
    try {
        const url = liveonCredentials['url'] + '/company/' + dados['id'] + '/operator';
        const headers = {
            'Content-Type': 'application/json',
            'Subscription-key': liveonCredentials['subscriptionKey']
        }
        const data = JSON.stringify({
            "document": dados['cpf'],
            "name": dados['nome'],
            "email": dados['email'],
        });
        const resp = await axios.post(url, data, {
            headers: headers
        })
            .then(function (response) {
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log('error.response.data: ' + JSON.stringify(error.response.data));
                console.log('error.config: ' + JSON.stringify(error.config));
                //console.log(error);
            });
        return resp;
    } catch (_error) {
        console.log("createCNPJoperator " + _error);
        return JSON.parse(_error);
    }
}
// operator id = '62a1267a62edaa0057294626',



exports.sendCodeOperator = async function (dados) {
    try {
        const url = liveonCredentials['url'] + '/company/' + dados['id'] + '/operator/' + dados['operatorid'] + '/send_code';
        const headers = {
            'Content-Type': 'application/json',
            'Subscription-key': liveonCredentials['subscriptionKey']
        }
        const resp = await axios.post(url, {}, {
            headers: headers
        })
            .then(function (response) {
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log('error.response.data: ' + JSON.stringify(error.response.data));
                console.log('error.config: ' + JSON.stringify(error.config));
                //console.log(error);
            });
        return resp;
    } catch (_error) {
        console.log("validateCNPJoperator " + _error);
        return JSON.parse(_error);
    }
}


exports.validateCNPJoperator = async function (dados) {
    try {
        const url = liveonCredentials['url'] + '/company/' + dados['id'] + '/operator/' + dados['operatorid'] + '/validate_code';
        const headers = {
            'Content-Type': 'application/json',
            'Subscription-key': liveonCredentials['subscriptionKey']
        }
        const data = JSON.stringify({
            "code": dados['code']
        });
        const resp = await axios.post(url, data, {
            headers: headers
        })
            .then(function (response) {
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log('error.response.data: ' + JSON.stringify(error.response.data));
                console.log('error.config: ' + JSON.stringify(error.config));
                //console.log(error);
            });
        return resp;
    } catch (_error) {
        console.log("validateCNPJoperator " + _error);
        return JSON.parse(_error);
    }
}