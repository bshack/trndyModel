import EventEmitter from 'events';
import util from 'util';
import _ from 'lodash';

(function(EventEmitter, util, _) {

    'use strict';

    const Model = function(settings) {

        // a place to hold some settings
        this.settings = settings || {};

        // where the data is held for the model
        this.data = {};

        // this is called whenever the model is instantiated
        this.init = () => {};

        // the setter
        this.set = data => {
            //makeup a unqiue id
            const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
            this.data[id] = data;
            this.emit('change', this.get());
            return id;
        };

        // the getter
        this.get = id => {
            if (id) {
                return this.data[id];
            } else {
                //clean up protoype
                let name;
                const cleanData = {};
                for (name in this.data) {
                    if (this.data.hasOwnProperty(name)) {
                        cleanData[name] = this.data[name];
                    }
                }
                return cleanData;
            }
        };

        // the updater
        this.update = (id, updateData) => {
            if (id && updateData && this.data[id]) {
                this.data[id] = _.extend({}, this.data[id], updateData);
                this.emit('change', this.get());
                return this.get(id);
            } else {
                return;
            }
        };

        // the deleter
        this.delete = id => {
            if (id) {
                delete this.data[id];
                this.emit('change', this.get());
                return true;
            } else {
                this.data = {};
                this.emit('change', this.get());
                return this.get();
            }
        };

        // run it on instantiation
        this.init();

    };

    // this sets up the events
    util.inherits(Model, EventEmitter);

    module.exports = Model;

})(EventEmitter, util, _);
