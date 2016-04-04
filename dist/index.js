(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'events', 'util', 'lodash'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, require('events'), require('util'), require('lodash'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.events, global.util, global.lodash);
        global.index = mod.exports;
    }
})(this, function (module, _events, _util, _lodash) {
    'use strict';

    var _events2 = _interopRequireDefault(_events);

    var _util2 = _interopRequireDefault(_util);

    var _lodash2 = _interopRequireDefault(_lodash);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    (function (EventEmitter, util, _) {

        'use strict';

        /*
        MODEL
        */

        var Model = function Model(modelData) {
            var _this = this;

            // this is called whenever the model is instantiated
            this.initialize = function () {};

            // the setter
            this.set = function (data) {
                if (data && _.isObject(data)) {
                    _this.modelData = data;
                    _this.emit('change', _this.get());
                    _this.emit('set', _this.get());
                    return true;
                } else {
                    return false;
                }
            };

            // the getter
            this.get = function () {
                return _this.modelData;
            };

            // the updater
            this.update = function (updateData) {

                if (updateData && _.isObject(updateData)) {
                    _this.set(_.extend(_this.get(), updateData));
                    _this.emit('change', _this.get());
                    _this.emit('update', _this.get());
                    return true;
                } else {
                    return false;
                }
            };

            // the deleter
            this.delete = function () {
                _this.set({});
                _this.emit('change', _this.get());
                _this.emit('delete', _this.get());
                return true;
            };

            // where the data is held for the model
            if (modelData && _.isObject(modelData)) {
                this.set(modelData);
            } else {
                this.set({});
            }

            // run it on instantiation
            this.initialize();
        };

        /*
        COLLECTION
        */

        var Collection = function Collection(collectionData) {
            var _this2 = this;

            // this is called whenever the model is instantiated
            this.initialize = function () {};

            // the setter
            this.set = function (data) {
                if (_.isArray(data)) {
                    _this2.collectionData = data;
                    _this2.emit('change', _this2.get());
                    _this2.emit('set', _this2.get());
                    return true;
                } else {
                    return false;
                }
            };

            // the pusher
            this.push = function (data) {
                if (data) {
                    _this2.set(_.concat(_this2.get(), data));
                    _this2.emit('change', _this2.get());
                    _this2.emit('push', _this2.get());
                    return true;
                } else {
                    return false;
                }
            };

            // the getter
            this.get = function (index) {
                if (_.isNumber(index)) {
                    return _this2.collectionData[index];
                } else {
                    return _this2.collectionData;
                }
            };

            // the updater
            this.update = function (index, updateData) {
                if (_.isNumber(index) && _this2.get(index)) {
                    // if we are updating a model
                    if (_.isObject(updateData) && _this2.get(index).get && _.isObject(_this2.get(index).get())) {
                        _this2.get(index).set(_.extend(_this2.get(index).get(), updateData));
                        _this2.get(index).emit('change', _this2.get(index).get());
                        _this2.get(index).emit('update', _this2.get(index).get());
                        _this2.emit('change', _this2.get());
                        _this2.emit('update', _this2.get());
                        return true;
                        // if we are updating a standard object
                    } else if (_.isObject(updateData) && _.isObject(_this2.get(index))) {
                            _this2.collectionData[index] = _.extend(_this2.get(index), updateData);
                            _this2.emit('change', _this2.get());
                            _this2.emit('update', _this2.get());
                            return true;
                        } else if (updateData) {
                            _this2.collectionData[index] = updateData;
                            _this2.emit('change', _this2.get());
                            _this2.emit('update', _this2.get());
                            return true;
                        } else {
                            return false;
                        }
                } else if (_.isArray(index)) {
                    _this2.set(index);
                    _this2.emit('change', _this2.get());
                    _this2.emit('update', _this2.get());
                    return true;
                } else {
                    return false;
                }
            };

            // the deleter
            this.delete = function (index) {
                if (_.isNumber(index) && _this2.get(index)) {
                    _.pullAt(_this2.collectionData, index);
                    _this2.emit('change', _this2.get());
                    _this2.emit('delete', _this2.get());
                    return true;
                } else if (!index) {
                    _this2.set([]);
                    _this2.emit('change', _this2.get());
                    _this2.emit('delete', _this2.get());
                    return true;
                } else {
                    return false;
                }
            };

            // where the data is held for the collection
            if (collectionData && _.isArray(collectionData)) {
                this.set(collectionData);
            } else {
                this.set([]);
            }

            // run it on instantiation
            this.initialize();
        };

        // this sets up the events
        util.inherits(Model, EventEmitter);
        util.inherits(Collection, EventEmitter);

        module.exports = {
            Model: Model,
            Collection: Collection
        };
    })(_events2.default, _util2.default, _lodash2.default);
});
