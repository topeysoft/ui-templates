function RestClient(entityBaseUrl, useAuthorization=true, use_sanbox=true) {
    var _this = this;
    var httpClient = new HttpClient(useAuthorization);
    var sandbox = use_sanbox?'?use_sandbox=true':'';
    _this.findById = function (id) {
        return httpClient.get(`${entityBaseUrl}/${id}${sandbox}`);
    }
    _this.find = function () {
        return httpClient.get(entityBaseUrl+sandbox);
    }
    _this.create = function (entity) {
        return httpClient.post(entityBaseUrl+sandbox, entity);
    }
    _this.update = function (id, entity) {
        return httpClient.put(`${entityBaseUrl}/${id}${sandbox}`, entity);
    }
    _this.merge = function (id, entity) {
        return httpClient.patch(`${entityBaseUrl}/${id}${sandbox}`, entity);
    }
    _this.delete = function (id) {
        return httpClient.delete(`${entityBaseUrl}/${id}${sandbox}`);
    }

    _this.upsert = function (id, entity) {
        return new Promise(function (resolve, reject) {
            _this.update(id, entity).then(resolve)
            .catch(function(err){
                _this.create(entity).then(resolve)
                .catch(reject);
            });
        });
    }
}