var axios = require('axios');


// 3.83.58.159  
// Collection Postman: https://www.getpostman.com/collections/fe186c20177c57fb8041
// https://www.getpostman.com/collections/8642d8b8301dd4bbdd2d

let liveonCredentials = {
    "url": "https://lotus-prod-apim.baas.solutions/crebit",
    "subscriptionKey": "16d9f23318a14fe38555008356a59854",
    "Authorization": "MFY2MzlPNVF5b0lpNDNINGh0RFhIQWVUNDMrUzh2OGxNdDY1bGJ4RjVzUT06U1Z0YmZ6QmxZV1Y3dkU0WTRDRU5jaE16OXFYOE11M3Z6enpNWmxUNzNZclI0b0NrM0VsdzltM0h2Nm12RmxYVllHRFVEWW5FeXY2UVBNTUJZSWY0V2c9PQ==",
    "adminpwd": "70c071daac26ae7b"
};


exports.getAlias = async function (cpf) {
    
  try {
      const url = liveonCredentials['url'] + '/auth';
      const headers = {
          'Content-Type': 'application/json',
          'Subscription-key': liveonCredentials['subscriptionKey']
      }
      const access = cpf.substring(3, 9).split("").reverse().join("");
      const data = JSON.stringify({
          "document": cpf,
          "password": access
          //"is_android": true
      });
      const resp = await axios.post(url, data, {
          headers: headers
      })
          .then(function (response) {
              console.log('data = ' + JSON.stringify(response.data));
              return response.data;
          })
          .catch(function (error) {
              console.log('error.response.data: ' + JSON.stringify(error.response.data));
              console.log('error.config: ' + JSON.stringify(error.config));
              //console.log(error);
          });

        return resp;
      //return resp['token'];
  } catch (_error) {
      console.log("getToken " + _error);
  }
}