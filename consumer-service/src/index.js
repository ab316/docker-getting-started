var Rabbit = require('./rabbit');
const RabbitHelper = require('./rabbitHelper');
const ExitHandler = require('./exitHandler')
const Express = require('express');
const rabbit = new Rabbit();


const app = Express();


function onConnected() {
    rabbit.receiveMessages(onMessageReceived);
}

function onMessageReceived(msg) {
    console.log("Message received [%s]", msg);
}


ExitHandler.setExitHandler(rabbit.disconnect);

app.get('/', (request, result) => {
    result.send('hello world');
});
app.listen(3000, () => console.log('Listening on port 3000'));

RabbitHelper.connectRabbit(rabbit, RabbitHelper.getRabbitHost(), onConnected);


