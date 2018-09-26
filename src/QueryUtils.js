/**
 * Convert an object to a query string.
 * The object contain string keys and values or arrays of values.
 */
function stringifyQuery(obj, addMarker=true) {
    obj = obj || {};

    const retArr = Object.keys(obj).reduce(
        (retArr, key) => {
            const val = obj[key];

            if(Array.isArray(val)) {
                for(let i in val) {
                    retArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(val[i]));
                }
            } else {
                retArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
            }
            
            return retArr;
        }, []);

    if(retArr.length > 0) {
        return (addMarker ? '?' : '') + retArr.join('&');
    }

    return '';
}

function parseQueryArray(qstr) {
    qstr = qstr || '';
    qstr = (qstr.length > 0 && qstr[0] === '?' ? qstr.substr(1) : qstr);
    let query = {};

    if(qstr === '') {
        return query;
    }

    let ampSplit = qstr.split('&');

    for(let i=0;i<ampSplit.length;i++) {
        let nameVal = ampSplit[i].split('=');
        let name = decodeURIComponent(nameVal[0]);
        let val = decodeURIComponent(nameVal[1] || '');

        if(name in query) {
            query[name].push(val);
        } else {
            query[name] = [val];
        }
    }

    return query;
}

function dearrayifyQuery(query) {
    let singleQuery = {};
    
    Object.keys(query).forEach((v) => {
        if(query[v].length > 0) {
            singleQuery[v] = query[v][0];
        }
    });

    return singleQuery;
}

function parseQuery(qstr) {
    return dearrayifyQuery(parseQueryArray(qstr));
}

export { stringifyQuery, parseQueryArray, parseQuery, dearrayifyQuery}