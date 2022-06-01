var axios = require('axios');
const firebasedb = require('./firebase');


// 3.83.58.159    // /usr/share/nginx/html 
// https://maas-baas.readme.io 
// https://www.getpostman.com/collections/8642d8b8301dd4bbdd2d

let liveonCredentials = {
    "url": "https://lotus-prod-apim.baas.solutions/crebit",
    "subscriptionKey": "16d9f23318a14fe38555008356a59854",
    "Authorization": "MFY2MzlPNVF5b0lpNDNINGh0RFhIQWVUNDMrUzh2OGxNdDY1bGJ4RjVzUT06U1Z0YmZ6QmxZV1Y3dkU0WTRDRU5jaE16OXFYOE11M3Z6enpNWmxUNzNZclI0b0NrM0VsdzltM0h2Nm12RmxYVllHRFVEWW5FeXY2UVBNTUJZSWY0V2c9PQ==",
};


exports.createCNPJ = async function (data) {
    console.log(data);
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
