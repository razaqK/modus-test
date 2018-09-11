class Mock {
    static getValidPayload() {
        return {
            modelYear: '2015',
            manufacturer: 'Toyota',
            model: 'Yaris'
        };
    }

    static getInvalidPayload() {
        return {
            modelYear: '2015',
            model: 'Yaris'
        };
    }
}

module.exports = Mock;