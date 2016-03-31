# trndyModel

simple js data model that emits events on data change

## install

```
npm install trndymodel --save
```

## usage

```
var Model = require('trndymodel');

var modelColors = new Model();

//add change listener
modelColors.on('change', function(data) {
    window.console.log('Data Change:', data);
});

// add data
var redColorID = modelColors.set({'color':'red'});

// get data
var redColorData = modelColors.get(redColorID);
window.console.log(redColorData);

// update data
modelColors.update(redColorID, {'color':'green'});

// delete data
modelColors.delete(redColorID);

```
