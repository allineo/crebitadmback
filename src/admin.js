var http = require("http");
const liveonIndividuo = require('./liveonindividuo');
const liveonAccount = require('./liveonaccount');


const server = http.createServer();
server.on('request', async (request, response) => {

  //try {
  console.log(request.url);
  if (request.method === "GET") {
    switch (request.url) {
      case "/favicon.ico":
        response.end('');
        break;
      default:
        response.end("Hello Crebit Admin");
    }

  } else if (request.method === "POST") {
    response.setHeader("Content-Type", "application/json");
    response.setHeader('Access-Control-Allow-Origin', 'https://frontend-crebit.apps.binnovation.co');
    //response.setEncoding('utf8'); 'charset': 'utf-8'
    response.writeHead(200);

    let body = '';
    request.on('data', function (data) {
      body += data;
    });
    let respjson = '';

    let client = JSON.parse(body)['client'];
    let cpf = JSON.parse(body)['cpf'];
    if (client !== '' && cpf != '') {
      switch (request.url) {

        case "/getindividuo":
          request.on('end', async () => {
            respjson = await liveonIndividuo.getIndividuo(cpf);
            response.end(JSON.stringify(respjson));
          });
          break;

        case "/createindividuo":
          request.on('end', async () => {
            respjson = await liveonIndividuo.createFullIndividuo(client, cpf);
            response.end(JSON.stringify(respjson));
          });
          break;

        case "/docsinfo":
          request.on('end', async () => {
            let docs = JSON.parse(body)['docs'];
            if (docs !== '') {
              respjson = await liveonIndividuo.sendDocInfo(client, cpf, docs);
            }
            response.end(JSON.stringify(respjson));
          });
          break;

        case "/alias":
          request.on('end', async () => {
            respjson = await liveonAccount.getAlias(cpf);
            response.end(JSON.stringify(respjson));
          });
          break;

        default:
          response.end("Hello Crebit Admin POST");
      }
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