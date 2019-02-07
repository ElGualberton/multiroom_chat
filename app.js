/* importar configurações do servidor */
var app = require('./config/server');
/* parametrizar porta de escuta */
var server = app.listen(70, function(){
    console.log('Servidor on-line');
})

var io = require('socket.io').listen(server);

app.set('io' , io);

/* criar conexão por websocket */
io.on('connection',function(socket){
    console.log('Usuário Conectou');

    socket.on('disconnect', function(){
        console.log('Usuário Desconectou');
    });

    socket.on('msgParaServidor', function(data){
        /* dialogo */
        socket.emit('msgParaCliente', {apelido: data.apelido, mensagem: data.mensagem});
        socket.broadcast.emit('msgParaCliente', {apelido: data.apelido, mensagem: data.mensagem});
        /* participantes */
        if(parseInt(data.apelido_atualizado) == 0){
            socket.emit('participantesParaCliente', {apelido: data.apelido});
            socket.broadcast.emit('participantesParaCliente', {apelido: data.apelido});
        }
    });
});