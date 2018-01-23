/**
 * Tests for lib/day2.js
 */

/* tslint:disable:no-implicit-dependencies  */
import {expect} from 'chai'
/* tslint:enable:no-implicit-dependencies */
import * as _lib from '../lib'

/* tslint:disable:no-unused-expression */
describe('lib.lineToNumbers()', () => {
    it('empty or whitespace string returns empty array', () => {
        expect([..._lib.lineToNumbers('')]).empty
        expect([..._lib.lineToNumbers('   ')]).empty
    })

    it('parses a single item', () => {
        expect([..._lib.lineToNumbers('123')]).eql([123])
        expect([..._lib.lineToNumbers('   123')]).eql([123])
        expect([..._lib.lineToNumbers('123   ')]).eql([123])
        expect([..._lib.lineToNumbers('   123   ')]).eql([123])
    })

    it('parses multiple items', () => {
        expect([..._lib.lineToNumbers('123 456')]).eql([123, 456])
        expect([..._lib.lineToNumbers('123   456')]).eql([123, 456])
        expect([..._lib.lineToNumbers('   123 456')]).eql([123, 456])
        expect([..._lib.lineToNumbers('123 456   ')]).eql([123, 456])
        expect([..._lib.lineToNumbers('   123   456   ')]).eql([123, 456])
    })
})

describe('lib.minMaxLineSum()', () => {
    it('returns 0 on an empty sequence', () => {
        expect(_lib.minMaxLineSum([])).eq(0)
    })

    it('returns 0 on a single-element sequence', () => {
        expect(_lib.minMaxLineSum([123])).eql(0)
    })

    it('returns 0 on a sequence with all elements equal', () => {
        expect(_lib.minMaxLineSum([123, 123, 123])).eql(0)
    })

    it('general case', () => {
        expect(_lib.minMaxLineSum([123, 456, 789])).eql(789 - 123)
        expect(_lib.minMaxLineSum([789, 456, 123])).eql(789 - 123)
        expect(_lib.minMaxLineSum([456, 123, 456, 123])).eql(456 - 123)
    })
})

describe('CheckSummer with minMaxLineSum', () => {
    let summer: _lib.CheckSummer

    beforeEach(() => {
        summer = new _lib.CheckSummer(_lib.minMaxLineSum)
    })

    it('the checksum of an empty summer is 0', () => {
        expect(summer.sum).eq(0)
    })

    it('adds the difference between the min and max to the sum when adding a line', () => {
        summer.addLine([123, 456, 789])
        expect(summer.sum).eq(789 - 123)
    })

    it('adding line checksum works with numbers in descending order', () => {
        summer.addLine([789, 456, 123])
        expect(summer.sum).eq(789 - 123)
    })

    it('adding a line as a string works', () => {
        summer.addLine('123 456 789')
        expect(summer.sum).eq(789 - 123)
    })

    it('adding multiple lines works', () => {
        summer.addLine('1 2 3')
        expect(summer.sum).eq(2)
        summer.addLine('4 5 6')
        expect(summer.sum).eq(4)
        summer.addLine('7 8 9')
        expect(summer.sum).eq(6)
    })

    it('smoke test', () => {
        const line1 = '5 1 9 5'
        const line2 = '7 5 3'
        const line3 = '2 4 6 8'

        summer.addLine(line1)
        expect(summer.sum).eq(8)

        summer.addLine(line2)
        expect(summer.sum).eq(8 + 4)

        summer.addLine(line3)
        expect(summer.sum).eq(8 + 4 + 6)
    })
})

describe('lib.iteratePairs', () => {
    it('empty or one-element input yields nothing', () => {
        expect([..._lib.iteratePairs([])]).empty
        expect([..._lib.iteratePairs([0])]).empty
    })

    it('general case', () => {
        expect([..._lib.iteratePairs([1, 2])]).eql([[1, 2]])
        expect([..._lib.iteratePairs([1, 2, 3, 4, 5])]).eql([
            [1, 2],
            [1, 3],
            [1, 4],
            [1, 5],
            [2, 3],
            [2, 4],
            [2, 5],
            [3, 4],
            [3, 5],
            [4, 5]
        ])
    })
})

describe('lib.evenDivLineSum()', () => {
    it('smoke test', () => {
        expect(_lib.evenDivLineSum([5, 9, 2, 8])).eq(4)
        expect(_lib.evenDivLineSum([9, 4, 7, 3])).eq(3)
        expect(_lib.evenDivLineSum([3, 8, 6, 5])).eq(2)
    })
})

describe('CheckSummer with evenDivLineSum()', () => {
    it('smoke test', () => {
        const summer = new _lib.CheckSummer(_lib.evenDivLineSum)
        summer.addLine('5 9 2 8')
        summer.addLine('9 4 7 3')
        summer.addLine('3 8 6 5')
        expect(summer.sum).eql(9)
    })
})
