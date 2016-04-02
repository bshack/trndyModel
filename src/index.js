import EventEmitter from 'events';
import util from 'util';
import _ from 'lodash';

(function(EventEmitter, util, _) {

    'use strict';

    /*
    MODEL
    */

    const Model = function(modelData) {

        // where the data is held for the model
        this.modelData = modelData || {};

        // this is called whenever the model is instantiated
        this.initialize = () => {};

        // the setter
        this.set = data => {
            this.modelData = data;
            this.emit('change', this.get());
            return true;
        };

        // the getter
        this.get = () => {
            return this.modelData;
        };

        // the updater
        this.update = (updateData) => {

            if (updateData) {
                this.modelData = _.extend(this.modelData, updateData);
                this.emit('change', this.get());
                return true;
            } else {
                return false;
            }

        };

        // the deleter
        this.delete = () => {
            this.modelData = {};
            this.emit('change', this.get());
            return true;
        };

        // run it on instantiation
        this.initialize();

    };

    /*
    COLLECTION
    */

    const Collection = function(collectionData) {

        // where the data is held for the model
        this.collectionData = collectionData || [];

        // this is called whenever the model is instantiated
        this.initialize = () => {};

        // the setter
        this.set = data => {

            if (data) {
                this.collectionData.push(data);
                this.emit('change', this.get());
                return true;
            } else {
                return false;
            }

        };

        // the getter
        this.get = index => {

            if (!isNaN(index)) {
                return this.collectionData[index];
            } else {
                return this.collectionData;
            }

        };

        // the updater
        this.update = (index, updateData) => {

            if (!isNaN(index) && updateData && this.collectionData[index] && this.collectionData[index].modelData) {
                this.collectionData[index].modelData =
                    _.extend(this.collectionData[index].modelData, updateData);
                this.collectionData[index].emit('change', this.collectionData[index].get());
                this.emit('change', this.get());
                return true;
            } else if (Array.isArray(index)) {
                this.collectionData = index;
                this.emit('change', this.get());
            } else {
                return false;
            }

        };

        // the deleter
        this.delete = index => {

            if (!isNaN(index) && this.collectionData[index] && this.collectionData[index].modelData) {
                _.pullAt(this.collectionData, index);
                this.emit('change', this.get());
                return true;
            } else {
                this.collectionData = [];
                this.emit('change', this.get());
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

})(EventEmitter, util, _);
