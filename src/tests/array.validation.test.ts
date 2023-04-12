import {suite, test} from 'vitest'
import {validus} from "@/*";
import {expectError, expectSuccess} from "./test.utils";

const array = () => validus().array()

suite('array', () => {

  test('array.dataType-success', () => {
    expectError(validus().dataType('array')(5))
  })

  test('array.dataType-error', () => {
    expectSuccess(validus().dataType('array')([2]))
  })

  test('array.array', () => {
    expectSuccess(array()([]))
  })

  test('array.array', () => {
    expectSuccess(array()([1, 2]))
  })

  test('array.string', () => {
    expectError(array()(''))
  })

  test('array.boolean', () => {
    expectError(array()(true))
  })

  test('array.date', () => {
    expectError(array()(new Date()))
  })

})

suite('array-length', () => {

  test('array-length', () => {
    expectSuccess(array().length(2)([1, 2]))
  })

  test('array-length.number', () => {
    expectError(array().length(2)([1]))
  })

  test('array-length.empty', () => {
    expectError(array().length(2)([]))
  })

  test('array-length.alphabetic', () => {
    expectError(array().length(2)(['abc']))
  })

})

suite('array-min-length', () => {

  test('array-min-length', () => {
    expectSuccess(array().minLength(2)([1, 2]))
  })

  test('array-min-length.number', () => {
    expectError(array().minLength(2)([1]))
  })

  test('array-min-length.empty', () => {
    expectError(array().minLength(2)([]))
  })

  test('array-min-length.alphabetic', () => {
    expectError(array().minLength(2)(['abc']))
  })

})

suite('array-max-length', () => {

  test('array-max-length', () => {
    expectSuccess(array().maxLength(2)([1, 2]))
  })

  test('array-max-length.number', () => {
    expectError(array().maxLength(2)([1, 2, 3]))
  })

  test('array-max-length.empty', () => {
    expectSuccess(array().maxLength(2)([]))
  })

  test('array-max-length.alphabetic', () => {
    expectSuccess(array().maxLength(2)(['abc']))
  })

})

suite('array-includes', () => {

  test('array-includes', () => {
    expectSuccess(array().includes(2)([1, 2]))
  })

  test('array-includes.2-in-[1]', () => {
    expectError(array().includes(2)([1]))
  })

  test('array-includes.2-in-[]', () => {
    expectError(array().includes(2)([]))
  })

  test('array-includes.2-in-[alphabetic]', () => {
    expectError(array().includes(2)(['abc']))
  })

  test('array-includes.2-in-null', () => {
    expectError(array().includes(2)(null))
  })

})

suite('array-not-includes', () => {

  test('array-not-includes.2-in-[1, 3]', () => {
    expectSuccess(array().notIncludes(2)([1, 3]))
  })

  test('array-not-includes.2-in-[1]', () => {
    expectSuccess(array().notIncludes(2)([1]))
  })

  test('array-not-includes.2-in-[]', () => {
    expectSuccess(array().notIncludes(2)([]))
  })

  test('array-not-includes.2-in-[alphabetic]', () => {
    expectSuccess(array().notIncludes(2)(['abc']))
  })

  test('array-not-includes.2-in-null', () => {
    expectError(array().notIncludes(2)(null))
  })

})