const service = require('app/services/index');

module.exports = {
    getSafeRating: async (year, manufacturer, model, with_rating) => {
        try {
            if (!year || !manufacturer || !model) {
                return Promise.resolve({Count: 0, Results: []})
            }
            let response = await service.vehicle.fetchSafeRating(year, manufacturer, model);
            if (!response.status) {
                return {Count: 0, Results: []}
            }

            let map_result = response.data.Results.map(({VehicleDescription: Description, ...rest}) => ({Description, ...rest}));

            if (with_rating !== 'true' || Number(response.data.Count) === 0) {
                return {
                    Count: response.data.Count,
                    Results: Number(response.data.Count) === 0 ? [] : map_result
                }
            }

            let result = await vehicleRating(map_result);
            return {
                Count: response.data.Count,
                Results: result
            }
        } catch (e) {
            return {Count: 0, Results: []}
        }
    }
};

async function vehicleRating(result) {
    for (let item of result) {
        let response = await service.vehicle.fetchVehicleRating(item.VehicleId);

        item.CrashRating = response.data.Results[0].OverallRating;
    }

    return result;
}