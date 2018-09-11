const axios = require('axios');

function Response(Request, field, identifier) {
    if (!(this instanceof Response)) {
        return new Response(Request, field, identifier);
    }
    this.config = Request.config;
    this.field = field;
    this.identifier = identifier;
}

function loadConfig(options) {
    this.config.timeout = (options.timeout) ? options.timeout : this.config.timeout;
    this.config.params = (options.params) ? options.params : this.config.params;
    this.config.headers = (options.headers) ? {...this.config.headers, ...options.headers} : this.config.headers;
    this.map_response.field = (options.map_response) ? options.map_response.field : this.map_response.field;
    this.map_response.identifier = (options.map_response) ? options.map_response.identifier : this.map_response.identifier;
}


function Request(url, config, map_response) {
    if (!(this instanceof Request)) {
        return new Request(url, config);
    }

    this.config = {};
    this.config.headers = {};
    this.map_response = {};

    if (config) {
        this.config.method = config.method;
        this.config.headers = (config.headers) ? {...this.config.headers, ...config.headers} : this.config.headers;
        this.config.params = config.params;
        this.config.timeout = config.timeout;
    }

    if (map_response) {
        this.map_response.field = map_response.field;
        this.map_response.identifier = map_response.identifier;
    }

    this.config.base_url = url;
}

Request.prototype.doGet = function (uri, options) {
    return this.sendRequest(uri, 'GET', options)
};

Request.prototype.doPost = function (uri, options) {
    return this.sendRequest(uri, 'POST', options)
};

Request.prototype.doPut = function (uri, options) {
    return this.sendRequest(uri, 'PUT', options)
};

Request.prototype.doDelete = function (uri, options) {
    return this.sendRequest(uri, 'DELETE', options)
};

Request.prototype.sendRequest = function (uri, method, options) {
    if (options) {
        loadConfig.call(this, options)
    }
    this.config.method = method;
    if (method.toLowerCase() !== 'get') {
        this.config.data = options.data;
    }
    this.config.url = (this.config.base_url) ? this.config.base_url + uri : uri;
    return new Response(this, this.map_response.field, this.map_response.identifier).build()
};

Response.prototype.build = async function () {
    try {
        this.response = await axios(this.config);
        if (!this.response) {
            throw new Error('Response state is undefined');
        }

        if (this.response.data[this.field] === this.identifier
            || (this.field === 'raw' && this.identifier === true)) {
            return {status: true, data: this.response.data, status_code: this.response.status}
        }

        return {status: false, data: this.response.data, status_code: this.response.status}
    }catch (e) {
        return {status: false, data: (!e.response ? {} : (e.response.data ? e.response.data : e.response)), raw: e, status_code: e.response.status}
    }
};

Request.Response = Response;

module.exports = Request;