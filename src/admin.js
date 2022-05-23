var http = require("http");
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
    response.setHeader('Access-Control-Allow-Origin', '*');
    //response.setEncoding('utf8'); 'charset': 'utf-8'
    response.writeHead(200);
    switch (request.url) {

      case "/alias":
        let body = '';
        request.on('data', function (data) {
          body += data;
        });
        request.on('end', async () => {
          let cpf = JSON.parse(body)['cpf'];
          let alias = '';
          if (cpf !== '') {
            alias = await liveonAccount.getAlias(cpf);
          }
          response.end(JSON.stringify(alias));
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