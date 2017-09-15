function HttpClient(useAuthorization = true) {
    _this = this;
    function callBackend(payload, callWithAuth = useAuthorization) {
        if (!payload) {
            return;
        }

        return new Promise(function (resolve, reject) {
            if (callWithAuth) {
                window.tscLib.userService.getToken().then(function (token) {
                    makeCall(token);
                }).catch(err => {
                    reject(err)
                    console.log('Invalid user', err);
                });
            } else {
                makeCall();
            }
            function makeCall(token) {
                if (token) {
                    payload.headers = payload.headers || {};
                    payload.headers['Authorization'] = 'Bearer ' + token;
                }
                $.ajax(payload).done(function (data) {
                    resolve(data);
                }).catch(function (err) {
                    reject(err.responseText);
                });
            }
        });
    }
    _this.get = function (url) {
        let payload = {
            url: url,
            method: 'GET'
        }
        return callBackend(payload);
    }
    _this.post = function (url, data) {
        let payload = {
            url: url,
            method: 'POST',
            data: data
        }
        return callBackend(payload);

    }
    _this.put = function (url, data) {
        let payload = {
            url: url,
            method: 'PUT',
            data: data
        }
        return callBackend(payload);
    }
    _this.patch = function (url) {
        let payload = {
            url: url,
            method: 'PATCH',
            data: data
        }
        return callBackend(payload);
    }
    _this.delete = function (url) {
        let payload = {
            url: url,
            method: 'DELETE'
        }
        return callBackend(payload);
    }
    _this.options = function (url) {
        let payload = {
            url: url,
            method: 'OPTIONS'
        }
        return callBackend(payload);
    }

}
