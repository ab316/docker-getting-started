module.exports.connectRabbit = (rabbit, connectionString, connectedCallback) => {
    console.log('Connecting to [%s]', connectionString);
    rabbit.connect(connectionString).then(() => {
        console.log('Connected');
        connectedCallback();
    }).catch(err => {
        console.log(err);
        setTimeout(module.exports.connectRabbit, 3000, rabbit, connectionString, connectedCallback);
    });
}

module.exports.getRabbitHost = () => {
    let connectionString = '';
    const cmdArg = process.env['RABBIT_HOST'];
    if (null != cmdArg) {
        connectionString = cmdArg;
    } else {
        connectionString = 'amqp://localhost';
    }
    return connectionString;
}
