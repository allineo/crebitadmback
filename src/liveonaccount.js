var axios = require('axios');


// 3.83.58.159  
// Collection Postman: https://www.getpostman.com/collections/fe186c20177c57fb8041
// https://www.getpostman.com/collections/8642d8b8301dd4bbdd2d

let liveonCredentials = {
    "url": "https://lotus-prod-apim.baas.solutions/crebit",
    "subscriptionKey": "16d9f23318a14fe38555008356a59854",
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
      });
      const resp = await axios.post(url, data, {
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
              return JSON.stringify(error.response.data)
          });

        return resp;
      //return resp['token'];
  } catch (_error) {
      console.log("getToken " + _error);
  }
}


exports.activateCard = async function (client, cpf, card) {
    try {
        const alias = await this.getAlias(cpf);
        const url = liveonCredentials['url'] + '/card/physical/active';
        const headers = {
            'Content-Type': 'application/json',
            'Subscription-key': liveonCredentials['subscriptionKey'],
            'Authorization': 'Bearer ' + alias['token']
        }
        const accesscard = cpf.substring(3, 7).split("").reverse().join("");
        const data = JSON.stringify({
            "card_number": card,
            "password": accesscard,
            "confirm_password": accesscard
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
                return JSON.stringify(error.response.data);
            });

        return resp;
    } catch (_error) {
        console.log("activateCard " + _error);
    }
}
//{ success: true, message: 'Cartão desbloqueado com sucesso' }