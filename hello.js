var http = require("http");

http.createServer(function (request, response) {
    const head = {
        'Content-Type': 'text/plain',
      //  'charset': 'utf-8'
    };
    response.writeHead(200, head);
    response.end('Olá Mundo\n');
}).listen(8000, '127.0.0.1');

console.log('Servidor executando em http://127.0.0.1:8000/');
