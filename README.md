# Simple URL Query Utils

Simple utility functions for parsing and creating query strings for URLs.

## Usage

Basic usage of the functions:
```
import * as QueryUtils from '@trt2/simple-url-queryutils';

let res = QueryUtils.stringifyQuery({'val1': 123, 'val2': 'asd', boolval: true}, false);
// res = "val1=123&val2=asd&boolval=true

res = QueryUtils.stringifyQuery({'val': 1, 'val': 2, 'val': 3});
// res = "val=1&val=2&val=3"

res = QueryUtils.parseQueryArray("val1=123&val2=asd&boolval=true);
// res = {'val1': ['123'], 'val2': ['asd'], boolval: ['true']}

res = dearrayifyQuery({'val1': ['123'], 'val2': ['asd'], boolval: ['true']})
// res = {'val1': '123', 'val2': 'asd', boolval: 'true'}

res = QueryUtils.parseQuery("val1=123&val2=asd&boolval=true);
// res = {'val1': '123', 'val2': 'asd', boolval: 'true'}
```


## function stringifyQuery(obj, addMarker=true)
- obj - Object containing either string values or array of string values
- addMarker - Add '?' character before parameters

## function parseQueryArray(qstr)
- qstr - Query string to parse

This will return an object with the value names as keys, and the values as an array of strings.

## function dearrayifyQuery(query)
- query - This must be an object containing array of string values (as returned by parseQueryArray()).

This function will return an object where the first item of the array value is set as the value in the object:
```
{"numberValue": ["1","2","3"]} is converted to {"numberValue": "1"}
```

## function parseQuery(qstr)
- qstr - Query string to parse

This is a shortcut for:
```
dearrayifyQuery(parseQueryArray(qstr))
```