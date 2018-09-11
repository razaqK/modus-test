const express = require('express');
const router = express.Router();
const controller = require('app/controllers/index');

router.get('/:year/:manufacturer/:model', controller.vehicle.safeRating);
router.post('/', controller.vehicle.requestSafeRating);

module.exports = router;