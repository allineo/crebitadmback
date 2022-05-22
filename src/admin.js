var http = require("http");
const liveonAccount = require('./liveonaccount');


const server = http.createServer();
server.on('request', async (request, response) => {

  //try {
  response.setHeader("Content-Type", "application/json"); 
  response.setHeader('Access-Control-Allow-Origin', '*');
  //  'charset': 'utf-8'
  response.writeHead(200);

  console.log(request.url);
  switch (request.url) {
    case "/favicon.ico":
      response.end('');
      break;

    case "/alias":
      const data = await liveonAccount.getAlias('65904249187');
      console.log('alias = ' + data);
      response.end(JSON.stringify(data));
      break;

    default:
      response.end("Hello Crebit Admin");
  }
  /*catch(err => {
    res.writeHead(500);
    res.end(err);
    });
  */
});


server.listen(8000);
console.log('Servidor executando no Host, porta 8000');