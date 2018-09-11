const handler = require('app/handlers/index');
const sendResponse = require('app/components/send_response');

module.exports = {
    safeRating: (req, res) => {
        handler.vehicle.getSafeRating(req.params.year, req.params.manufacturer, req.params.model, req.query.withRating).then(response => {
            return sendResponse.send(req, res, response, 200);
        }).catch(error => {
            return sendResponse.send(req, res, error, 200);
        })
    },
    requestSafeRating: (req, res) => {
        handler.vehicle.getSafeRating(req.body.modelYear, req.body.manufacturer, req.body.model, req.query.withRating).then(response => {
            return sendResponse.send(req, res, response, 200);
        }).catch(error => {
            return sendResponse.send(req, res, error, 200);
        })
    }
};