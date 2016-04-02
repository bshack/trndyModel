'use strict';

const trndyModel = require('../dist/index');
const Model = trndyModel.Model;
const Collection = trndyModel.Collection;

// canary
describe("A suite", function() {
    it("contains spec with an expectation", function() {
        expect(true).toBe(true);
    });
});

describe("trndyModel module", function() {
    it("has a Model function defined", function() {
        expect(trndyModel.Model).toEqual(jasmine.any(Function));
    });
    it("has a Collection function defined", function() {
        expect(trndyModel.Collection).toEqual(jasmine.any(Function));
    });
});

describe("A Model", function() {
    let modelColor;
    let modelColorChange;
    beforeEach(function() {
        modelColor = new Model();
    });
    it("is an object", function() {
        expect(modelColor).toEqual(jasmine.any(Object));
    });
    it("is has an modelData object", function() {
        expect(modelColor.modelData).toEqual(jasmine.any(Object));
    });
    it("is has an initialize function", function() {
        expect(modelColor.initialize).toEqual(jasmine.any(Function));
    });
    it("is has a set function", function() {
        expect(modelColor.set).toEqual(jasmine.any(Function));
    });
    it("is has a get function", function() {
        expect(modelColor.get).toEqual(jasmine.any(Function));
    });
    it("is has an update function", function() {
        expect(modelColor.update).toEqual(jasmine.any(Function));
    });
    it("is has an delete function", function() {
        expect(modelColor.delete).toEqual(jasmine.any(Function));
    });
    it("will save data in the model using set", function() {
        let setReturns = modelColor.set({
            name: 'red'
        });
        expect(modelColor.modelData.name).toEqual('red');
        expect(setReturns).toEqual(true);
    });
    it("will not save data in the model using set when no data is passed in", function() {
        let setReturns = modelColor.set();
        expect(modelColor.modelData).toEqual({});
        expect(setReturns).toEqual(false);
    });
    it("will retrieve data in the model using get", function() {
        modelColor.set({
            name: 'red'
        });
        var redColorData = modelColor.get();
        expect(redColorData.name).toEqual('red');
    });
    it("will update data in the model using update", function() {
        modelColor.set({
            name: 'red'
        });
        let updateReturns = modelColor.update({
            name: 'blue',
            isPrimaryColor: true
        });
        let updateReturnsEmpty = modelColor.update();
        expect(modelColor.get()).toEqual({
            name: 'blue',
            isPrimaryColor: true
        });
        expect(updateReturns).toEqual(true);
        expect(updateReturnsEmpty).toEqual(false);
    });
    it("will remove the data from the model using delete", function() {
        modelColor.set({
            name: 'red'
        });
        let deleteReturns = modelColor.delete();
        expect(modelColor.get()).toEqual({});
        expect(deleteReturns).toEqual(true);
    });
});

describe("A Collection", function() {
    let modelColor1;
    let modelColor2;
    let modelColor3;
    let modelColors;
    beforeEach(function() {
        modelColor1 = new Model({
            name: 'red'
        });
        modelColor2 = new Model({
            name: 'green'
        });
        modelColor3 = new Model({
            name: 'blue'
        });
        modelColors = new Collection();
    });
    it("is an object", function() {
        expect(modelColors).toEqual(jasmine.any(Object));
    });
    it("is has an modelData object", function() {
        expect(modelColors.collectionData).toEqual(jasmine.any(Object));
    });
    it("is has an initialize function", function() {
        expect(modelColors.initialize).toEqual(jasmine.any(Function));
    });
    it("is has a set function", function() {
        expect(modelColors.set).toEqual(jasmine.any(Function));
    });
    it("is has a get function", function() {
        expect(modelColors.get).toEqual(jasmine.any(Function));
    });
    it("is has an update function", function() {
        expect(modelColors.update).toEqual(jasmine.any(Function));
    });
    it("is has an delete function", function() {
        expect(modelColors.delete).toEqual(jasmine.any(Function));
    });
    it("will save data in the collection using set", function() {
        let setReturns = modelColors.set(modelColor1);
        expect(modelColors.collectionData[0].modelData).toEqual({
            name: 'red'
        });
        expect(setReturns).toEqual(true);
    });
    it("will not save data in the collection using set when data is not passed in", function() {
        let setReturns = modelColors.set();
        expect(modelColors.collectionData).toEqual([]);
        expect(setReturns).toEqual(false);
    });
    it("will retrieve all the data in the collection using get", function() {
        modelColors.set(modelColor1);
        var allColorData = modelColors.get();
        expect(allColorData).toEqual(jasmine.any(Array));
        expect(allColorData.length).toEqual(1);
        expect(allColorData[0].modelData).toEqual({
            name: 'red'
        });
    });
    it("will retrieve one model in the collection using get at the specified index", function() {
        modelColors.set(modelColor1);
        var colorData = modelColors.get(0);
        expect(colorData).toEqual(jasmine.any(Object));
        expect(colorData.modelData).toEqual({
            name: 'red'
        });
    });
    it("will update model data in the collection using update with the specified index", function() {
        modelColors.set(modelColor1);
        let updateReturns = modelColors.update(0, {
            name: 'blue',
            isPrimaryColor: true
        });
        expect(modelColors.get(0).modelData).toEqual({
            name: 'blue',
            isPrimaryColor: true
        });
        expect(updateReturns).toEqual(true);
    });
    it("will update model data in the collection using update with an array of models", function() {
        modelColors.set(modelColor1);
        let updateReturns = modelColors.update([
            new Model({
                name: 'cyan'
            }),
            new Model({
                name: 'magenta'
            }),
            new Model({
                name: 'yellow'
            }),
            new Model({
                name: 'black'
            })
        ]);
        expect(modelColors.get(3).modelData).toEqual({
            name: 'black'
        });
        expect(updateReturns).toEqual(true);
    });
    it("will not update all model data in the collection using with the argument is not an array", function() {
        modelColors.update([
            new Model({
                name: 'cyan'
            }),
            new Model({
                name: 'magenta'
            }),
            new Model({
                name: 'yellow'
            }),
            new Model({
                name: 'black'
            })
        ]);
        let updateReturns = modelColors.update({});
        expect(modelColors.get(3).modelData).toEqual({
            name: 'black'
        });
        expect(updateReturns).toEqual(false);
    });
    it("will remove model data from the the collection using delete at the specified index", function() {
        modelColors.update([
            new Model({
                name: 'cyan'
            }),
            new Model({
                name: 'magenta'
            }),
            new Model({
                name: 'yellow'
            }),
            new Model({
                name: 'black'
            })
        ]);
        let deleteReturns = modelColors.delete(2);
        expect(modelColors.get(2).modelData).toEqual({
            name: 'black'
        });
        expect(modelColors.get().length).toEqual(3);
        expect(deleteReturns).toEqual(true);
    });
    it("will not remove model data from the the collection using delete at the specified index when that index does not exist", function() {
        modelColors.update([
            new Model({
                name: 'cyan'
            }),
            new Model({
                name: 'magenta'
            }),
            new Model({
                name: 'yellow'
            }),
            new Model({
                name: 'black'
            })
        ]);
        let deleteReturns = modelColors.delete(10);
        expect(modelColors.get(2).modelData).toEqual({
            name: 'yellow'
        });
        expect(modelColors.get().length).toEqual(4);
        expect(deleteReturns).toEqual(false);
    });
    it("will remove all the model data from the collection using delete", function() {
        let deleteReturns = modelColors.set({
            name: 'red'
        });
        modelColors.delete();
        expect(modelColors.get()).toEqual([]);
        expect(deleteReturns).toEqual(true);
    });
});
