import { assert, expect } from 'chai';

import * as QueryUtils from '../src/QueryUtils'; 

describe("stringifyQuery test", function() {
    it('Norwegian characters æøå', function() {
        let res = QueryUtils.stringifyQuery({ 'asd': 123, 'æøå': 'ÆØÅ', boolval: true })
        expect(res).to.equal('?asd=123&%C3%A6%C3%B8%C3%A5=%C3%86%C3%98%C3%85&boolval=true');
    });

    it('Norwegian characters æøå and other escaped characters with ?', function() {
        let res = QueryUtils.stringifyQuery({ 'asd': 123, 'æøå': 'ÆØÅ', boolval: true, testval: 'asd+%?/blabla/+space-> <-123' })
        expect(res).to.equal('?asd=123&%C3%A6%C3%B8%C3%A5=%C3%86%C3%98%C3%85&boolval=true&testval=asd%2B%25%3F%2Fblabla%2F%2Bspace-%3E%20%3C-123');
    });

    it('Norwegian characters æøå and other escaped characters without ?', function() {
        let res = QueryUtils.stringifyQuery({ 'asd': 123, 'æøå': 'ÆØÅ', boolval: true, testval: 'asd+%?/blabla/+space-> <-123' }, false)
        expect(res).to.equal('asd=123&%C3%A6%C3%B8%C3%A5=%C3%86%C3%98%C3%85&boolval=true&testval=asd%2B%25%3F%2Fblabla%2F%2Bspace-%3E%20%3C-123');
    });

    it('empty object with marker', function() {
        let res = QueryUtils.stringifyQuery({}, true)
        expect(res).to.equal('');
    });

    it('empty object without marker', function() {
        let res = QueryUtils.stringifyQuery({}, false)
        expect(res).to.equal('');
    });

    it('null', function() {
        let res = QueryUtils.stringifyQuery(null)
        expect(res).to.equal('');
    });

    it('undefined', function() {
        let res = QueryUtils.stringifyQuery(undefined)
        expect(res).to.equal('');
    });
});

describe("parseQueryArray test", function() {
    it('Norwegian characters æøå', function() {
        let res = QueryUtils.parseQueryArray('?asd=123&%C3%A6%C3%B8%C3%A5=%C3%86%C3%98%C3%85&boolval=true');
        expect(res).to.eql({ 'asd': ['123'], 'æøå': ['ÆØÅ'], boolval: ['true'] });
    });

    it('Norwegian characters æøå and other escaped characters with ?', function() {
        let res = QueryUtils.parseQueryArray('?asd=123&%C3%A6%C3%B8%C3%A5=%C3%86%C3%98%C3%85&boolval=true&testval=asd%2B%25%3F%2Fblabla%2F%2Bspace-%3E%20%3C-123');
        expect(res).to.eql({ 'asd': ['123'], 'æøå': ['ÆØÅ'], boolval: ['true'], testval: ['asd+%?/blabla/+space-> <-123'] });
    });

    it('Norwegian characters æøå and other escaped characters without ?', function() {
        let res = QueryUtils.parseQueryArray('asd=123&%C3%A6%C3%B8%C3%A5=%C3%86%C3%98%C3%85&boolval=true&testval=asd%2B%25%3F%2Fblabla%2F%2Bspace-%3E%20%3C-123');
        expect(res).to.eql({ 'asd': ['123'], 'æøå': ['ÆØÅ'], boolval: ['true'], testval: ['asd+%?/blabla/+space-> <-123'] });
    });

    it('empty string with marker (expect empty object)', function() {
        let res = QueryUtils.parseQueryArray('?')
        expect(res).to.eql({});
    });    

    it('empty string without marker (expect empty object)', function() {
        let res = QueryUtils.parseQueryArray('')
        expect(res).to.eql({});
    });

    it('null (expect empty object)', function() {
        let res = QueryUtils.parseQueryArray(null)
        expect(res).to.eql({});
    });

    it('undefined (expect empty object)', function() {
        let res = QueryUtils.parseQueryArray(undefined)
        expect(res).to.eql({});
    });    
});

describe("parseQuery test", function() {
    it('Norwegian characters æøå', function() {
        let res = QueryUtils.parseQuery('?asd=123&%C3%A6%C3%B8%C3%A5=%C3%86%C3%98%C3%85&boolval=true');
        expect(res).to.eql({ 'asd': '123', 'æøå': 'ÆØÅ', boolval: 'true'});
    });

    it('Norwegian characters æøå and other escaped characters with ?', function() {
        let res = QueryUtils.parseQuery('?asd=123&%C3%A6%C3%B8%C3%A5=%C3%86%C3%98%C3%85&boolval=true&testval=asd%2B%25%3F%2Fblabla%2F%2Bspace-%3E%20%3C-123');
        expect(res).to.eql({ 'asd': '123', 'æøå': 'ÆØÅ', boolval: 'true', testval: 'asd+%?/blabla/+space-> <-123' });
    });

    it('Norwegian characters æøå and other escaped characters without ?', function() {
        let res = QueryUtils.parseQuery('asd=123&%C3%A6%C3%B8%C3%A5=%C3%86%C3%98%C3%85&boolval=true&testval=asd%2B%25%3F%2Fblabla%2F%2Bspace-%3E%20%3C-123');
        expect(res).to.eql({ 'asd': '123', 'æøå': 'ÆØÅ', boolval: 'true', testval: 'asd+%?/blabla/+space-> <-123' });
    });
    
    it('empty string with marker (expect empty object)', function() {
        let res = QueryUtils.parseQuery('?')
        expect(res).to.eql({});
    });    

    it('empty string without marker (expect empty object)', function() {
        let res = QueryUtils.parseQuery('')
        expect(res).to.eql({});
    });

    it('null (expect empty object)', function() {
        let res = QueryUtils.parseQuery(null)
        expect(res).to.eql({});
    });

    it('undefined (expect empty object)', function() {
        let res = QueryUtils.parseQuery(undefined)
        expect(res).to.eql({});
    });    
});
