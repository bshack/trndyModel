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

            // where the data is held for the model
            this.modelData = modelData || {};

            // this is called whenever the model is instantiated
            this.initialize = function () {};

            // the setter
            this.set = function (data) {
                _this.modelData = data;
                _this.emit('change', _this.get());
                return true;
            };

            // the getter
            this.get = function () {
                return _this.modelData;
            };

            // the updater
            this.update = function (updateData) {

                if (updateData) {
                    _this.modelData = _.extend(_this.modelData, updateData);
                    _this.emit('change', _this.get());
                    return true;
                } else {
                    return false;
                }
            };

            // the deleter
            this.delete = function () {
                _this.modelData = {};
                _this.emit('change', _this.get());
                return true;
            };

            // run it on instantiation
            this.initialize();
        };

        /*
        COLLECTION
        */

        var Collection = function Collection(collectionData) {
            var _this2 = this;

            // where the data is held for the model
            this.collectionData = collectionData || [];

            // this is called whenever the model is instantiated
            this.initialize = function () {};

            // the setter
            this.set = function (data) {

                if (data) {
                    _this2.collectionData.push(data);
                    _this2.emit('change', _this2.get());
                    return true;
                } else {
                    return false;
                }
            };

            // the getter
            this.get = function (index) {

                if (!isNaN(index)) {
                    return _this2.collectionData[index];
                } else {
                    return _this2.collectionData;
                }
            };

            // the updater
            this.update = function (index, updateData) {

                if (!isNaN(index) && updateData && _this2.collectionData[index] && _this2.collectionData[index].modelData) {
                    _this2.collectionData[index].modelData = _.extend(_this2.collectionData[index].modelData, updateData);
                    _this2.emit('change', _this2.get());
                    return true;
                } else {
                    return false;
                }
            };

            // the deleter
            this.delete = function (index) {

                if (!isNaN(index) && _this2.collectionData[index] && _this2.collectionData[index].modelData) {
                    delete _this2.collectionData[index];
                    _this2.emit('change', _this2.get());
                    return true;
                } else {
                    _this2.collectionData = [];
                    _this2.emit('change', _this2.get());
                    return true;
                }
            };

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
