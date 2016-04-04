import EventEmitter from 'events';
import util from 'util';
import _ from 'lodash';

((EventEmitter, util, _) => {

    'use strict';

    /*
    MODEL
    */

    const Model = function(modelData) {

        // this is called whenever the model is instantiated
        this.initialize = () => {};

        // the setter
        this.set = data => {
            if (data && _.isObject(data)) {
                this.modelData = data;
                this.emit('change', this.get());
                this.emit('set', this.get());
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
        this.update = updateData => {

            if (updateData && _.isObject(updateData)) {
                this.set(_.extend(this.get(), updateData));
                this.emit('change', this.get());
                this.emit('update', this.get());
                return true;
            } else {
                return false;
            }

        };

        // the deleter
        this.delete = () => {
            this.set({});
            this.emit('change', this.get());
            this.emit('delete', this.get());
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

    const Collection = function(collectionData) {

        // this is called whenever the model is instantiated
        this.initialize = () => {};

        // the setter
        this.set = data => {
            if (_.isArray(data)) {
                this.collectionData = data;
                this.emit('change', this.get());
                this.emit('set', this.get());
                return true;
            } else {
                return false;
            }
        };

        // the pusher
        this.push = data => {
            if (data) {
                this.set(_.concat(this.get(), data));
                this.emit('change', this.get());
                this.emit('push', this.get());
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
            // if updating an item in the array
            if (_.isNumber(index) && this.get(index)) {
                // if we are updating a model
                if (_.isObject(updateData) && this.get(index).get && _.isObject(this.get(index).get())) {
                    this.get(index).set(_.extend(this.get(index).get(), updateData));
                    this.get(index).emit('change', this.get(index).get());
                    this.get(index).emit('update', this.get(index).get());
                    this.emit('change', this.get());
                    this.emit('update', this.get());
                    return true;
                // if we are updating a standard object
                } else if (_.isObject(updateData) && _.isObject(this.get(index))) {
                    this.collectionData[index] = _.extend(this.get(index), updateData);
                    this.emit('change', this.get());
                    this.emit('update', this.get());
                    return true;
                } else if (updateData) {
                    this.collectionData[index] = updateData;
                    this.emit('change', this.get());
                    this.emit('update', this.get());
                    return true;
                } else {
                    return false;
                }
            } else if (_.isArray(index)) {
                this.set(index);
                this.emit('change', this.get());
                this.emit('update', this.get());
                return true;
            } else {
                return false;
            }

        };

        // the deleter
        this.delete = index => {
            if (_.isNumber(index) && this.get(index)) {
                _.pullAt(this.collectionData, index);
                this.emit('change', this.get());
                this.emit('delete', this.get());
                return true;
            } else if (!index) {
                this.set([]);
                this.emit('change', this.get());
                this.emit('delete', this.get());
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

})(EventEmitter, util, _);
