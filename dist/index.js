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

        var Model = function Model(settings) {
            var _this = this;

            // a place to hold some settings
            this.settings = settings || {};

            // where the data is held for the model
            this.data = {};

            // this is called whenever the model is instantiated
            this.init = function () {};

            // the setter
            this.set = function (data) {
                //makeup a unqiue id
                var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
                _this.data[id] = data;
                _this.emit('change', _this.get());
                return id;
            };

            // the getter
            this.get = function (id) {
                if (id) {
                    return _this.data[id];
                } else {
                    //clean up protoype
                    var name = void 0;
                    var cleanData = {};
                    for (name in _this.data) {
                        if (_this.data.hasOwnProperty(name)) {
                            cleanData[name] = _this.data[name];
                        }
                    }
                    return cleanData;
                }
            };

            // the updater
            this.update = function (id, updateData) {
                if (id && updateData && _this.data[id]) {
                    _this.data[id] = _.extend({}, _this.data[id], updateData);
                    _this.emit('change', _this.get());
                    return _this.get(id);
                } else {
                    return;
                }
            };

            // the deleter
            this.delete = function (id) {
                if (id) {
                    delete _this.data[id];
                    _this.emit('change', _this.get());
                    return true;
                } else {
                    _this.data = {};
                    _this.emit('change', _this.get());
                    return _this.get();
                }
            };

            // run it on instantiation
            this.init();
        };

        // this sets up the events
        util.inherits(Model, EventEmitter);

        module.exports = Model;
    })(_events2.default, _util2.default, _lodash2.default);
});
