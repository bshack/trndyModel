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
        if (modelData && _.isObject(modelData)) {
            this.modelData = modelData;
        } else {
            this.modelData = {};
        }

        // this is called whenever the model is instantiated
        this.initialize = () => {};

        // the setter
        this.set = data => {
            if (data && _.isObject(data)) {
                this.modelData = data;
                this.emit('change', this.get());
                return true;
            } else {
                return false;
            }
        };

        // the getter
        this.get = () => {
            return this.modelData;
        };

        // the updater
        this.update = (updateData) => {

            if (updateData && _.isObject(updateData)) {
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

        // where the data is held for the collection
        if (collectionData && _.isArray(collectionData)) {
            this.collectionData = collectionData;
        } else {
            this.collectionData = [];
        }

        // this is called whenever the model is instantiated
        this.initialize = () => {};

        // the setter
        this.set = data => {

            if (_.isArray(data)) {
                this.collectionData = data;
                this.emit('change', this.get());
                return true;
            } else {
                return false;
            }

        };

        // the pusher
        this.push = data => {

            if (data) {
                this.collectionData = _.concat(this.collectionData, data);
                this.emit('change', this.get());
                return true;
            } else {
                return false;
            }

        };

        // the getter
        this.get = index => {

            if (_.isNumber(index)) {
                return this.collectionData[index];
            } else {
                return this.collectionData;
            }

        };

        // the updater
        this.update = (index, updateData) => {

            if (_.isNumber(index) && this.collectionData[index]) {

                // if we are updating a model
                if (_.isObject(updateData) && _.isObject(this.collectionData[index].modelData)) {

                    this.collectionData[index].modelData =
                        _.extend(this.collectionData[index].modelData, updateData);
                    this.collectionData[index].emit('change', this.collectionData[index].get());
                    this.emit('change', this.get());
                    return true;

                // if we are updating a standard object
                } else if (_.isObject(updateData) && _.isObject(this.collectionData[index])) {
                    this.collectionData[index] = _.extend(this.collectionData[index], updateData);
                    this.emit('change', this.get());
                    return true;
                } else if (updateData) {
                    this.collectionData[index] = updateData;
                    this.emit('change', this.get());
                    return true;
                } else {
                    return false;
                }

            } else if (_.isArray(index)) {
                this.collectionData = index;
                this.emit('change', this.get());
                return true;
            } else {
                return false;
            }

        };

        // the deleter
        this.delete = index => {

            if (_.isNumber(index) && this.collectionData[index]) {
                _.pullAt(this.collectionData, index);
                this.emit('change', this.get());
                return true;
            } else if (!index) {
                this.collectionData = [];
                this.emit('change', this.get());
                return true;
            } else {
                return false;
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
