var http = require("http");
const liveonIndividuo = require('./liveonindividuo');
const liveonAdministator = require('./liveonadministator');
const liveonAccount = require('./liveonaccount');
const liveoncard = require('./liveoncard');
const liveoncnpj = require('./liveoncnpj');


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
      /* "docs": {
         "rg": "1299798",
         "uf": "RJ",
         "emissao": "2010-10-10",
         "mae": "Cleusa Maria de Oliveira",
         "nascimento": "1974-12-23",
         "gender": "F"
       },*/
      "cpf": "65904249187",
      //"id": "6298b86d23583800627ef255",
      //"operatorid": "62a1267a62edaa0057294626",
      //"code": "193476",
     // "client": "Crebit",
     // "card": "4261760537464823",
     //"nome" : 'Alline de Oliveira e Silva',
     //"email" : 'alline.oliveira@gmail.com',
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
        //request.on('end', async () => {
        respjson = await liveonIndividuo.sendDocInfo(
          JSON.parse(body)['client'], JSON.parse(body)['cpf'], JSON.parse(body)['docs']);
        response.end(JSON.stringify(respjson));
        //});
        break;

      case "/approveindividuo":
        //request.on('end', async () => {
        respjson = await liveonAdministator.approveIndividuo(JSON.parse(body)['cpf'], JSON.parse(body)['id']);
        response.end(JSON.stringify(respjson));
        //});
        break;

        case "/acessoindividuo":
        //request.on('end', async () => {
        respjson = await liveonAdministator.acessoindividuo(JSON.parse(body)['cpf'], JSON.parse(body)['id']);
        response.end(JSON.stringify(respjson));
        //});
        break;

      case "/alias":
        //request.on('end', async () => {
        respjson = await liveonAccount.getAlias(JSON.parse(body)['cpf']);
        response.end(JSON.stringify(respjson));
        //});
        break;

      case "/balance":
        //request.on('end', async () => {
        respjson = await liveonAccount.getSaldo(JSON.parse(body)['cpf']);
        response.end(JSON.stringify(respjson));
        //});
        break;

      case "/statements":
        //request.on('end', async () => {
        respjson = await liveonAccount.getExtrato(JSON.parse(body)['cpf']);
        response.end(respjson);
        //});
        break;    

      case "/activatecard":
        //request.on('end', async () => {
        respjson = await liveoncard.activateCard(
          JSON.parse(body)['client'], JSON.parse(body)['cpf'], JSON.parse(body)['card']);
        response.end(JSON.stringify(respjson));
        //});
        break;

      case "/listCards":
        //request.on('end', async () => {
        respjson = await liveoncard.listCards(JSON.parse(body)['cpf']);
        response.end(JSON.stringify(respjson));
        //});
        break;

      case "/unblockCard":
        //request.on('end', async () => {
        respjson = await liveonAdministator.unblockCard();
        response.end(JSON.stringify(respjson));
        //});
        break;

      case "/unblockAccount":
        //request.on('end', async () => {
        respjson = await liveonAdministator.unblockIndividuo();
        response.end(JSON.stringify(respjson));
        //});
        break;

      case "/showaccount":
        //request.on('end', async () => {
        respjson = await liveonAdministator.showAccount();
        response.end(JSON.stringify(respjson));
        //});
        break;

      case "/addcompanyoperator":
        //request.on('end', async () => {
        respjson = await liveoncnpj.createCNPJoperator(JSON.parse(body));
        response.end(JSON.stringify(respjson));
        //});
        break;

      case "/sendcodeperator":
        //request.on('end', async () => {
        respjson = await liveoncnpj.sendCodeOperator(JSON.parse(body));
        response.end(JSON.stringify(respjson));
        //});
        break;

      case "/validatecompanyoperator":
        //request.on('end', async () => {
        respjson = await liveoncnpj.validateCNPJoperator(JSON.parse(body));
        response.end(JSON.stringify(respjson));
        //});
        break;

      case "/listcompanies":
        //request.on('end', async () => {
        respjson = await liveonAdministator.listCNPJ();
        response.end(JSON.stringify(respjson));
        //});
        break;

      case "/getcompany":
        //request.on('end', async () => {
        respjson = await liveonAdministator.getCNPJ(JSON.parse(body)['id']);
        response.end(JSON.stringify(respjson));
        //});
        break;

      case "/approvecompany":
        //request.on('end', async () => {
        respjson = await liveonAdministator.approveCNPJ(JSON.parse(body)['id']);
        response.end(JSON.stringify(respjson));
        //});
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