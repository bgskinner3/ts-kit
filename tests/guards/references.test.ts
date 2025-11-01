import {
    isNull,
    isFunction,
    isObject,
    isArray,
    isMap,
    isSet,
    isWeakMap,
    isWeakSet,
    isNil,
    isUndefined,
    isDefined,
} from '../../src/utils';


describe('Reference Type Guards', () => {
    describe('isNull', () => {
        it('returns true only for null', () => {
            expect(isNull(null)).toBe(true);
            expect(isNull(undefined)).toBe(false);
            expect(isNull({})).toBe(false);
        });
    });

    describe('isUndefined', () => {
        it('returns true only for undefined', () => {
            expect(isUndefined(undefined)).toBe(true);
            expect(isUndefined(null)).toBe(false);
            expect(isUndefined(0)).toBe(false);
        });
    });

    describe('isDefined', () => {
        it('returns false for null or undefined', () => {
            expect(isDefined(null)).toBe(false);
            expect(isDefined(undefined)).toBe(false);
        });
        it('returns true for all other values', () => {
            expect(isDefined(0)).toBe(true);
            expect(isDefined('')).toBe(true);
            expect(isDefined({})).toBe(true);
        });
    });

    describe('isNil', () => {
        it('returns true for null or undefined', () => {
            expect(isNil(null)).toBe(true);
            expect(isNil(undefined)).toBe(true);
        });
        it('returns false otherwise', () => {
            expect(isNil(0)).toBe(false);
            expect(isNil('')).toBe(false);
            expect(isNil({})).toBe(false);
        });
    });

    describe('isFunction', () => {
        it('returns true only for functions', () => {
            expect(isFunction(() => { })).toBe(true);
            expect(isFunction(async () => { })).toBe(true);
            expect(isFunction(function () { })).toBe(true);
            expect(isFunction({})).toBe(false);
            expect(isFunction(null)).toBe(false);
        });
    });

    describe('isObject', () => {
        it('returns true only for non-null objects', () => {
            expect(isObject({})).toBe(true);
            expect(isObject([])).toBe(true); // Arrays are objects
            expect(isObject(null)).toBe(false);
            expect(isObject(42)).toBe(false);
        });
    });

    describe('isArray', () => {
        it('returns true only for arrays', () => {
            expect(isArray([])).toBe(true);
            expect(isArray([1, 2, 3])).toBe(true);
            expect(isArray({})).toBe(false);
            expect(isArray(null)).toBe(false);
        });
    });

    describe('isMap', () => {
        it('returns true only for Map instances', () => {
            expect(isMap(new Map())).toBe(true);
            expect(isMap(new WeakMap())).toBe(false);
            expect(isMap({})).toBe(false);
        });
    });

    describe('isSet', () => {
        it('returns true only for Set instances', () => {
            expect(isSet(new Set())).toBe(true);
            expect(isSet(new WeakSet())).toBe(false);
            expect(isSet([])).toBe(false);
        });
    });

    describe('isWeakMap', () => {
        it('returns true only for WeakMap instances', () => {
            expect(isWeakMap(new WeakMap())).toBe(true);
            expect(isWeakMap(new Map())).toBe(false);
        });
    });

    describe('isWeakSet', () => {
        it('returns true only for WeakSet instances', () => {
            expect(isWeakSet(new WeakSet())).toBe(true);
            expect(isWeakSet(new Set())).toBe(false);
        });
    });
});