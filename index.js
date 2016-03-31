(() => {

    'use strict';

    const EventEmitter = require('events');
    const util = require('util');
    const _ = require('lodash');

    const Model = function(settings) {

        //EventEmitter.call(this);
        this.settings = settings || {};

        this.data = {};

        this.init = () => {};

        this.set = data => {
            //makeup a unqiue id
            const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
            this.data[id] = data;
            this.emit('change', this.data);
            return id;
        };

        this.get = id => {
            if (id) {
                return this.data[id];
            } else {
                return this.data;
            }
        };

        this.update = (id, updateData) => {
            if (id && updateData && this.data[id]) {
                this.data[id] = _.extend({}, this.data[id], updateData);
                this.emit('change', this.data);
                return this.data[id];
            } else {
                return;
            }
        };

        this.delete = id => {
            if (id) {
                delete this.data[id];
                this.emit('change', this.data);
                return true;
            } else {
                this.data = {};
                this.emit('change', this.data);
                return this.data;
            }
        };

        this.init();

    };

    util.inherits(Model, EventEmitter);

    module.exports = Model;

})();
