const RequestHelper = require('app/libs/request_helper');
const config = require('app/config/config');
const sprintf = require('sprintf-js').sprintf;


let request = new RequestHelper(config.api.nhtsa.base_uri);


class Vehicle {
}

Vehicle.fetchSafeRating = async function (year, manufacturer, model) {
    try {
        return request.doGet(sprintf(`${config.api.nhtsa.safe_rating_uri}`, year, manufacturer, model), {
            params: {format: 'json'},
            map_response: {
                field: 'raw',
                identifier: true
            }
        });
    } catch (e) {
        return {status: false, data: e}
    }
};

Vehicle.fetchVehicleRating = async function (vehicle_id) {
    try {
        return request.doGet(sprintf(`${config.api.nhtsa.vehicle_rating}`, vehicle_id), {
            params: {format: 'json'},
            map_response: {
                field: 'raw',
                identifier: true
            }
        });
    } catch (e) {
        return {status: false, data: e}
    }
};

module.exports = Vehicle;
