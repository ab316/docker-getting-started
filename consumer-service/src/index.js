const Rabbit = require('./rabbit');
const Db = require('./db');
const RabbitHelper = require('./rabbitHelper');
const ExitHandler = require('./exitHandler')
const Express = require('express');

const rabbit = new Rabbit();
const app = Express();


function onConnected() {
    console.log("Ready");
    rabbit.receiveMessages(onMessageReceived);
}

function onMessageReceived(msg) {
    console.log("Message received [%s]", msg);
}

ExitHandler.setExitHandler(rabbit.disconnect);

app.get('/', (request, result) => {
    result.send('hello world');
});
app.listen(3000, () => console.log('Webserver listening on port 3000'));

var rabbitConnection = RabbitHelper.connectRabbit(rabbit, RabbitHelper.getRabbitHost());
var dbConnection = Db.connect( process.env['POSTGRES_HOST'], process.env['POSTGRES_DB'], process.env['POSTGRES_USER'], process.env['POSTGRES_PASSWORD']);

Promise.all([rabbitConnection, dbConnection]).then(() => {
    onConnected();
});
