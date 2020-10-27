const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const service = 'develop';
const port = 8080;
let apiURL = 'http://localhost:8080/api/';
if (service.indexOf('default') !== -1) {
    apiURL = 'https://ikoinoie26.com';
} else {
    apiURL = 'https://develop.ikoinoie26.com';
}
app.use(logger('dev'));
app.use('/api', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Content-Type', 'application/json; charset=UTF-8');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
function REST() {
    REST.prototype.configureExpress();
}
REST.prototype.configureExpress = function () {
    const self = this;
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    }));
    app.use(bodyParser.json());
    const router = express.Router();
    app.use('/api', router);
    self.startServer();
};
app.get('*', (req, res, next) => {
    res.header('Cache-Control', ['private', 'no-store', 'no-cache', 'must-revalidate', 'proxy-revalidate'].join(','));
    res.header('Expires', 'Thu, 15 Dec 1994 05:00:00 GMT');
    if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] !== 'https') {
        res.redirect(apiURL + req.url);
    }
    else {
        next();
    }
});
REST.prototype.startServer = () => {
    const http = require('http');
    let connectDB;
    if (isDev) {
        connectDB = require('http');
    }
    else {
        connectDB = require('https');
    }
    const server = http.createServer(app);
    server.listen(port, () => {
        console.log(new Date() + 'All right ! I am alive at port ' + port);
    }).on('error', (err) => {
        console.log('on error handler');
        console.log(err);
    });
};
process.on('uncaughtException', (err) => {
    console.log('process.on handler');
    console.log(err);
    fs.writeSync(1, `Caught exception: ${err}\n`);
});
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, 'reason:', reason);
});
REST.prototype.stop = (err) => {
    console.log('ISSUE WITH MYSQL n' + err);
    process.exit(1);
};
REST();
module.exports = app;
//# sourceMappingURL=app.js.map