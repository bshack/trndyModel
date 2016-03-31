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

    var Model = function Model(settings) {
        var _this = this;

        //EventEmitter.call(this);
        this.settings = settings || {};

        this.data = {};

        this.init = function () {};

        this.set = function (data) {
            //makeup a unqiue id
            var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
            _this.data[id] = data;
            _this.emit('change', _this.data);
            return id;
        };

        this.get = function (id) {
            if (id) {
                return _this.data[id];
            } else {
                return _this.data;
            }
        };

        this.update = function (id, updateData) {
            if (id && updateData && _this.data[id]) {
                _this.data[id] = _lodash2.default.extend({}, _this.data[id], updateData);
                _this.emit('change', _this.data);
                return _this.data[id];
            } else {
                return;
            }
        };

        this.delete = function (id) {
            if (id) {
                delete _this.data[id];
                _this.emit('change', _this.data);
                return true;
            } else {
                _this.data = {};
                _this.emit('change', _this.data);
                return _this.data;
            }
        };

        this.init();
    };

    _util2.default.inherits(Model, _events2.default);

    module.exports = Model;
});
