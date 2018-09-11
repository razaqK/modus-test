const config = require('app/config/config');

const sendResponse = require('app/components/send_response');


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const route = require('app/routes/index');
const cors = require('cors');

app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

route(app);

app.use('/', function(req, res) {
    return sendResponse.send(req, res, {message: 'modus... saying hi!'}, 404)
});

app.listen(config.server.port, () => {
    console.log(`Listening on port ${config.server.port}`)
});

module.exports = app;