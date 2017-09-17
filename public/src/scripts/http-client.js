function HttpClient(useAuthorization = true) {
    var _this = this;
    function callBackend(payload, callWithAuth = useAuthorization) {
        if (!payload) {
            return;
        }

        return new Promise(function (resolve, reject) {
            if (callWithAuth) {
                window.tscLib.userService.getToken().then(function (token) {
                    makeCall(token);
                }).catch(err => {
                    console.log('Invalid user', err);
                    reject(err)
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
    _this.get = function (url, useAuth=useAuthorization) {
        let payload = {
            url: url,
            method: 'GET'
        }
        return callBackend(payload, useAuth);
    }
    _this.post = function (url, data, useAuth=useAuthorization) {
        let payload = {
            url: url,
            method: 'POST',
            data: data
        }
        return callBackend(payload, useAuth);

    }
    _this.put = function (url, data, useAuth=useAuthorization) {
        let payload = {
            url: url,
            method: 'PUT',
            data: data
        }
        return callBackend(payload, useAuth);
    }
    _this.patch = function (url, useAuth=useAuthorization) {
        let payload = {
            url: url,
            method: 'PATCH',
            data: data
        }
        return callBackend(payload, useAuth);
    }
    _this.delete = function (url, useAuth=useAuthorization) {
        let payload = {
            url: url,
            method: 'DELETE'
        }
        return callBackend(payload, useAuth);
    }
    _this.options = function (url, useAuth=false) {
        let payload = {
            url: url,
            method: 'OPTIONS'
        }
        return callBackend(payload, useAuth);
    }

}
