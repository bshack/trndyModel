# trndyModel

A simple JS data model that emits events on data change. Offers support for collections of models.

## Install

```
npm install trndymodel --save
```

## Usage

### Models

```
// trndyModel supports models and collections
// this example is for models only

var Model = require('trndymodel').Model;


// instantiate a new model

var modelColor = new Model();


//add change listener to the model

modelColor.on('change', function(data) {
    window.console.log('Model Data Change:', data);
});


// set some data in the model
// emits 'change' event

modelColor.set({
    name: 'red'
});


// get the stored data

var redColorData = modelColor.get();


// update the stored data with new data
// this extends the model data, existing properties are overwritten, new properties are added
// emits 'change' event

modelColor.update({
    name: 'blue',
    isPrimaryColor: true
});


// delete the data
// this sets the model data to an empty object
// emits 'change' event

modelColor.delete();


```

#### Collections

```
// this example is for using models with collections

var Model = require('trndymodel').Model;
var Collection = require('trndymodel').Collection;


// instantiate a couple new models

var modelColor1 = new Model();
var modelColor2 = new Model();
var modelColor3 = new Model();


//add change listeners to the models

modelColor1.on('change', function(data) {
    window.console.log('Model 1 Data Change:', data);
});
modelColor2.on('change', function(data) {
    window.console.log('Model 2 Data Change:', data);
});
modelColor3.on('change', function(data) {
    window.console.log('Model 3 Data Change:', data);
});


// instantiate a new collection to hold the models

var modelColors = new Collection();


//add change listener to the collection

modelColors.on('change', function(data) {
    window.console.log('Collection Data Change:', data);
});


// set some data in the models
// emits 'change' event

modelColor1.set({
    name: 'red'
});
modelColor2.set({
    name: 'green'
});
modelColor3.set({
    name: 'blue'
});


// add the models to the collection
// emits 'change' event

modelColors.set(modelColor1);
modelColors.set(modelColor2);
modelColors.set(modelColor3);

// get all models in the collection
// returns array

var allColors = modelColors.get();


// get the green model from the collection

var greenData = modelColors.get(1);


// update the green model in the collection
// this extends the model data, existing properties are overwritten, new properties are added.
// passing an index is required
// emits 'change' event

modelColors.update(1, {
    isPrimaryColor: true
});


// delete the blue model from the collection
// this removes the model from the collection array.
// emits 'change' event

modelColors.delete(2);


// delete all the collection
// this sets the collection data to an empty array.
// emits 'change' event

modelColors.delete();


```
