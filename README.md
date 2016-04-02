# trndyModel

A simple JS data model that emits events on data change. Offers support for collections of models.

Install the node module:

```
npm install trndymodel --save
```

## Models Usage

trndyModel supports models and collections, this first example is for models only.

### Require

```
var Model = require('trndymodel').Model;
```

### Instantiate

```
var modelColor = new Model();
```

Optionally you can also set the model data at instantiation:

```
var modelColor = new Model({
    name: 'red'
});
```

### Events

Add change listener to the model. Whenever a model changes it will emit a 'change' event.

```
modelColor.on('change', function(data) {
    console.log('Model Data Change:', data);
});
```

Model and collection events are emited using Node.js' events module. For more options on how to listen to events please look at the Node.js documentation:

https://nodejs.org/api/events.html

### Set

Save some data in the model. This will emit a 'change' event.

```
modelColor.set({
    name: 'red'
});
```

### Get

Retreive the stored model data.

```
var redColorData = modelColor.get();
```

### Update

Update the stored model data with new data. This extends the existing model data, old properties are overwritten, new properties are added to the model. This will emit a 'change' event.

```
modelColor.update({
    name: 'blue',
    isPrimaryColor: true
});
```

### Delete

This sets the model data to an empty object.  This will emit a 'change' event.

```
modelColor.delete();
```

## Collections Usage

This example is for using models in conjunction collections.

### Require

```
var Model = require('trndymodel').Model;
var Collection = require('trndymodel').Collection;
```

### Instantiate

Create a couple new models.

```
var modelColor1 = new Model();
var modelColor2 = new Model();
var modelColor3 = new Model();
```

Now create a new collection to hold the models.

```
var modelColors = new Collection();
```

### Events

Add change listeners to the models and the collection. Whenever these models or this collection change they will emit a 'change' event.

models:

```
modelColor1.on('change', function(data) {
    console.log('Model 1 Data Change:', data);
});
modelColor2.on('change', function(data) {
    console.log('Model 2 Data Change:', data);
});
modelColor3.on('change', function(data) {
    console.log('Model 3 Data Change:', data);
});

```

collection:

```
modelColors.on('change', function(data) {
    console.log('Collection Data Change:', data);
});
```

Model and collection events are emited using Node.js' events module. For more options on how to listen to events please look at the Node.js documentation:

https://nodejs.org/api/events.html

### Set

Save some data in the model. This will emit a 'change' event.

```
modelColor1.set({
    name: 'red'
});
modelColor2.set({
    name: 'green'
});
modelColor3.set({
    name: 'blue'
});
```

Now add the models to the collection. This will emit a 'change' event.

```
modelColors.set(modelColor1);
modelColors.set(modelColor2);
modelColors.set(modelColor3);
```

### Get

This returns then entire collection data array.

```
var allColors = modelColors.get();
```

This returns only a single model from the collection array at the specified index.

```
var greenData = modelColors.get(1);
```

### Update

This updates a single stored model with new data by array at the specified index. This extends the existing model data, old properties are overwritten, new properties are added to the model. This will emit a 'change' event.

```
modelColors.update(1, {
    isPrimaryColor: true
});
```

This updates the collection with all new data. The new data must be an array. This will emit a 'change' event.

```
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
```

### Delete

This sets the model data to an empty object at the specified index.  This will emit a 'change' event.

```
modelColors.delete(2);
```

This sets the collection data to an empty array.  This will emit a 'change' event.

```
modelColors.delete();
```
