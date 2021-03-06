'use strict';

angular.module('<%= scriptAppName %>')
    .factory('<%= classedName %>Repository', function ($q, $http, $injector) {
        var _pool = {};

        var _getById = function (id) {
            var <%= classedName %>Model = $injector.get('<%= classedName %>Model');
            var deferred = $q.defer();
            var instance = _pool[id];
            if(instance)
            {
                deferred.resolve(instance);
                return deferred.promise;
            }
            else
            {
                return $http.get(<%= classedName %>Model.$urlBase + '/' + id).then(function (response) {
                    var <%= classedName %> = new <%= classedName %>Model(response.data);
                    _pool[id] = <%= classedName %>;
                    return <%= classedName %>;
                });
            }

        };

        var _getAll = function () {
            var <%= classedName %>Model = $injector.get('<%= classedName %>Model');
            //TODO: Max length of pool, to not manage to many instances in memory?
            return $http.get(<%= classedName %>Model.$urlBase).then(function (response) {
                if(Array.isArray(response.data))
                {
                    return response.data.map(function (item) {
                        var <%= classedName %> = new <%= classedName %>Model(item);
                        _pool[item.id] = <%= classedName %>;
                        return <%= classedName %>;
                    });
                }
                else {
                    throw new Error('Unexpected response from API. Expected Array, got ' + typeof response.data, response.data);
                }
            });
        };

        //This is to attach new models to the Repository
        var _attach = function (item) {
            var <%= classedName %>Model = $injector.get('<%= classedName %>Model');

            if(!(item instanceof <%= classedName %>Model)) throw new Error('You must provide a valid <%= classedName %>Model');
            _pool[item.id] = item;
        };

        var _create = function (data) {
            var <%= classedName %>Model = $injector.get('<%= classedName %>Model');
            return new <%= classedName %>Model(data);
        };

        return {
            getById: _getById,
            getAll: _getAll,
            attach: _attach,
            create: _create,
            _pool: _pool
        }
    });