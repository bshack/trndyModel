# trndyModel

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
    window.console.log('CHANGE CALLED', data);
);

// add data
var redColorID = modelColors.set({'color':'red'});

// get data
var redColorData = modelColors.get(redColorID);

// update data
modelColors.update(redColorID, {'color':'green'});

// delete data
modelColors.delete(redColorID);

```
