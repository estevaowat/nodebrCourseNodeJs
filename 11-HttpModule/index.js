const http = require('http');

http.createServer((request, response) => {
    response.end('HELLO NODE!!');
}).listen(5000, ()=> {
    console.log('Server is running!!')
})