'use strict';
require('dotenv').config();

module.exports = {
    app_env: process.env.APPLICATION_ENV,
    node_env: process.env.NODE_ENV,
    server: {
        port: process.env.PORT,
        allow_origin: '*'
    },
    api: {
        nhtsa: {
            base_uri: process.env.NHTSA_BASE_URI,
            safe_rating_uri: process.env.NHTSA_SAFE_RATING,
            vehicle_rating: process.env.NHTSA_VEHICLE_RATING
        }
    }
};
