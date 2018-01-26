var Rabbit = require('./rabbit');
const rabbit = new Rabbit();

function onMessageReceived(msg) {
    console.log("Message received [%s]", msg);
}

function connect() {
    rabbit.connect('amqp://rabbit').then(() => {
        console.log('Connected');
        rabbit.receiveMessages(onMessageReceived);
    }).catch(err => {
        console.log(err);
        setTimeout(connect, 3000);
    });
}

connect();

function exitHandler(options, err) {
    if (options.cleanup) rabbit.disconnect();
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
}


process.on('exit', exitHandler.bind(null, {
    cleanup: true
}));
process.on('SIGINT', exitHandler.bind(null, {
    exit: true
}));
process.on('SIGUSR1', exitHandler.bind(null, {
    exit: true
}));
process.on('SIGUSR2', exitHandler.bind(null, {
    exit: true
}));
process.on('uncaughtException', exitHandler.bind(null, {
    exit: true
}));