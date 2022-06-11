var axios = require('axios');


// 3.83.58.159    // /usr/share/nginx/html 
// https://maas-baas.readme.io
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
      console.log("getAlias " + _error);
  }
}



exports.getSaldo = async function (cpf) {
    console.log(cpf)
    const token = await this.getAlias(cpf);
    console.log(token)
    try {
        const url = liveonCredentials['url'] + '/account/balance';
        const headers = {
            'Content-Type': 'application/json',
            'Subscription-key': liveonCredentials['subscriptionKey'],
            'Authorization': 'Bearer ' + token['token']
        }
        const resp = await axios.get(url, {
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

        return resp['balance_cents'];
    } catch (_error) {
        console.log("getSaldo " + _error);
    }
}

/*  {  "balance": "0",
#  "balance_cents": 0,
#  "success": true} */


exports.getExtrato = async function (cpf) {
    try {
        const token = await this.getAlias(cpf);
        const startdate = (new Date(Date.now() - (86400000 * 7))).toISOString().split('T')[0]; // that is: 24 * 60 * 60 * 1000
        const enddate = new Date().toISOString().split('T')[0];
        const url = liveonCredentials['url'] + '/v2/statements' +
            '?startDate=' + startdate + '&endDate=' + enddate;
        const headers = {
            'Content-Type': 'application/json',
            'Subscription-key': liveonCredentials['subscriptionKey'],
            'Authorization': 'Bearer ' + token['token']
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

        return formatStataments(resp);
    } catch (_error) {
        console.log("getExtrato " + _error);
    }
}

function formatStataments(statements) {
    statementsString = '';
    if (statements['totalDocs'] > 0) {
        for (let statement of statements['statements']) {
            //statementsString += '\n' + utilities.formatDate(statement['day_transaction']) + '\n';
            statementsString += '<br>' + statement['date_transaction'] + '  ------------------------<br>'; 
            statementsString += statement['hour_transaction'] + ' -  R$ *' + convertCents(statement['amount']) + '* <br>   ';
            statementsString += statement['description'] + '<br>';
        }
    } else {
        statementsString = 'Nenhuma movimentação no momento';
    }
    return statementsString;
}
// { success: true, totalDocs: 0, statements: [] }

function convertCents(centsvalue) {
    if (centsvalue != null) {
        cents = centsvalue + '';
        if (cents == '0') {
            cents = '000';
        }
        return cents.slice(0, -2) + ',' + (cents.slice(-2) + '');
    }
}