var Rabbit = require('./rabbit');
const rabbit = new Rabbit();

function sendRandomMsg() {
    const words = ['hello', 'world', 'how', 'are', 'you'];
    const randomWord = words[Math.round(Math.random() * (words.length - 1))];
    const msg = {
        word: randomWord,
        timestamp: new Date().getTime().toString()
    }
    const msgString = JSON.stringify(msg);
    console.log('Sending message: [%s]', msgString);
    rabbit.sendMessage(msgString);
}

function connect() {
    rabbit.connect('amqp://rabbit').then(() => {
        console.log('Connected');
        setInterval(sendRandomMsg, 3000);
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


process.on('exit', exitHandler.bind(null,{cleanup:true}));
process.on('SIGINT', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));