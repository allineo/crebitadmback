var http = require("http");
const liveonIndividuo = require('./liveonindividuo');
const liveonAdministator = require('./liveonadministator');
const liveonAccount = require('./liveonaccount');


const server = http.createServer();
server.on('request', async (request, response) => {

  //try {
  console.log(request.url);
  if (request.method === "GET") {

    response.setHeader("Content-Type", "application/json");
    response.setHeader('Access-Control-Allow-Origin', 'https://frontend-crebit.apps.binnovation.co');
    //response.setEncoding('utf8'); 'charset': 'utf-8'
    response.writeHead(200);

    let respjson = '';

    let body = JSON.stringify({
      "cpf": "65904249187",
      "client": "RR4X"
    });

    switch (request.url) {
      case "/favicon.ico":
        response.end('');
        break;

      case "/getindividuo":
        respjson = await liveonIndividuo.getIndividuo(cpf);
        response.end(JSON.stringify(respjson));
        break;

      case "/createindividuo":
        respjson = await liveonIndividuo.createFullIndividuo(client, cpf);
        response.end(JSON.stringify(respjson));
        break;

      case "/docsinfo":
        let docs = {
          "rg": "1299798",
          "uf": "RJ",
          "emissao": "2010-10-10",
          "mae": "Cleusa Maria de Oliveira",
          "nascimento": "1974-12-23",
          "gender": "F"
        };
        respjson = await liveonIndividuo.sendDocInfo(client, cpf, docs);
        response.end(JSON.stringify(respjson));
        break;

      case "/approveindividuo":
        //request.on('end', async () => {
        respjson = await liveonAdministator.approveIndividuo(
          JSON.parse(body)['client'], JSON.parse(body)['cpf']);
        response.end(JSON.stringify(respjson));
        //});
        break;

      case "/alias":
        request.on('end', async () => {
          let cpf = JSON.parse(body)['cpf'];
          if (cpf !== '') {
            respjson = await liveonAccount.getAlias(cpf);
          }
          response.end(JSON.stringify(respjson));
        });
        break;

      default:
        response.end("Hello Crebit Admin POST");
    }
  }
  /*catch(err => {
    res.writeHead(500);
    res.end(err);
    });
  */
});


server.listen(8000);
console.log('Servidor executando no Host, porta 8000');

//const data = liveonAccount.getAlias('65904249187');