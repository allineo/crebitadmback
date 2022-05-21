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
}).listen(8000, '3.83.58.159');

console.log('Servidor executando em http://3.83.58.159:8000/');
