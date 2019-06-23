
const config = require('./config');
const Server = require('./server');
const {formatDate} = require('../lib/timeutil');


const server = new Server(config);

server
  .start()
  .then(port => {
    console.info(`[${formatDate()}] Server is running on port ${port}.`);
    // if (config.SERVER.ENVIRONMENT === 'development') {
    //   require('opn')(`http://localhost:${config.SERVER.PORT_HTTP}`);
    // }
  })
  .catch(error => console.error(`[${formatDate()}] ${error.stack}`));

process.on('uncaughtException', error =>
  console.error(`[${formatDate()}] Uncaught exception: ${error.message}`, error),
);
process.on('unhandledRejection', error =>
  console.error(`[${formatDate()}] Uncaught rejection "${error.constructor.name}"`, error),
);
