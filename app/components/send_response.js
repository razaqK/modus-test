module.exports = {
    send: function (req, res, data, status_code) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        if (req.method === "OPTIONS") {
            return res.status(200).end();
        }

        return res.status(status_code).json(data);
    }
};