//os parenteses depois do require serve para instanciar a classe que o required esta retornando
const express = require('express')();
//modulo http para criar meu servidor apartir da classe Server
const http = require('http').Server(express);
const serverSocket = require('socket.io')(http);

const porta = 8000;

http.listen(porta, () => console.log('Servidor iniciado em http://localhost:'+porta));

//o metodo get sera acionado assim que o ussuario acessar a raiz('/') do site
//o  __dirname pega o endereço da pasta atual
express.get('/', (request, response) => response.sendFile(__dirname + '/index.html'));

serverSocket.on('connection', socket => {

    console.log('Cliente: ' + socket.id);

    socket.on('chat msg', msg => {
        console.log('Mensagem recebida: '+msg);
        serverSocket.emit('chat msg',msg);
    });



});