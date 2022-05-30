var http = require("http");
const liveonIndividuo = require('./liveonindividuo');
const liveonAccount = require('./liveonaccount');
const liveonAdministator = require('./liveonadministator');

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

    switch (request.url) {

      case "/getindividuo":
        request.on('end', async () => {
          respjson = await liveonIndividuo.getIndividuo(JSON.parse(body)['cpf']);
          response.end(JSON.stringify(respjson));
        });
        break;

      case "/createindividuo":
        request.on('end', async () => {
          respjson = await liveonIndividuo.createFullIndividuo(
            JSON.parse(body)['client'], JSON.parse(body)['cpf']);
          response.end(JSON.stringify(respjson));
        });
        break;

      case "/docsinfo":
        request.on('end', async () => {
          respjson = await liveonIndividuo.sendDocInfo(JSON.parse(body)['docs']);
          response.end(JSON.stringify(respjson));
        });
        break;

      case "/approveindividuo":
        request.on('end', async () => {
          respjson = await liveonAdministator.approveIndividuo(
            JSON.parse(body)['cpf'], JSON.parse(body)['id']);
          response.end(JSON.stringify(respjson));
        });
        break;

      case "/alias":
        request.on('end', async () => {
          respjson = await liveonAccount.getAlias(JSON.parse(body)['cpf']);
          response.end(JSON.stringify(respjson));
        });
        break;

      case "/activatecard":
        request.on('end', async () => {
          respjson = await liveonAccount.activateCard(
            JSON.parse(body)['cpf'], JSON.parse(body)['card']);
          response.end(JSON.stringify(respjson));
        });
        break;

        case "/listcards":
          request.on('end', async () => {
            respjson = await liveonAccount.listCards(JSON.parse(body)['cpf']);
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