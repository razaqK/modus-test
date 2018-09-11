const vehicle = require('app/routes/src/vehicle');

module.exports = (app) => {
    app.use('/vehicles', vehicle);
}