import {suite, test} from 'vitest'
import {validus} from "@/*";
import {expectError, expectSuccess} from "./test.utils";

const number = () => validus().number()

suite('number', () => {

  test('number.dataType-success', () => {
    expectSuccess(validus().dataType('number')(5))
  })

  test('number.dataType-error', () => {
    expectError(validus().dataType('number')('Hi'))
  })

  test('number.number', () => {
    expectSuccess(number()(1))
  })

  test('number.string', () => {
    expectError(number()(''))
  })

  test('number.boolean', () => {
    expectError(number()(true))
  })

  test('number.date', () => {
    expectError(number()(new Date()))
  })

})

suite('number-integer', () => {

  test('number-integer', () => {
    expectSuccess(number().integer()(1))
  })

  test('number-integer.number', () => {
    expectError(number().integer()(1.1))
  })

  test('number-integer.empty', () => {
    expectError(number().integer()(''))
  })

  test('number-integer.alphabetic', () => {
    expectError(number().integer()('abc'))
  })

})

suite('number-float', () => {

  test('number-float', () => {
    expectSuccess(number().float()(1.1))
  })

  test('number-float.number', () => {
    expectError(number().float()(1))
  })

  test('number-float.empty', () => {
    expectError(number().float()(''))
  })

  test('number-float.alphabetic', () => {
    expectError(number().float()('abc'))
  })

})

suite('number-min', () => {

  test('number-min', () => {
    expectSuccess(number().min(1)(1))
  })

  test('number-min.number', () => {
    expectError(number().min(1)(0))
  })

  test('number-min.empty', () => {
    expectError(number().min(1)(''))
  })

  test('number-min.alphabetic', () => {
    expectError(number().min(1)('abc'))
  })

})

suite('number-max', () => {

  test('number-max', () => {
    expectSuccess(number().max(1)(1))
  })

  test('number-max.number', () => {
    expectError(number().max(1)(2))
  })

  test('number-max.empty', () => {
    expectError(number().max(1)(''))
  })

  test('number-max.alphabetic', () => {
    expectError(number().max(1)('abc'))
  })

})

suite('number-between', () => {

    test('number-between', () => {
      expectSuccess(number().between(1, 2)(1))
    })

    test('number-between.number', () => {
      expectError(number().between(1, 2)(0))
    })

    test('number-between.empty', () => {
      expectError(number().between(1, 2)(''))
    })

    test('number-between.alphabetic', () => {
      expectError(number().between(1, 2)('abc'))
    })

})

suite('number-positive', () => {

  test('number-positive', () => {
    expectSuccess(number().positive()(1))
  })

  test('number-positive.number', () => {
    expectSuccess(number().positive()(0))
  })

  test('number-positive.empty', () => {
    expectError(number().positive()(''))
  })

  test('number-positive.alphabetic', () => {
    expectError(number().positive()('abc'))
  })

})

suite('number-negative', () => {

  test('number-negative', () => {
    expectSuccess(number().negative()(-1))
  })

  test('number-negative.number', () => {
    expectSuccess(number().negative()(0))
  })

  test('number-negative.empty', () => {
    expectError(number().negative()(''))
  })

  test('number-negative.alphabetic', () => {
    expectError(number().negative()('abc'))
  })

})