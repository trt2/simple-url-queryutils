'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Convert an object to a query string.
 * The object contain string keys and values or arrays of values.
 */
function stringifyQuery(obj) {
    var addMarker = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    obj = obj || {};

    var retArr = Object.keys(obj).reduce(function (retArr, key) {
        var val = obj[key];

        if (Array.isArray(val)) {
            for (var i in val) {
                retArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(val[i]));
            }
        } else {
            retArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
        }

        return retArr;
    }, []);

    if (retArr.length > 0) {
        return (addMarker ? '?' : '') + retArr.join('&');
    }

    return '';
}

function parseQueryArray(qstr) {
    qstr = qstr || '';
    qstr = qstr.length > 0 && qstr[0] === '?' ? qstr.substr(1) : qstr;
    var query = {};

    if (qstr === '') {
        return query;
    }

    var ampSplit = qstr.split('&');

    for (var i = 0; i < ampSplit.length; i++) {
        var nameVal = ampSplit[i].split('=');
        var name = decodeURIComponent(nameVal[0]);
        var val = decodeURIComponent(nameVal[1] || '');

        if (name in query) {
            query[name].push(val);
        } else {
            query[name] = [val];
        }
    }

    return query;
}

function dearrayifyQuery(query) {
    var singleQuery = {};

    Object.keys(query).forEach(function (v) {
        if (query[v].length > 0) {
            singleQuery[v] = query[v][0];
        }
    });

    return singleQuery;
}

function parseQuery(qstr) {
    return dearrayifyQuery(parseQueryArray(qstr));
}

exports.stringifyQuery = stringifyQuery;
exports.parseQueryArray = parseQueryArray;
exports.parseQuery = parseQuery;
exports.dearrayifyQuery = dearrayifyQuery;