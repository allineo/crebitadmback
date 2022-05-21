var http = require("http");
const liveonAccount = require('./liveonaccount');

http.createServer(function (request, response) {
    const head = {
        'Content-Type': 'text/plain',
      //  'charset': 'utf-8'
    };
    response.writeHead(200, head);

    let alias = liveonAccount.getAlias('65904249187');

    response.end('Olá Mundo\n' + alias);
}).listen(8000, '127.0.0.1');

console.log('Servidor executando em http://127.0.0.1:8000/');
